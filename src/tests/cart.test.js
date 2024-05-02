
require("../models")

const request = require('supertest');
const app = require('../app');
const Product = require('../models/Product');
const User = require('../models/User');

const BASE_URL = '/api/v1/carts'

let TOKEN;
//let productId;
let productBody;
let cartBody;
let product;
let userId;
let cartId;

beforeAll(async () => {  
    const user = {
      email: "kleine@mail.com",
      password: "123456"
    }
  
    const res = await request(app)
      .post('/api/v1/users/login')
      .send(user)

    userId = res.body.user.id
    TOKEN = res.body.token

    productBody = {
        title: "iPhone",
        description: "Random Text",
        price: 100
    }

    product = await Product.create(productBody);
    
    cartBody = {
      quantity: 1,
      productId: product.id
    }


  });
  

// Create Cart
test("POST 'BASE_URL', Return Status Code 201, and res.body.quantity === cart.quantity //🔐", async () => {

  const res = await request(app)
    .post(BASE_URL)
    .send(cartBody)
    .set("Authorization", `Bearer ${TOKEN}`)

  cartId = res.body.id

  expect(res.status).toBe(201);
  expect(res.body).toBeDefined();
  expect(res.body.quantity).toBe(cartBody.quantity);
  expect(res.body.userId).toBe(userId);
})



// GetAll Cart
test("GET 'BASE_URL', Return Status Code 200, and res.body.length === 1 //🔐", async () => {

    const res = await request(app)
        .get(BASE_URL)
        .set("Authorization", `Bearer ${TOKEN}`)

    expect(res.status).toBe(200);
    expect(res.body).toBeDefined();
    expect(res.body).toHaveLength(1);

})


// GET ONE
test("GET -> 'URL_BASE/:id', should status 200, res.body to be defined and res.body.quantity === bodyCart.quantity", async () => {
  const res = await request(app)
    .get(`${BASE_URL}/${cartId}`)
    .set('Authorization', `Bearer ${TOKEN}`)

  expect(res.status).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body.quantity).toBe(cartBody.quantity)

  expect(res.body.userId).toBeDefined()
  expect(res.body.userId).toBe(userId)

  expect(res.body.productId).toBeDefined()
  expect(res.body.productId).toBe(product.id)
})

// UPDATE

test("PUT 'BASE_URL/:id', Return Status Code 200, and res.body.quantity === bodyUpdate.quantity //🔐", async () => {
    const bodyUpdate = {
        quantity: 5
    }

    const  res = await request(app)
        .put(`${BASE_URL}/${cartId}`)
        .send(bodyUpdate)
        .set("Authorization", `Bearer ${TOKEN}`)

        expect(res.status).toBe(200)
        expect(res.body).toBeDefined()
        expect(res.body.quantity).toBe(5)

})


// DELETE
test("DELET 'BASE_URL/:id', Return Status Code 204", async () => {
    const res = await request(app)
      .delete(`${BASE_URL}/${cartId}`)
      .set('Authorization', `Bearer ${TOKEN}`)
  
    expect(res.status).toBe(204)

    await product.destroy();
    
})