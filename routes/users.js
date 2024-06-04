const express = require('express');
const router = express.Router();
const getaddproducts = require('../controllers/admin');


router.get('/add-users',getaddproducts.getap);

router.post('/add-users',getaddproducts.postproar);

router.get('/products',getaddproducts.getadmp);


router.get('/edit-product/:id',getaddproducts.getedp);

router.post('/edit-product/:id' , getaddproducts.postedp );

router.get('/delete-product/:id', getaddproducts.delp);

module.exports = {route : router,
}




