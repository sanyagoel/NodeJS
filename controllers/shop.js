
const { addProduct } = require('../models/cart');
const Product = require('../models/product');
const Cart = require('../models/cart.js');
const fs = require('fs');
const rootDir = require('../utils/path');
const path = require('path');
const getIndex = (req,res,next)=>{
    Product.fetchall((products)=>{
    console.log('Here is what its showing me;' , products);
    res.render('./shop/index',{pro : products , pageTitle : 'SHOP', hi:'Welcome to Home page :D', path:'tohome'});
    });
    
   // res.sendFile(path.join(rootDir,'views','home.html'));
}
const getProducts = (req,res,next)=>{
    Product.fetchall((products)=>{
    console.log('Here is what its showing me;' , products);
    res.render('./shop/products-list',{pro : products , pageTitle : 'PRODUCTS LIST', hi:'Welcome to products list ', path:'toproducts'});
    });
    
   // res.sendFile(path.join(rootDir,'views','home.html'));
}

const getProduct = (req,res,next)=>{
    Product.fetchall((products)=>{
    const prodID = req.params.id;
    console.log(prodID);
    res.render('./shop/product-details.ejs',{pro : products , reqid : prodID , pageTitle : 'PRODUCT DETAIL' , hi: 'Get indivisual detail' , path: 'toindivis'});
        });
}
const getCart = (req,res,next)=>{
    const productsInfo = [];
    Cart.fetchallcart((productobj)=>{
        console.log(productobj.products.length);
        let remaining = productobj.products.length;

        productobj.products.forEach((prod2)=>{
            Product.findbyID(prod2.id,(produc)=>{
                productsInfo.push({product : produc , qty : prod2.qty});
                remaining = remaining - 1;
                if(remaining==0){
                    res.render('./shop/cart.ejs',{productcart : productsInfo , pageTitle : 'CART' , hi : 'Buy Stuff From Cart' , path : 'tocart' });
                }
            })
        })
    })
}

const postCart = (req,res,next)=>{
    const prodid = req.body.productid;
    Product.findbyID(prodid,(produc)=>{
        Cart.addProduct(produc.id,produc.price);
    })
    res.redirect('/');
}

const getCheckout = (req,res,next)=>{
    res.render('./shop/checkout.ejs',{pageTitle : 'CHECKOUT' , hi : 'Checkout Stuff From Cart' , path : 'tocheckout' });
}
const getProductInfo = (req,res,next)=>{
    res.render('./shop/product-info.ejs',{pageTitle : 'PRODUCT INFORMATION' , hi : 'Get Product Information' , path : 'toinfo' });
}

const removeItem = (req,res,next)=>{
    const prodID = req.params.id;
    let price=0;
    Product.findbyID(prodID,(prod)=>{
        price = prod.price;
    })
    Cart.fetchallcart((CartProducts)=>{
        const crtIndex = CartProducts.products.findIndex(p=> p.id == prodID);
        CartProducts.products[crtIndex].qty = CartProducts.products[crtIndex].qty -1;
        CartProducts.totalPrice = CartProducts.totalPrice - price ;
        if(CartProducts.products[crtIndex].qty==0){
            CartProducts.products.splice(crtIndex,1);
        }
        fs.writeFile(path.join(rootDir,'data','cardData.json'),JSON.stringify(CartProducts),(err)=>{
            if(err){
                console.log(err);
            }
            res.redirect('/');
        })
    })
}

module.exports = {
    getin : getIndex,
    getpr : getProducts,
    getc : getCart,
    getch : getCheckout,
    getpi : getProductInfo,
    getpid : getProduct,
    postc : postCart,
    removeit : removeItem
}
