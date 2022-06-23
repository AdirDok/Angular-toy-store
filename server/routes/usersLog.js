const router = require('express').Router()
const SQL = require('../dbconfig')
const bcrypt = require('bcrypt')
const { onlyUsers } = require('../Permissions')


router.get('/whoIsTheUser', (req, res) => {
    res.send({ msg: req.session.F_name })
})


router.get('/isAdmin', (req, res) => {
    try {
        res.send({ isAdmin: req.session.Admin })

    } catch (error) {
        console.log(error)
        res.sendStatus(500)

    }
})



router.post('/login', async (req, res) => {

    let { ID, password } = req.body
    const ID_Pattern = /\d{9}/     /*  ולידצייה של 9 ספרות */

    try {

        ID = ID.toString()
        password = password.toString()

        if (!ID || !password) {
            return res.status(400).send({ err_msg: "missing some info" })
        }

        if (!ID.match(ID_Pattern)) {
            return res.send({ err_msg: 'invalid ID' })
        }

        const [user] = await SQL(`
        SELECT * 
        FROM msima_4.users
        WHERE ID = "${ID}" 
        `)

        if (!user) {
            return res.status(400).send({ err_msg: `ID incorrect` })
        }

        const isPasswordCorect = await bcrypt.compare(password, user.password)

        if (isPasswordCorect == false) {
            return res.status(400).send({ err_msg: 'Incorrect password' })
        }

        // ======================== שמירת סשנים ===================

        req.session.F_name = user.F_name
        req.session.Email = user.Email
        req.session.Admin = user.Admin
        req.session.userID = user.ID

        // return res.send(req.session.userID)

        if (req.session.Admin == true) {
            return res.send({ msg_Admin: 'welcom admin ' + user.F_name, user })
        }

        const info = {}

        const getInfo = async () => {


            //  ============= האם יש לו עגלה פתוחה 

            const [cart] = await SQL(`
            SELECT * FROM msima_4.carts WHERE customer =${ID} 
            and status = FALSE`)    
            
            if (!cart) {
                // ==========================================מביא את כל העגלות שיש למשתמש באם יש
                const areUnewUser = await SQL(`
                SELECT * FROM msima_4.carts  WHERE customer = "${ID}" and status = TRUE
                ORDER BY Creation
                `)

                if (areUnewUser.length) {   /*  אם המערך מלא כלומר הוא לא לקוח חדש  */
                    const lastPurchase = areUnewUser[areUnewUser.length - 1]


                    info['cart'] = lastPurchase
                    info['cart msg'] = { msg: 'old user' }
                }
                else {         /*  אם הוא לקוח חדש */
                    info['cart msg'] = { msg: 'new user' }
                }
            } else if (cart) {
                let amunt = await SQL(`
                    SELECT  
                    products.price * cart_items.Quantity as total_price
                    from cart_items 
                    INNER JOIN products on cart_items.Item = products.id
                    WHERE cart_items.cart_ID = "${cart.id}"
                    `)

                amunt = amunt.reduce((a, b) => {
                    a['total_price'] = a.total_price + b.total_price
                    return a
                }, { total_price: 0 })

                info['cart msg'] = {
                    msg: 'open cart',
                    Creation: cart.Creation,
                    amunt: amunt.total_price.toFixed(2)
                }

                info["cart"] = cart
                req.session.cart_id = cart.id

            }

            res.send([user, info])
        }


        getInfo()

    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
})



router.post('/doesIdExist', async (req, res) => {

    try {

        const { ID } = req.body

        const [isNewUser] = await SQL(`
        SELECT ID FROM msima_4.users WHERE ID = ${ID}
        `)

        if (isNewUser) {
            return res.send(true)
        } else {
            return res.send(false)
        }


    } catch (error) {
        console.log(error)
        res.sendStatus(500)

    }
})




router.post('/register', async (req, res) => {

    // פרמטרים לבדיקב הראשונית שלב 1 

    const { ID, Email, password, confirmPassword } = req.body    /*  פרמטרים לשלב 1  */
    const { F_name, L_name, city, street } = req.body

    const ID_Pattern = /\d{9}/     /*  ולידצייה של 9 ספרות */

    try {

        if (!ID) {
            return res.send({ err_msg: 'ID is required' })
        }

        // if (!ID.match(ID_Pattern)) {
        //     return res.send({ err_msg: 'invalid ID' })
        // }

        if (!ID_Pattern.test(ID)) {

            return res.send({ err_msg: 'invalid ID, ID number must contain 9 digits' })
        }


        const [isNewUser] = await SQL(`
        SELECT ID FROM msima_4.users WHERE ID = ${ID}
        `)

        if (isNewUser) {
            return res.send({ err_msg: 'ID alredy in use' })
        }

        // ==================סוף בדיקות ID =================

        if (!Email) {
            return res.send({ err_msg: "email is required" })
        }

        const emailPattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/


        if (!Email.match(emailPattern)) {
            return res.send({ err_msg: 'invalid email' })
        }

        // =====================סוף בדיקות אימייל ==========

        if (!password) {
            return res.send({ err_msg: 'password is required' })
        }

        if (!confirmPassword) {
            return res.send({ err_msg: 'you need to varifay your password' })
        }

        if (password != confirmPassword) {
            return res.send({ err_msg: 'password does not match confirm Password' })
        }

        const hasdPassword = await bcrypt.hash(password, 10)

        // ===============סוף חלק ראשון בטופס=============

        if (!F_name || !L_name) {
            return res.send({ err_N: 'plese enter first name and last name' })
        }

        if (!city) {
            return res.send({ err_msg: 'Please select a city' })
        }

        if (!street) {
            return res.send({ err_msg: 'Please enter street name' })
        }

        await SQL(`
        INSERT INTO users(ID,F_name,L_name,Email,password,city,street)
        VALUES
        ("${ID}","${F_name}", "${L_name}", "${Email}" ,"${hasdPassword}", "${city}", "${street}")
        `)

        const [mygustAdd] = await SQL(`
        SELECT * FROM msima_4.users
        WHERE ID =  ${ID}
        `)

        res.send({ msg: 'user add plese login', mygustAdd })



    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
})



router.delete('/logout', onlyUsers, async (req, res) => {

    req.session.destroy()
    res.send({ msg: 'bye love' })
})

module.exports = router