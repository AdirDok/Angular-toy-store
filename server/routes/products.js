const router = require('express').Router()
const SQL = require('../dbconfig')
const { onlyUsers } = require('../Permissions')


// =============לכל המוצרים ================
router.get('/allproducts', onlyUsers, async (req, res) => {

    try {

        /*  מקור */
        //     const products = await SQL(`
        // SELECT id , product_Name ,price,Image FROM msima_4.products;
        // `)
        const products = await SQL(`
        SELECT products.id ,products.product_Name ,products.price,Image,
        categories.id as product_category
        FROM products
        INNER JOIN categories WHERE product_category = categories.id
    `)
        res.send(products)
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
})

// ==============לכל הקטגוריות =================
router.get('/allCategories', onlyUsers, onlyUsers, async (req, res) => {

    try {
        const categories = await SQL(`
        SELECT * FROM msima_4.categories;
        `)
        res.send(categories)
    } catch (error) {
        console.log(error)
        res.sendStatus(500)

    }

})

// ===========לכל התתי קטגוריות ===========
router.get('/allSubCategories', onlyUsers, async (req, res) => {

    try {

        const sub_Categories = await SQL(`
    SELECT * FROM msima_4.sub_categorys;
    `)
        res.send(sub_Categories)

    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }

})

// =================לכל המוצרים של קטגורייה מסויימת ============
router.get('/category/:catName', onlyUsers, async (req, res) => {
    // ================================== אני יכול ללעשות גם לפי הערך המספרי של ה ID============
    try {
        const productsPerCategory = await SQL(`
        SELECT products.id,product_Name,price,Image, 
        categories.category
        FROM msima_4.products
        INNER JOIN categories on product_category = categories.id
        WHERE categories.category = "${req.params.catName}"  
        `)
        res.send(productsPerCategory)

    } catch (error) {
        console.log(error)
        res.sendStatus(500)

    }
})

// =============== לכל המוצרים לפי תת קטגורייה מסויימת=======
router.get('/subCategory/:sub', onlyUsers, async (req, res) => {

    try {
        const productsPerSubCategory = await SQL(`
        SELECT products.id,product_Name,price,Image, 
        sub_categorys.id
        FROM msima_4.products
        INNER JOIN sub_categorys on product_SUB_category = sub_categorys.id
        WHERE sub_categorys.subCategory_name = "${req.params.sub}"  
        `)

        res.send(productsPerSubCategory)


    } catch (error) {
        console.log(error)
        res.sendStatus(500)

    }
})


// =============למוצר ספציפי ================
router.get('/product/:id', onlyUsers, async (req, res) => {

    try {

        const [product] = await SQL(`
        SELECT id,product_Name,price,price ,Image FROM msima_4.products
        WHERE id = ${req.params.id}
        `)
        console.log(product)

        res.send(product)

    } catch (error) {
        console.log(error)
        res.sendStatus(500)

    }

})


// ================= חיפוש מוצר לפי שם ===================
router.get('/search', onlyUsers, async (req, res) => {

    // http://localhost:1000/products/Search?p={p.name}    חיפוש מוצר י 

    try {

        const product = await SQL(`
        SELECT id,product_Name,price,price, Image FROM msima_4.products
        WHERE product_Name LIKE "${req.query.p}%"
        `)

        if (!product.length) {
            return res.send({ msg: 'product not found whit this name' })
        }
        res.send(product)


    } catch (error) {
        console.log(error)
        res.sendStatus(500)

    }

})




module.exports = router