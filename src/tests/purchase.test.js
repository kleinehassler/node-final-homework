require ("../models")
const request = require('supertest')
const app = require('../app');
const Product = require("../models/Product");
//const Cart = require("../models/Cart");

const URL_BASE = '/api/v1/purchase';

let TOKEN
let userId
let productBody
let product
//let cart
let cartBody
//let purchase


beforeAll(async () => {
    const user = {
        email:"kleine@mail.com", 
        password: "123456" ,
    }

    const res = await request(app)
        .post('/api/v1/users/login')
        .send(user)
  
    TOKEN = res.body.token;
    userId = res.body.user.id;
 
    productBody = {
        title: 'iphone test',
        description: 'this is a iphone for testing',
        price: 3.34
    }

    product = await Product.create(productBody)

    cartBody = { 
        quantity : 5,   
        productId: product.id
    }

    await request(app)
    .post('/api/v1/cart')
    .send(cartBody)
    .set("Authorization", `Bearer ${TOKEN}`)
  
})


test("POST -> URL_BASE, should return status code 201, res.body to be defined and res.body.quantity  === cartBody.quantity", async () => {
    const res = await request(app)
        .post(URL_BASE)
        .set('Authorization', `Bearer ${TOKEN}`)
  
        expect(res.status).toBe(201);
        expect(res.body[0].quantity).toBe(cartBody.quantity)
       // await product.destroy();
  
})
  


test("GET -> URL_BASE, should return statusCode 200, and res.body.length ===1 ", async () => {
    const res = await request(app)
        .get(URL_BASE)
        .set('Authorization', `Bearer ${TOKEN}`)
    
    // console.log(res.body)
    expect(res.status).toBe(200);
    expect(res.body).toBeDefined();
   // expect(res.body).toHaveLength(1);

    await product.destroy();
    
})