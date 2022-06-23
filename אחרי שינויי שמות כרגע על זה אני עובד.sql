CREATE  DATABASE msima_4;
use msima_4;

-- CREATE DATABASE testing;
-- use testing;

CREATE TABLE users(
ID VARCHAR(30) ,
PRIMARY KEY(ID),
F_name VARCHAR(50),
L_name VARCHAR(50),
Email VARCHAR(50),
password VARCHAR(500),
city VARCHAR(50) ,
street VARCHAR(80),
Admin BOOLEAN DEFAULT FALSE
);

CREATE TABLE categories(
id INT AUTO_INCREMENT,
PRIMARY KEY(id),
category VARCHAR(100)
);

INSERT INTO categories(category)
VALUES("baby, toddler"), 
("bikes, scooters & ride-ons"), 
("building sets & blocks"), 
("board & Card games"), 
("puzzles"), ("sports"), 
("action figures"), ("nerf & toy blasters"),
 ("dolls, collectibles & stuffed animals"),
 ("kids arts & crafts"),
 ("Lego"), ("playmobil");

CREATE TABLE sub_categorys(
id INT AUTO_INCREMENT,
PRIMARY KEY(id),
subCategory_name VARCHAR(100),
refers_to INT,
FOREIGN KEY(refers_to) REFERENCES categories(id) 
); 

INSERT into sub_categorys( subCategory_name,refers_to)
VALUES("bikes",2),("skates",2),("scooters",2),("skateboards",2),
("kodkod",4), ("foxmaind",4), ("Hkobia",4), ("RAVENSBURGER",4), 
 ("baby dolls",9),("doll houses, furniture & accessories",9),
 ("stuffed animals",9),("Barbis",9),
 ("clay, dough & sand art",10),("drawing, coloring & painting",10),
 ("crafts & activities",10);

CREATE TABLE products(
id INT AUTO_INCREMENT,
PRIMARY KEY(id),
product_Number VARCHAR(20),
product_Name VARCHAR(100),
product_category INT,
FOREIGN KEY(product_category) REFERENCES categories(id),
product_SUB_category INT , 
FOREIGN KEY(product_SUB_category) REFERENCES sub_categorys(id),
price FLOAT,
Image TEXT(300)
);

INSERT into products(product_Name , product_category ,product_SUB_category,
price ,  Image)
VALUES
("My first artboard", 1,NULL ,159.9  ,"https://cashcow-cdn.azureedge.net/images/fdf2e6cd-3e71-44f8-8c05-5558bbb02e59_500.png"),
("Musical Walker",1 ,NULL ,199.9 , "https://slimages.macysassets.com/is/image/MCY/products/1/optimized/11299771_fpx.tif"),
("My first bowling", 1,NULL ,59.9  , "https://cashcow-cdn.azureedge.net/images/dd5effb7-4958-41dd-a811-9c6fb5fd0ad6_500.png"),
("soft cubes",1 ,NULL ,129.9  , "https://cashcow-cdn.azureedge.net/images/66a4e758-5ad7-4411-a09a-1f4b15a1a4a2_500.png"),
("Melissa and Doug Smoothie Maker Blender",1 ,NULL ,149.9  , "https://slimages.macysassets.com/is/image/MCY/products/3/optimized/11304113_fpx.tif"),
("Activity Table", 1  ,NULL , 199.9 , "https://slimages.macysassets.com/is/image/MCY/products/7/optimized/11299767_fpx.tif"),
("Melissa and Doug Ice Cream Shop Chalk Set",1 ,NULL ,99.9  , "https://slimages.macysassets.com/is/image/MCY/products/8/optimized/16781128_fpx.tif"),


("12-Inch Disney Minnie Mouse Girls Bike", 2, 1,450  , "https://slimages.macysassets.com/is/image/MCY/products/0/optimized/19103210_fpx.tif"),
("16-Inch Children's Bike -Bastket, Adjustable", 2, 1,399.9  , "https://slimages.macysassets.com/is/image/MCY/products/6/optimized/18682626_fpx.tif"),
("20-Inch Children's Bike", 2, 1,399.9  , "https://slimages.macysassets.com/is/image/MCY/products/5/optimized/18682605_fpx.tif"),
("Gener8 Deluxe Tricycle", 2, 1,249.9  , "https://slimages.macysassets.com/is/image/MCY/products/6/optimized/17897916_fpx.tif"),
("boys skates with lights", 2,2,349.9  , "https://cashcow-cdn.azureedge.net/images/08142654-ccb1-4f2c-b4db-1796a53857f7_500.jpg"),
("Black skates", 2, 2,189.9  , "https://cashcow-cdn.azureedge.net/images/72a2279c-94ff-4608-b3d7-93323b60201a_500.jpg"),
("skates X Rider", 2, 2,179.9  , "https://cashcow-cdn.azureedge.net/images/7a8b4033-764a-4814-a1dc-ac8cf06e665c_500.jpg"),
("Void Stunt Scooter", 2, 3,299.9  , "https://slimages.macysassets.com/is/image/MCY/products/5/optimized/20365115_fpx.tif"),
("Pulse Performance Products Stunt Scooter", 2, 3,299.9  , "https://slimages.macysassets.com/is/image/MCY/products/4/optimized/13821724_fpx.tif"),
("Razor A5 Lux Deluxe 200mm Wheels Kick Folding Scooter", 2, 3,249.9  , "https://slimages.macysassets.com/is/image/MCY/products/3/optimized/17147343_fpx.tif"),
("Huffy Disney Frozen 2 Electro-Light Inline Scooter", 2, 3,129.9  , "https://slimages.macysassets.com/is/image/MCY/products/2/optimized/19103162_fpx.tif"),
("Huffy  Spider-Man(R) Electro-Light Inline Scooter", 2, 3,129.9  , "https://slimages.macysassets.com/is/image/MCY/products/9/optimized/19103159_fpx.tif"),
("Lil' Rider Kids Scooter", 2, 3,149.9  , "https://slimages.macysassets.com/is/image/MCY/products/3/optimized/14628433_fpx.tif"),
("3-wheel scooter", 2, 3,349.9  , "https://cashcow-cdn.azureedge.net/images/75cfa76c-f7b2-401d-bf64-f0a12ff94391_500.webp"),
("Scooter 3 wheels super jets", 2, 3,99.9  , "https://cashcow-cdn.azureedge.net/images/cf43fe1e-fc31-4f7e-9b81-4666546b4806_500.jpg"),
("3 wheeled Batman scooter", 2, 3,99.9  , "https://cashcow-cdn.azureedge.net/images/399f8e90-72c9-44a4-8397-1325a83cb269_500.jpg"),
("Hello Kitty 3 wheeled scooter", 2, 3,99.9  , "https://cashcow-cdn.azureedge.net/images/ecc0b3e4-4d18-47db-8fb1-5f0679d9d28a_500.jpg"),


