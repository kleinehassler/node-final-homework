const express = require('express');
const routerUser = require('./user.router');
const routerCategory = require('./category.router');
const routerProduct = require('./product.router');
const routerCart = require('./cart.router');
const routePurchase = require('./purchase.router');
const routerProductImg = require('./productimg.router');
const router = express.Router();

// colocar las rutas aquí
router.use('/users', routerUser)
router.use('/categories', routerCategory)
router.use('/products', routerProduct)
router.use('/carts', routerCart)
router.use('/purchases', routePurchase)
router.use('/ProductsImages', routerProductImg)
module.exports = router;