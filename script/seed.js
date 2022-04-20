const { green, red } = require("chalk");
const { db } = require("../server/db");
const { Product, User, Order } = require("../server/db/");
const axios = require("axios");

const seed = async () => {
  try {
    await db.sync({ force: true })

    async function productGenerator(index) {
      let obj = {};
      const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${index}/`);
      obj.pokId = data.id;
      obj.name = data.name;
      const product = await Product.create({
        name: obj.name,
        price: 0.01,
        quantity: 100,
        imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${obj.pokId}.png`
      })
      return product;
    }

    for(let i = 1; i <= 25; i++) {
      await productGenerator(i);
    }

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

    const product1 = await Product.create({
      name: "Magic Bebra",
      quantity: 1,
      price: 25,
    })

    const order1 = await Order.create({
      isCurrentOrder: true,
    });

    await order1.setProducts([product1/*, product2*/]);
    await user1.setOrders(order1);
  } catch (err) {
    console.log(red(err))
  }
}

module.exports = seed;
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
