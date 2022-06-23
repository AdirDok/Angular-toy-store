                        Main routs : 

1) /   ( http://localhost:1000 )

2) usersLog  ( http://localhost:1000/usersLog/ )

3) products   ( http://localhost:1000/products )

4)  usersCart  (http://localhost:1000/usersCart)

5)  orders  ( http://localhost:1000/orders )

6) admin  ( http://localhost:1000/admin )




 ============================ Index   =================

 1)  Get file Name to downlod. 
    req:get('/') 
    res: __dirname+ filename   

 2) Get general information about the site.
    req:('/info')  
    res: {

        totalOrdes:number of orders
        totalPruducts:number of ruducts
    }


    =================================== UsersLog ===============================

1)  Checks if ID alredy in databace
req : post ('/doesIdExist')
res : Boolean

2)  Login
req : post ('/login'){ gets:
    ID,  : User ID
     password 
}
res: login the user and gives him a session to continue working
And sends information about his cart and his recent purchase
this informant is dynamic and changing

3) Register 
req : post ('/register'){gets:
ID, : User ID
Email, 
password,
confirmPassword
F_name, : first name
L_name,  last name
city,
street 
}
res: Register the user for the site


4) Logout
req : delete ('/logout')
res: Destroys the session and disconnects the user

=================================== Products ===============================

1) Gets all the products
req: get('/allproducts')
res: an Arry of products

2) Gets all categories
req : get ('allCategories')
res: an Arry of Categories

3) For all products of a certain category
req : get ('/category/:catName')
res: all products of a certain category 

4) To a specific product
req:get ('/product/:id')
res : a specific product

5) search by Name . this route gets Looking for a product by name or by characters at the Beginning of the name
req: get ( '/Search?p={p.name}')
full path : 'http://localhost:1000/products/Search?p={p.name}'
p.name stand for prudact Name

res: an Arry fo product Corresponding to the data entered


=================================== UsersCart ===============================

1) Get a cart to work with
req : get ('/')
res: cart ID and total price

2) Adds a product to the cart
req: put ('/'){
    cart_ID,
     Item, : an id of prudact
    Quantity
}
res: msg that the product had been added 


3) Delete Empty the cart of all its products  (uses session)
req : delete('/cart')
res: msg that the cart is empty 

4)  Delete or remove an item from the cart
req:   ('/product/:productID'){
    productID is an ID fo the product
}
res: msg: 'product delete'

=================================== Orders ===============================

1)Brings all the products in the cart and final price
req: get ('/')
res: An array consisting of 2 objects
One is all the items in the cart
The second is the overall price

2) Payment request
This request works according to the variables in the session for security reasons
req : post ('/')
res:{
    msg: 'Your order has been accepted',
    order,:  The receipt paid
    fileName, : The file name of the receipt is used for download
    directoryToMyDadFolder : A string detailing the path to the main folder
}

3) Request to download the receipt file
req: get ('/toDownlod/:fileName')
res : a fill


=================================== Admin ===============================

1) To add a new product
req: post('/') {
    product_Name,
    product_category,
    price,
    Image, : an src  
    product_SUB_category 
}
res: msg: 'product add'

2) To update product items
req : put ('/:productID'){
    product_Name,
    price,
    Image
    product_SUB_category,
    product_category
}
res:  msg: 'product updated'  

3) To delete a product 
req: delete ('/productID')
res: msg: 'product deleted'