("Mag-Genius Magnet Tiles, 141 + 2 Pieces", 3,NULL ,299.9  , "https://slimages.macysassets.com/is/image/MCY/products/0/optimized/17615590_fpx.tif"),
("Magnets 100 parts playmagnet", 3,NULL ,159.9  , "https://cashcow-cdn.azureedge.net/images/7536837a-9051-49d2-8efa-258dd6743ddd_500.jpg"),
("Mega Blocks", 3,NULL ,149.9  , "https://cashcow-cdn.azureedge.net/images/886bdc3a-ab5f-4042-85d1-d4a5b99d869d_500.png"),
("Smartmax Magnetic Dinosaurs", 3,NULL ,110  , "https://cashcow-cdn.azureedge.net/images/8370a95c-ee9a-4532-9c0b-1b136b1d611b_500.jpg"),


("Ramikov tin packaging", 4, 5,99.9  , "https://cashcow-cdn.azureedge.net/images/697e36f3-4c5e-4352-bf29-3b681a4924e2_500.webp"),
("Obongo", 4, 5,99.9  , "https://cashcow-cdn.azureedge.net/images/4902c8e7-5401-4ad5-b145-0fef3f89585d_500.jpg"),
("monopoly", 4, 5,129.9  , "https://m.media-amazon.com/images/I/91RSg9MCGtL._AC_SY450_.jpg"),
("RISK", 4, 5,129.9  , "https://cashcow-cdn.azureedge.net/images/d4c54def-b9e1-4e06-b6c3-7c5bab806c34_500.jpg"),

("Kajonga Adventure Island", 4, 6,119.9  , "https://cashcow-cdn.azureedge.net/images/f5f701d9-4ee9-4bfa-bed1-1ebf9d060ed0_500.jpg"),
("Dragon Cave", 4, 6,84.9  , "https://cashcow-cdn.azureedge.net/images/eb3202dd-a0de-441f-a951-d5364336491b_500.webp"),
("Mice on height", 4, 6,79.9  , "https://cashcow-cdn.azureedge.net/images/21b837fc-b328-4c09-843a-c8d172cf1ab9_500.jpg"),
("The Vanishing Island", 4, 6, 95 , "https://cashcow-cdn.azureedge.net/images/368a5444-5f39-44db-9b41-4bc24a1f8fcf_500.png"),

("codenames", 4, 7,115  , "https://cashcow-cdn.azureedge.net/images/b8d23f59-692b-47cb-bf47-1bfb1db87a70_500.webp"),
("Pandemic", 4, 7,149.9  , "https://cashcow-cdn.azureedge.net/images/56ac1f98-2dd5-497a-a529-16a6b6baae74_500.jpg"),
("Cats explode for adults The original version", 4, 7,79.9  , "https://cdn.shopify.com/s/files/1/0429/1438/1988/products/712-IRRZlRL._AC_SX522_500x.jpg?v=1603302611"),
("Katan settlers ", 4, 7,179.9  , "https://cashcow-cdn.azureedge.net/images/daec474d-ec22-474d-9663-e29ad93a6f00_500.webp");


CREATE TABLE carts(
id VARCHAR(200),
PRIMARY KEY(id),
customer VARCHAR(30), 
FOREIGN KEY(customer) REFERENCES users(ID),
Creation DATETIME DEFAULT NOW(),
status BOOLEAN DEFAULT FALSE,
Paid_Date DATETIME DEFAULT NULL
);


CREATE TABLE cart_items(
id int AUTO_INCREMENT,
PRIMARY KEY(id),
Item INT,
FOREIGN KEY(Item) REFERENCES products(id),
cart_ID VARCHAR(200),
FOREIGN KEY(cart_ID) REFERENCES carts(id),
Quantity INT  DEFAULT 1
);

CREATE TABLE orders(
order_ID INT AUTO_INCREMENT,
PRIMARY KEY(order_ID),
client VARCHAR(50),
FOREIGN KEY(client) REFERENCES users(ID),
cart_ID VARCHAR(200),
FOREIGN KEY(cart_ID) REFERENCES carts(id),
final_Price FLOAT ,
City_For_Delivery VARCHAR(50),
Street_For_Delivery VARCHAR(50),
Date_For_Delivery DATE ,
Time_of_Order DATETIME DEFAULT NOW(),
Last_4_Digits VARCHAR(4),
status_of_Delivery BOOLEAN DEFAULT FALSE,
nots text(50)
); 