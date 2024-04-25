const { getAll, create, getOne, remove, update } = require('../controllers/purchase.controllers');
const express = require('express');

const routePurchase = express.Router();

routePurchase.route('/')
    .get(getAll)
    .post(create);

routePurchase.route('/:id')
    .get(getOne)
    .delete(remove)
    .put(update);

module.exports = routePurchase;