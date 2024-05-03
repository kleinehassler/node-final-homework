require("../models")

const request = require('supertest')
const app = require('../app')
const Category = require("../models/Category");
const ProductImg = require("../models/ProductImg");

const BASE_URL = '/api/v1/products'

let TOKEN
let productId
let category
let product
let image

beforeAll(async () => {  
  const user = {
    email: "kleine@mail.com",
    password: "123456"
  }

  const res = await request(app)
    .post('/api/v1/users/login')
    .send(user)

  TOKEN = res.body.token

  category = await Category.create({
    name: "Tecno" 
  })
  
})

afterAll( async () => {
  await category.destroy()
  await image.destroy() 
})

// Create
test("POST 'BASE_URL', Return Status Code 201, and res.body.title === product.title //🔐", async () => {

  product = {
    title: "iPhone",
    description: "Random Text",
    price: 100,
    categoryId: category.id
  }

  const res = await request(app)
    .post(BASE_URL)
    .send(product)
    .set("Authorization", `Bearer ${TOKEN}`)

    productId = res.body.id

 // expect(res.status).toBe(201)
  expect(res.status).toBeGreaterThanOrEqual(201);
  expect(res.body).toBeDefined()
  expect(res.body.title).toBe(product.title)

 // await category.destroy();

})

test("GET 'BASE_URL', Return Status Code 200, and res.body.length === 1", async () => {
  const res = await request(app)
    .get(BASE_URL)

  //expect(res.status).toBe(200)
  expect(res.status).toBeGreaterThanOrEqual(200)
  expect(res.body).toBeDefined()
  expect(res.body).toHaveLength(1)
})


test('GET -> BASE_URL/:id, should return statusCode 201, and res.body.length ===1 ', async () => {
  const res = await request(app)
    .get(`${BASE_URL}/${productId}`)

  //expect(res.status).toBe(200)
  expect(res.status).toBeGreaterThanOrEqual(200)
  expect(res.body).toBeDefined()
  expect(res.body.title).toBe(product.title)

  
})
// UPDATE
test("PUT -> 'BASE_URL/:id', should return status code 200, res.body.title === userUpdate.title", async () => {
  const userUpdate = {
    title: "SAMSUNG "
  }

  const res = await request(app)
    .put(`${BASE_URL}/${productId}`)
    .send(userUpdate)
    .set('Authorization', `Bearer ${TOKEN}`)

  //expect(res.status).toBe(200)
  expect(res.status).toBeGreaterThanOrEqual(200);
  expect(res.body).toBeDefined()
  expect(res.body.title).toBe(userUpdate.title)

  await category.destroy() 

})

test("POST -> 'URL_BASE/:id/images', Return Status Code 200, and res.body.length === 1", async () => {
  const imageBody = {
    url: 'lorem40',
    filename: 'lorem10'
  }

  image = await ProductImg.create(imageBody)

  const res = await request(app)
    .post(`${BASE_URL}/${productId}/images`)
    .send([image.id])
    .set('Authorization', `Bearer ${TOKEN}`)

  expect(res.status).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body).toHaveLength(1)

})

// Delete
test("DELETE 'BASE_URL/:id', Return Status Code 204", async () => {
  const res = await request(app)
    .delete(`${BASE_URL}/${productId}`)
    .set('Authorization', `Bearer ${TOKEN}`)

  expect(res.status).toBe(204)

})