const User = require("../models/User")

const userCreate = async () => {
  const user = {
    firstName: 'Kleine',
    lastName: "Hassler",
    email: "kleine@mail.com",
    password: "123456",
    phone: "1234567890"
  }
  await User.create(user)
}

module.exports = userCreate