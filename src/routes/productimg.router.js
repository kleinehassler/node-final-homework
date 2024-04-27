const { getAll, create, getOne, remove, update } = require('../controllers/productimg.controllers');
const express = require('express');
const { verifyJwt } = require('../utils/verifyJWT');

const routerProductImg = express.Router();

routerProductImg.route('/')
    .get(verifyJwt, getAll)
    .post(verifyJwt, create);

routerProductImg.route('/:id')
    .get(verifyJwt, getOne)
    .delete(verifyJwt, remove)


module.exports = routerProductImg;