const path = require('path');
const rootDir = require('../utils/path');

const p = path.join(rootDir,'data','productData.json');

const fs = require('fs');

const Product = require('../models/product');
const Cart = require('../models/cart');

const getaddproducts = (req,res,next)=>{
    res.render('./admin/add-product' , {pageTitle : 'ADD PRODUCTS', productcardcss : true , hi:'ADD PRODUCTS :3',path:'tousers'});
    //res.sendFile(path.join(rootDir,'views','users.html'));
}


const postproductarr = (req,res,next)=>{
    const title = req.body.usernames;
  const imageUrl = req.body.imageurl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(title, imageUrl, description, price);
    product.save();
    res.redirect('/');
}

const getadminprod = (req,res,next)=>{
    Product.fetchall((products)=>{
    console.log('Here is what its showing me;' , products);
    res.render('./admin/products',{pro : products , pageTitle : 'ADMIN PRODUCTS LIST', hi:'Welcome to admin products list ', path:'toadminprod'});
    });
    
   // res.sendFile(path.join(rootDir,'views','home.html'));
}

const editProd = (req,res,next)=>{
    /*const editMode = req.query.edit;
    if(!editMode){
        res.redirect('/');
    }*/
    const prodID = req.params.id;
    Product.findbyID(prodID,(product)=>{
        res.render('./admin/edit-prod.ejs',{productf : product , path: 'edit', hi:'edit product details!', pageTitle : 'edit products' });
    })
    
}

const editProdPost = (req, res, next) => {
    const prodID = req.params.id;
    const updatedProduct = {
        title: req.body.usernames,
        imageurl: req.body.imageurl,
        description: req.body.description,
        price: req.body.price,
        id: prodID
    };

    Product.fetchall((products) => {
        const index = products.findIndex(pro => pro.id == prodID);
            products[index] = updatedProduct;
            fs.writeFile(p, JSON.stringify(products), (err) => {
                if (err) {
                    console.log(err);
                }
                res.redirect('/'); // Ensure the response is sent
            });
    });
};

const deleteProd = (req,res,next)=>{
    const prodID = req.params.id;
    Product.fetchall((products)=>{
        const prodindex = products.findIndex(p=> p.id==prodID);
        if(prodindex!=-1){
            products.splice(prodindex,1);
            fs.writeFile(p,JSON.stringify(products),(err)=>{
                if(err){
                    console.log(err);
                }
            })
        }
    });
    let price=0;
    Product.findbyID(prodID,(prod)=>{
        price = prod.price;
    })
    Cart.fetchallcart((cartProducts)=>{
        const cartIndex = cartProducts.products.findIndex(p=> p.id == prodID );
        if(cartIndex!=-1){
            cartProducts.totalPrice = cartProducts.totalPrice - price*(cartProducts.products[cartIndex].qty);
            cartProducts.products.splice(cartIndex,1);
            fs.writeFile(path.join(rootDir,'data','cardData.json'),JSON.stringify(cartProducts),(err)=>{
                if(err){
                    console.log(err);
                }
            })
        }
    })
    res.redirect('/');
}


module.exports = {
    getap : getaddproducts,
    postproar : postproductarr,
    getadmp : getadminprod,
    getedp : editProd,
    postedp : editProdPost,
    delp :deleteProd
}
