const request = require("supertest")
const app = require("../app")

const BASE_URL = '/api/v1/users'

let TOKEN
let userId

beforeAll(async () => {
  const user = {
    email: "kleine@mail.com",
    password: "123456"
  }

  const res = await request(app)
    .post(`${BASE_URL}/login`)
    .send(user)
  
  TOKEN = res.body.token
})

test("GET -> BASE_URL, Return Status Code 200, res.body.length === 1", async () => {
  const res = await request(app)
    .get(BASE_URL)
    .set('Authorization', `Bearer ${TOKEN}`)

  expect(res.statusCode).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body).toHaveLength(1)
})

test("POST -> BASE_URL, Return Status Code 201, res.body.firstName === user.firstName", async () => {
  const user = {
    firstName: "Kleine",
    lastName: "Hassler",
    email: "kleine@gmail.com",
    password: "123456",
    phone: "1234"
  }

  const res = await request(app)
    .post(BASE_URL)
    .send(user)

  userId = res.body.id

  expect(res.statusCode).toBe(201);
  expect(res.body).toBeDefined();
  expect(res.body.firstName).toBe(user.firstName)
})

test("PUT -> 'BASE_URL/:id', Return Status Code 200, res.body.lastName === userUpdate.lastName", async () => {
  const userUpdate = {
    lastName: "Morales"
  }

  const res = await request(app)
    .put(`${BASE_URL}/${userId}`)
    .send(userUpdate)
    .set('Authorization', `Bearer ${TOKEN}`)

  expect(res.status).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body.lastName).toBe(userUpdate.lastName)
})

test("POST -> 'BASE_URL/login', Return Status Code 200, res.body.user.email === user.email and res.body.token tobe defined ", async () => {

  const user = {
    email: "kleine@mail.com",
    password: "123456"
  }

  const res = await request(app)
    .post(`${BASE_URL}/login`)
    .send(user)

  expect(res.statusCode).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body.user.email).toBe(user.email)
  expect(res.body.token).toBeDefined()
})

test("POST 'BASE_URL/login', Return Status Code 401", async () => {
  const userInvalid = {
    email: "kleine@mail.com",
    password: "Invalid password"
  }

  const res = await request(app)
    .post(`${BASE_URL}/login`)
    .send(userInvalid)

  expect(res.statusCode).toBe(401)
})

test("DELETE ->'BASE_URL/:id', Return Status Code 204", async () => {
  const res = await request(app)
    .delete(`${BASE_URL}/${userId}`)
    .set('Authorization', `Bearer ${TOKEN}`)

  expect(res.statusCode).toBeGreaterThanOrEqual(204);
})