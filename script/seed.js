
const { db } = require("../server/db")
const { Product, User, Order } = require("../server/db/")
const axios = require("axios")
const { faker } = require("@faker-js/faker")

const seed = async () => {
  try {
    await db.sync({ force: true })

    async function userGenerator() {
      let username = faker.random.word()
      const user = await User.create({
        username: username,
        password: faker.random.word(),
        email: `${username}@gmail.com`,
      })
      return user
    }

    for (let i = 1; i <= 10; i++) {
      await userGenerator()
    }

    async function productGenerator(index) {
      let obj = {}
      let quantity = faker.datatype.number({ min: 1, max: 100 })
      let price = faker.datatype.number({ min: 1, max: 10000, precision: 1 })
      const { data } = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${index}/`
      )
      obj.pokId = data.id
      obj.name = data.name
      const product = await Product.create({
        name: obj.name,
        price: price,
        quantity: quantity,
        imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${obj.pokId}.png`,
      })
      return product
    }

    for (let i = 1; i <= 25; i++) {
      await productGenerator(i)
    }

    const user1 = await User.create({
      username: "spencer69",
      password: "password123",
      email: "test@email.com",
      isAdmin: true,
    })

    const user2 = await User.create({
      username: "Brian69",
      password: "hello1234",
      email: "test2@email.com",
    })

    const product1 = await Product.create({
      name: "Magic Bebra",
      quantity: 10,
      price: 2500,
    })
    const product2 = await Product.create({
      name: "Crazy Steve",
      quantity: 10,
      price: 7000,
    })

    const order1 = await Order.create({
      isCurrentOrder: true,
    })

    await order1.setProducts([product1, product2])
    await user1.setOrders(order1)
  } catch (err) {
    console.log(err)
  }
}

module.exports = seed
if (require.main === module) {
  seed()
    .then(() => {
      console.log("Seeding success!")
      db.close()
    })
    .catch((err) => {
      console.error("Oh noes! Something went wrong!")
      console.error(err)
      db.close()
    })
}
