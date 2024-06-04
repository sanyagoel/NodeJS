const rootDir = require('../utils/path.js');
const fs = require('fs');
const path = require('path');
module.exports = class cart{

    static addProduct(id,price){
        fs.readFile(path.join(rootDir,'data','cardData.json'),(err,fileContent)=>{
            let cart = {products : [] , totalPrice : 0};
            if(!err){
                cart = JSON.parse(fileContent);
            }
            const existingProductindex = cart.products.findIndex(prod=> prod.id==id);
            const existingProduct = cart.products[existingProductindex];
            let updatedProduct;
            if(existingProduct){
                updatedProduct = {...cart.products[existingProductindex]};
                updatedProduct.qty = updatedProduct.qty + 1;
                cart.products[existingProductindex] = updatedProduct;
            }else{
                updatedProduct = {id : id, qty : 1};
                cart.products = [...cart.products , updatedProduct];
            }
            cart.totalPrice = cart.totalPrice + parseFloat(price);
            fs.writeFile(path.join(rootDir,'data','cardData.json'),JSON.stringify(cart),(err)=>{
                console.log(err);
            })
        })
    }

    static fetchallcart(cb) {
    fs.readFile(path.join(rootDir, 'data', 'cardData.json'), (err, fileContent) => {
        if (err) {
            return cb({ products: [], totalPrice: 0 });
        }
        cb(JSON.parse(fileContent));
    });
}

}
