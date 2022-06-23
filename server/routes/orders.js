const router = require('express').Router()
const SQL = require('../dbconfig')
const { onlyUsers } = require('../Permissions')
const fs = require('fs/promises')






// ==================== מביא אל כל המוצרים שבעגלה ומחיר סופי=============
router.get('/', onlyUsers, async (req, res) => {

    try {

        const totalOrder = await SQL(`
        SELECT 
        products.product_Name,
        products.price,
        cart_items.Quantity,
        products.price * cart_items.Quantity as total_price
        from cart_items 
        INNER JOIN products on cart_items.Item = products.id  
        WHERE cart_items.cart_ID = "${req.session.cart_id}"
        `)


        let final_Price = totalOrder.reduce((a, b) => {
            a['total_price'] = a.total_price + b.total_price
            return a
        }, { total_price: 0 })

        // console.log(toPay)

        final_Price = final_Price['total_price'].toFixed(2)
        console.log(final_Price)

        req.session.final_Price = final_Price

        // =========================

        res.send([totalOrder, final_Price])

    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
})



router.post('/', onlyUsers, async (req, res) => {

    try {

        // ======================  מקבל את המחיר הכללי של העגלה ===========
        const totalOrder = await SQL(`
        SELECT 
        products.product_Name,
        products.price,
        cart_items.Quantity,
        products.price * cart_items.Quantity as total_price
        from cart_items 
        INNER JOIN products on cart_items.Item = products.id  
        WHERE cart_items.cart_ID = "${req.session.cart_id}"
        `)

        let final_Price = totalOrder.reduce((a, b) => {
            a['total_price'] = a.total_price + b.total_price
            return a
        }, { total_price: 0 })

        final_Price = final_Price['total_price'].toFixed(2)    /*   זה המחיר הסופי של העגלה עפ השרת ...עכשיו נבדוק שלא מנסים לעבוד עלינו */

        // =================מקבל פרמטרים מהלקוח ============
        const { City_For_Delivery,
            Street_For_Delivery,
            Date_For_Delivery
        } = req.body


        let { nots, Credit } = req.body

        Credit = Credit.toString()
        req.session.final_Price = final_Price



        // ============בודק שהכל קיים =============

        if (!req.session.final_Price) {
            return res.status(400).send({ err_msg: 'Post request happened before get request' })
        } else if (req.session.final_Price != final_Price) {
            return res.send({ err_msg: 'Incompatible price Someone is trying to hack into the site...יוסי ? ' })
        }

        if (!City_For_Delivery) {
            return res.status(400).send({ err_msg: 'Select City for shiping' })
        }

        if (!Street_For_Delivery) {
            return res.status(400).send({ err_msg: 'Select Street for shiping' })
        }

        if (!Date_For_Delivery) {
            return res.status(400).send({ err_msg: 'Select date for shiping' })
        }

        if (!Credit) {
            return res.status(400).send({ err_msg: 'Please enter a credit card number to pay' })
        }

        if (nots == undefined) {
            nots = null
        }

        // ==========וולידציות ============

        const date = new Date().toISOString().split("T")[0]



        if (Date_For_Delivery < date) {
            return res.send({ err_msg: 'We do not make deliveries to the past' })
        }

        const deliveriesPerDay = await SQL(`
        SELECT * FROM msima_4.orders WHERE Date_For_Delivery  = "${Date_For_Delivery}" 
        and status_of_Delivery = FALSE
        `)



        if (deliveriesPerDay.length >= 3) {
            return res.send({ err_msg: 'All deliveries for this day are busy, please select another day' })
        }

        const creditPattern = /\d{16}/     /* וולידצייה של 16 מספרים ורק מספרים */
        const cart_id = req.session.cart_id
        const Last_4_Digits = Credit.substring(Credit.length - 4, Credit.length + 1)

        if (!Credit.match(creditPattern)) {
            return res.send({ err_msg: 'Invalid credit card' })
        }

        const client = req.session.userID
        // ============מכניס לטבלת הזמנות את ההזמנה  ==========

        await SQL(`
        INSERT into orders(cart_ID ,client ,  Date_For_Delivery ,City_For_Delivery,
        Street_For_Delivery , final_Price ,Last_4_Digits ,nots)

        VALUES("${cart_id}" , ${client} , "${Date_For_Delivery}" , "${City_For_Delivery}" ,
        "${Street_For_Delivery}" , ${final_Price} , ${Last_4_Digits} ,"${nots}" )
        `)

        // =============== מעדכן שהעגלה נסגרה ===============

        // ------------------להוריד מהערה שכאני מסיים לעבוד עם FS -------------------


        await SQL(`
        UPDATE carts set paid_Date = now()
        WHERE
        carts.id="${req.session.cart_id}"
        `)

        await SQL(`
        UPDATE carts set status =TRUE WHERE
        carts.id="${req.session.cart_id}"
        `)

       


        // ------------------להוריד מהערה שכאני מסיים לעבוד עם FS -------------------


        let [order] = await SQL(`
       SELECT * FROM msima_4.orders WHERE cart_ID = "${cart_id}"
       `)

        let receipt = `-------ORDER number ${order.order_ID}-------
        `

        for (let item of totalOrder) {
            receipt += ` \n ${item.product_Name} ,price:${item.price} * ${item.Quantity}
            total: ${item.total_price.toFixed(2)} \n
            =====================`
        }
        receipt += `total patmant is : ${req.session.final_Price} `


        const fileName = `order_${order.order_ID}_${date}_${req.session.userID}`
        const directoryToMyDadFolder = __dirname.substring(0, __dirname.length - 7)

        // ----------------------------------- ליוסי יקירי ----------------------------------------------------------------------------

        //   השורה מעלי מרגישה לי מאוד מטומטמת אם תוכל בבקשה בהערות שאתה נותן לתת לי דרך/פתרון יותר יעיל אני ישמח
        //  שורה זו כדי להגיר לתיקייה אבא שבו נמצא בתיקיית פבליק משום מה לא הצלחתי עם כל הנקודה סלאש /./././. 

        // ------------------------------------ ליוסי יקירי ------------------------------------------------------------------------

        await fs.writeFile(directoryToMyDadFolder + `/public/${fileName}.txt`, receipt)

        res.send({ msg: 'Your order has been accepted', order, fileName,directoryToMyDadFolder })


    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
})


router.get('/toDownlod/:fileName', async (req, res) => {
    try {
        const directoryToMyDadFolder = __dirname.substring(0, __dirname.length - 7)
        let FileName = req.params.fileName
        FileName = directoryToMyDadFolder + `/public/${FileName}`
        res.download(FileName)
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }

})



router.get('/dates', onlyUsers, async (req, res) => {


    try {

        const today = new Date().toISOString().split("T")[0]

        let AllDates = await SQL(`
        SELECT Date_For_Delivery FROM orders
        WHERE Date_For_Delivery >= "${today}"
        `)

        AllDates = AllDates.reduce((a, b) => {

            if (a[b.Date_For_Delivery]) {
                a[b.Date_For_Delivery]++
            } else {
                a[b.Date_For_Delivery] = 1
            }
            return a

        }, {})

        const dates = []
        for (const key in AllDates) {
            if (value = 3) {
                dates.push(key)
            }
        }

        // for (const i of dates) {
        //     if (i >= 3) {
        //         newArr.push(i)
        //     }

        // }

        // ================== אני מקבל אובייקט כזה =============
        // {
        //     "Date_For_Delivery": "2022-05-11T21:00:00.000Z"
        // },
        // ======================================

        // const total = cartItems.reduce((a, b) => {
        //     a['total_price'] = a.total_price + b.total_price
        //     return a
        // }, { total_price: 0 })

        res.send(dates)


    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
})




module.exports = router