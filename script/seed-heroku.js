
const { db } = require("../server/db")
const { Product, User, Order } = require("../server/db/")

const products = [
  {
    name: "bulbasaur",
    price: 4354,
    quantity: 34,
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png"
  },
  {
    name: "ivysaur",
    price: 6331,
    quantity: 23,
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/2.png"
  },
  {
    name: "venusaur",
    price: 1245,
    quantity: 14,
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/3.png"
  },
  {
    name: "charmander",
    price: 4632,
    quantity: 87,
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png"
  },
  {
    name: "charmeleon",
    price: 1897,
    quantity: 87,
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/5.png"
  },
  {
    name: "charizard",
    price: 6441,
    quantity: 11,
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/6.png"
  },
  {
    name: "squirtle",
    price: 7651,
    quantity: 22,
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/7.png"
  },
  {
    name: "wartortle",
    price: 9786,
    quantity: 23,
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/8.png"
  },
  {
    name: "blastoise",
    price: 5443,
    quantity: 19,
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/9.png"
  },
  {
    name: "caterpie",
    price: 125,
    quantity: 99,
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10.png"
  },
  {
    name: "metapod",
    price: 3456,
    quantity: 23,
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/11.png"
  },
  {
    name: "butterfree",
    price: 9999,
    quantity: 2,
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/12.png"
  },
  {
    name: "weedle",
    price: 1,
    quantity: 99,
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/13.png"
  },
  {
    name: "kakuna",
    price: 100,
    quantity: 70,
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/14.png"
  },
  {
    name: "beedrill",
    price: 1000,
    quantity: 30,
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/15.png"
  },
  {
    name: "pidgey",
    price: 8,
    quantity: 98,
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/16.png"
  },
  {
    name: "pidgeotto",
    price: 954,
    quantity: 68,
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/17.png"
  },
  {
    name: "pidgeot",
    price: 4023,
    quantity: 21,
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/18.png"
  },
  {
    name: "rattata",
    price: 675,
    quantity: 65,
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/19.png"
  },
  {
    name: "raticate",
    price: 4563,
    quantity: 34,
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/20.png"
  },
  {
    name: "spearow",
    price: 675,
    quantity: 24,
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/21.png"
  },
  {
    name: "fearow",
    price: 5685,
    quantity: 87,
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/22.png"
  },
  {
    name: "ekans",
    price: 1234,
    quantity: 96,
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/23.png"
  },
  {
    name: "arbok",
    price: 978,
    quantity: 23,
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/24.png"
  },
  {
    name: "pikachu",
    price: 10000,
    quantity: 100,
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png"
  },
];

const users = [
  {
    username: "mark",
    password: "jemison",
    email: "mark@mail.com"
  },
  {
    username: "anton",
    password: "leroy",
    email: "anton@mail.com"
  },
  {
    username: "igor",
    password: "dima",
    email: "igor@mail.com"
  },
  {
    username: "vasya",
    password: "petya",
    email: "vasya@mail.com"
  },
  {
    username: "grisha",
    password: "yeger",
    email: "grisha@mail.com"
  },
  {
    username: "oniichan",
    password: "yametekudasai",
    email: "oniichan@mail.com"
  },
  {
    username: "hello",
    password: "goodbye",
    email: "hello@mail.com"
  },
  {
    username: "turtle",
    password: "nourturtle",
    email: "turtle@mail.com"
  },
  {
    username: "yareyare",
    password: "daze",
    email: "yareyare@mail.com"
  },
  {
    username: "platinum",
    password: "zaworudo",
    email: "platinum@mail.com"
  },
  {
    username: "leslie",
    password: "john",
    email: "leslie@mail.com"
  },
  {
    username: "masha",
    password: "parasha",
    email: "masha@mail.com"
  },
  {
    username: "yaebal",
    password: "tvoirot",
    email: "yaebal@mail.com"
  },
  {
    username: "cream",
    password: "icing",
    email: "cream@mail.com"
  },
  {
    username: "sweet",
    password: "sour",
    email: "sweet@mail.com"
  },
];

const seed = async () => {
  try {
    await db.sync({ force: true })

    await Promise.all(
      products.map((product) => {
        return Product.create(product);
      })
    );
    await Promise.all(
      users.map((user) => {
        return User.create(user);
      })
    );

    const user1 = await User.create({
      username: "spencer69",
      password: "password123",
      email: "spencer69@email.com",
      isAdmin: true,
    })

    const user2 = await User.create({
      username: "brian69",
      password: "hello1234",
      email: "brian69@email.com",
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
