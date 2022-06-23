const router = require('express').Router()
const { v4 } = require('uuid')
const SQL = require('../dbconfig')
const { onlyUsers } = require('../Permissions')


// ========הוספת עגלה חדשה למשתמש  =======

router.get('/', onlyUsers, async (req, res) => {

    try {
        // =============בודק אם יש לו עגלה ישנה פתוחה ואם יש הוא מחזיר אותה   ===========
        let oldCart = await SQL(`
        SELECT id as cartID FROM msima_4.carts WHERE customer = "${req.session.userID}" 
        and status = FALSE ORDER BY Creation
        `)

        oldCart = oldCart[0]      /* אחרי שהיו כמה עגלות למשתמש לכבות את שורה זו ולראות האם מגיע לפי התאריך  */

        if (oldCart) {     /*   אם יש עגלה ישנה אני מביא את כל המוצרים שיש בה ובנוסף את ה ID של העגלה והסכום הסופי  */

            const cartItems = await SQL(`
            SELECT 
            products.id as product_id,
            products.product_Name,
            products.price,
            cart_items.Quantity,
            products.price * cart_items.Quantity as total_price
            from cart_items 
            INNER JOIN products on cart_items.Item = products.id
            WHERE cart_items.cart_ID = "${oldCart.cartID}"
            `)  

            const total = cartItems.reduce((a, b) => {
                a['total_price'] = a.total_price + b.total_price
                return a
            }, { total_price: 0 })

            oldCart['total_price'] = total['total_price'].toFixed(2)

            return res.send([cartItems,oldCart ])    /*   לשורה הזו אני יעשה דיסטראקצרין כמו בריאקט */
        }

        await SQL(` 
            INSERT into carts(id ,customer)
            VALUES("${v4()}","${req.session.userID}" )
           `)

        const [userCart] = await SQL(`
           SELECT * FROM msima_4.carts WHERE customer =${req.session.userID} 
            and status = FALSE
           `)
        userCart['total_price'] = 0
        req.session.cart_id = userCart.id

        // console.log(userCart)
        res.send(userCart)

    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }


})


router.put('/', onlyUsers, async (req, res) => {

    const { cart_ID, Item, Quantity } = req.body

    try {

        if (!cart_ID || !Item || !Quantity) {
            return res.send({ err: "mising some info" })
        }

        if (cart_ID != req.session.cart_id) {
            return res.send({ err: `You can not add to others' carts .... not nice` })
        }

        if (Quantity % 1 != 0) {
            return res.send({ err: 'Quantity must be full number' })
        }

        const [isItemExist] = await SQL(`
        SELECT * FROM products WHERE products.id =${Item}
        `)

        if (!isItemExist) {
            return res.send({ err: 'product not found' })
        }

        // בודק האם יש לי מהמוצר כבר בעגלה עדי לעדכן רק כמות או כדי להכניס מוצר חדש
        const [product] = await SQL(`
        SELECT * FROM msima_4.cart_items
        WHERE Item =${Item}  and cart_ID = "${cart_ID}"
        `)

        if (!product) {
            await SQL(`
            INSERT INTO cart_items(cart_ID,Item,Quantity )
            VALUES( "${cart_ID}",${Item} ,${Quantity} )
            `)
            return res.send({ msg: 'product add new product' })
        }

        await SQL(`
        UPDATE cart_items set Quantity = Quantity + ${Quantity}
        WHERE cart_ID = "${cart_ID}" 
        and Item = ${Item}
        `)

        res.send({ msg: 'product Quantity updated' })

    } catch (error) {
        console.log(error)
        res.sendStatus(500)

    }


})


router.delete('/cart', onlyUsers, async (req, res) => {

    try {

        await SQL(`
        DELETE FROM cart_items WHERE cart_items.cart_ID = "${req.session.cart_id}"
        `)
        res.send({ msg: 'cart empty' })
    } catch (error) {
        console.log(error)
        res.sendStatus(500)

    }
})


router.delete('/product/:productID', onlyUsers, async (req, res) => {

    try {

        const [product] = await SQL(`
        SELECT * FROM products WHERE id = ${req.params.productID}
        `)

        if (!product) {
            return res.send({ err: 'not possible to delete a non-existent product' })
        }


        await SQL(`
        DELETE FROM cart_items WHERE cart_items.Item = ${req.params.productID}
        `)
        res.send({ msg: 'product delete' })

    } catch (error) {
        console.log(error)
        res.send(500)
    }
})

module.exports = router