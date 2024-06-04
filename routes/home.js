const express = require('express');
const router = express.Router();
const gethome = require('../controllers/shop');


router.get('/',gethome.getin);

router.get('/cart', gethome.getc);

router.post('/cart', gethome.postc);

router.get('/product-info', gethome.getpi);

router.get('/checkout', gethome.getch);

router.get('/products/:id', gethome.getpid);

router.get('/products' , gethome.getpr);

router.get('/remove-item/:id',gethome.removeit);

module.exports = router;

