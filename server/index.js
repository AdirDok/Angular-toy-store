const express = require('express')
const session = require('express-session')
const cors = require('cors')
const { testfun, onlyUsers } = require('./Permissions')
const fs = require('fs/promises')
const SQL = require('./dbconfig')



const app = express()
app.use(express.json())


app.use(cors({
    origin: "http://localhost:4200",
    credentials: true
}))


app.use(session({
    secret: "iDontHavealotoforiginalidiasfoasecret",
    name: "session",
    saveUninitialized: true,
    resave: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24,
        httpOnly: true,
        secure: false
    }
}))

app.use('/static', express.static('public'))
app.use('/usersLog', require('./routes/usersLog'))
app.use('/products', require('./routes/products'))
app.use('/usersCart', require('./routes/usersCart'))
app.use('/admin', require('./routes/admin'))
app.use('/orders', require('./routes/orders'))


app.use('/static', express.static('public'))

// =================================
app.get('/', (req, res) => {

    try {
        res.sendFile(__dirname + '/text.html')
    } catch (error) {
        console.log(error)
        res.send(error)
    }
})



app.get('/info', async (req, res) => {
    try {

        const info = {}

        // ===============כמות הזמנות =====================
        const [totalOrdes] = await SQL(`
            SELECT COUNT(order_ID) from orders`);

        info['totalOrdes'] = totalOrdes['COUNT(order_ID)']

        // ===================================כמות מוצרים =============  

        const [totalPruducts] = await SQL(`
            SELECT COUNT(id) from products`);

        info['totalPruducts'] = totalPruducts['COUNT(id)']

        res.send(info)

    } catch (error) {
        console.log(error)
        res.sendStatus(500)

    }
})


app.listen(1000, console.log("server 1000 is online"))