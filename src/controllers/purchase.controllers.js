const catchError = require('../utils/catchError');
const Purchase = require('../models/Purchase');

const getAll = catchError(async(req, res) => {
    const results = await Purchase.findAll();
    return res.json(results);
});

const create = catchError(async(req, res) => {
    const result = await Purchase.create(req.body);
    return res.status(201).json(result);
});

const getOne = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Purchase.findByPk(id);
    if(!result) return res.sendStatus(404);
    return res.json(result);
});



module.exports = {
    getAll,
    create,
    getOne
}