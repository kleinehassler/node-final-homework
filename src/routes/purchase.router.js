const { getAll, create, getOne, remove, update } = require('../controllers/purchase.controllers');
const express = require('express');

const { verifyJwt } = require('../utils/verifyJWT');

const routePurchase = express.Router();

routePurchase.route('/')
    .get(verifyJwt, getAll)
    .post(verifyJwt, create);


module.exports = routePurchase;