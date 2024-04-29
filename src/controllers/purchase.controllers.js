const catchError = require('../utils/catchError');
const Purchase = require('../models/Purchase');
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const Category = require('../models/Category');
const ProductImg = require('../models/ProductImg');

const getAll = catchError(async(req, res) => {
    const userId = req.user.id
    const result = await Purchase.findAll({
      where: { userId },
      include: [
        {
          model: Product,
          attributes: { exclude: ["createdAt", "updatedAt"] },
          include: [
            {
              model: Category,
              attributes: ["name"]
            }
          ]
        }
      ]
    })
    return res.json(results);
});

const create = catchError(async(req, res) => {
//    const result = await Purchase.create(req.body);
// Leer de Cart
  const userId = req.user.id
  const quantity = 'quantity'
  const cart = await Cart.findAll({
    where: { userId },
    raw: true,
    attributes: [quantity, 'userId', 'productId']
  })
    // Copiar a Purchases
    if (!cart) return res.sendStatus(404)
    const copyCart = await Purchase.bulkCreate(cart)
    if (!copyCart) return copyCart.sendStatus(404)
    console.log(copyCart);
    // Eliminar Registros de Cart
    await Cart.destroy({ where: { userId } })
    return res.status(201).json(result);
});



module.exports = {
    getAll,
    create
}