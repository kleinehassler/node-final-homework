const express = require('express');
const routerUser = require('./user.router');
const routerCategory = require('./category.router');
const router = express.Router();

// colocar las rutas aquí
router.use('/users', routerUser);
router.use('/categorys', routerCategory);

module.exports = router;