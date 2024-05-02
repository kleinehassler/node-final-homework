const { getAll, create,  remove } = require('../controllers/productimg.controllers');
const express = require('express');
const { verifyJwt } = require('../utils/verifyJWT');

const routerProductImg = express.Router();

routerProductImg.route('/')
    .get(verifyJwt, getAll)
    .post(verifyJwt, create);

routerProductImg.route('/:id')
    .delete(verifyJwt, remove)


module.exports = routerProductImg;