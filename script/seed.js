const { green, red } = require("chalk")
const { db } = require("../server/db")
const { Product, User, Order } = require("../server/db/")

const seed = async () => {
  try {
    await db.sync({ force: true })

    const user1 = await User.create({
      username: "spencer69",
      password: "password123",
      email: "test@email.com",
    })

    const user2 = await User.create({
      username: "Brian69",
      password: "hello1234",
      email: "test2@email.com",
    })

    // const robot3 = await Robot.create({
    //   name: "Bender",
    //   fuelLevel: 69,
    //   imageUrl:
    //     "https://upload.wikimedia.org/wikipedia/en/a/a6/Bender_Rodriguez.png",
    // });

    const product1 = await Product.create({
      name: "Pikachu",
      quantity: 100,
      price: 25,
    })

    const product2 = await Product.create({
      name: "Charizard",
      quantity: 4,
      price: 500.35,
    })

    // const project3 = await Project.create({
    //   title: "Open the pod bay doors",
    //   priority: 10,
    // });

    const order1 = await Order.create({
      isCurrentOrder: true,
    })

    await order1.setProducts([product1, product2])
    await user1.setOrders(order1)
  } catch (err) {
    console.log(red(err))
  }
}

module.exports = seed
// If this module is being required from another module, then we just export the
// function, to be used as necessary. But it will run right away if the module
// is executed directly (e.g. `node seed.js` or `npm run seed`)
if (require.main === module) {
  seed()
    .then(() => {
      console.log(green("Seeding success!"))
      db.close()
    })
    .catch((err) => {
      console.error(red("Oh noes! Something went wrong!"))
      console.error(err)
      db.close()
    })
}
