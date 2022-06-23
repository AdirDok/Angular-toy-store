const router = require('express').Router()
const SQL = require('../dbconfig')
const { onlyAdmin } = require('../Permissions')


router.post('/', onlyAdmin, async (req, res) => {

    const { product_Name, product_category, price, Image } = req.body

    let { product_SUB_category } = req.body

    try {

        if (!product_Name || !product_category || !price || !Image) {
            return res.send({ err: 'mising some info' })
        }

        if (price <= 0) {
            return res.send({ err: 'The price can not be equal to or below 0' })
        }


        const [testCategory] = await SQL(`
        SELECT * FROM categories WHERE categories.id = ${product_category}
        `)

        if (!testCategory) {
            return res.send({ err: 'Please enter a valid category' })
        }


        if (product_SUB_category == undefined) {
            product_SUB_category = null
        } else {

            const [testSub_Category] = await SQL(`
            SELECT * FROM sub_categorys WHERE sub_categorys.id = ${product_SUB_category}
            `)

            if (!testSub_Category) {
                return res.send({ err: "Please enter a valid sub category" })
            }

            if (testSub_Category.refers_to != testCategory.id) {
                return res.send({ err: 'Subcategory must match category' })
            }
        }      

        await SQL(`
         INSERT into products(product_Name , product_category ,product_SUB_category,
         price ,  Image)
         VALUES
        ("${product_Name}", ${product_category},${product_SUB_category} ,
        ${price} ,"${Image}")  
        `)

        res.send({ msg: 'product add' })

    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }


})



router.delete('/:productID', onlyAdmin, async (req, res) => {
    try {

        const [productToBeDeleted] = await SQL(`
        SELECT * FROM products WHERE products.id = ${req.params.productID} 
        `)

        if (!productToBeDeleted) {
            return res.send({ err: `Stop trying to break my code, I do not know who you are but I will find you!` })
        }

        await SQL(`
        DELETE FROM products WHERE products.id = ${req.params.productID}
        `)

        res.send({ msg: 'product deleted' })

    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
})


router.put('/:productID', onlyAdmin, async (req, res) => {

    const { product_Name, price, Image } = req.body

    let { product_SUB_category ,product_category } = req.body

    try {
        // ===================== קודם כל בודק שיש לי בלל מוצר כזה שלא יעשו לי שטויות באתר
        const [product] = await SQL(`
        SELECT * FROM products WHERE products.id = ${req.params.productID} 
        `)

        if (!product_category) {
            product_category = product['product_category']  
        }

        if (!product) {
            return res.send({ err: 'product not found' })
        }
        // ===========הבדיקות הרגילות ==============
        if (!product_Name || !price || !Image) {
            return res.send({ err: 'mising some info' })
        }

        if (price <= 0) {
            return res.send({ err: 'The price can not be equal to or below 0' })
        }

        const [testCategory] = await SQL(`
        SELECT * FROM categories WHERE categories.id = ${product_category}
        `)

        if (!testCategory) {
            return res.send({ err: 'Please enter a valid category' })
        }

        if (product_SUB_category == undefined) {
            product_SUB_category = null
        } else {

            const [testSub_Category] = await SQL(`
            SELECT * FROM sub_categorys WHERE sub_categorys.id = ${product_SUB_category}
            `)

            if (!testSub_Category) {
                return res.send({ err: "Please enter a valid sub category" })
            }

            if (testSub_Category.refers_to != testCategory.id) {
                return res.send({ err: 'Subcategory must match category' })
            }

        }

        await SQL(`
        UPDATE products SET product_Name= "${product_Name}", 
        product_category = ${product_category},
        product_SUB_category =${product_SUB_category} , 
        price =${price} ,
        Image = "${Image}"
        WHERE products.id =${req.params.productID}
        `)

        res.send({ msg: 'product updated' })

    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
})


module.exports = router