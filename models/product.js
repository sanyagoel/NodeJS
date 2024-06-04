const fs = require('fs');
const path = require('path');
const rootDir = require('../utils/path');
const p = path.join(rootDir,'data','productData.json');

const getAllProducts = (cb)=>{
        
    let produc = [];
    fs.readFile(p,(err,fileContent)=>{
        if(err){
            return cb([]);
        }
        produc = JSON.parse(fileContent);
        console.log(produc);
        cb(produc);
    }
)
}

const editProductWrite = (products)=>{
    fs.writeFile(p,JSON.stringify(products),(err)=>{
        console.log(err);
    })
}

const pr = class Product{
    constructor(title,imageurl,description,price){
        this.title = title;
        this.imageurl = imageurl;
        this.description = description;
        this.price = price;
        this.id = Math.random().toString();
    }

    save(){
        getAllProducts((products)=>{
            products.push(this);
            fs.writeFile(p,JSON.stringify(products),(err)=>{
                console.log(err);
            });
        });
        
    }

    static fetchall(cb){

       getAllProducts(cb);
    
    }

    static findbyID(id,cb){
        getAllProducts((products)=>{
            const product = products.find(p=> p.id == id);
            cb(product);
        })
    }
}

module.exports = pr;

