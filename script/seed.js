const { db } = require("../server/db")
const { Product, User, Order } = require("../server/db/")
// const axios = require("axios") // use if you want to seed on localhost
// const { faker } = require("@faker-js/faker") // use if you want to seed on localhost


const cardData = require("./file.json");
// console.log('hototototo' , cardData)
const readCardData = () => {
  try {
    const cardObj = JSON.parse(JSON.stringify(cardData))
    //console.log("The Card Data is:", cardObj) // => "The Card Data is: Infinity Loop Drive"
    return cardObj;
  } catch (err) {
    console.log("Error parsing JSON string:", err);
  }
};

 const alotOfPoke = readCardData();

 //Lets just grab the names 

const pokeArr = alotOfPoke.data.map((input) => {
  let cardData = {
    name: input.name,
    images: input.images,
    cardmarket: input.cardmarket,
    type: input.types
  }
  return cardData
})
 
)



const products = [
  {
    name: "bulbasaur",
    price: 4354,
    quantity: 34,
    imageUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png",
    pokeType: "grass",
  },
  {
    name: "ivysaur",
    price: 6331,
    quantity: 23,
    imageUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/2.png",
    pokeType: "grass",
  },
  {
    name: "venusaur",
    price: 1245,
    quantity: 9,
    imageUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/3.png",
    pokeType: "grass",
  },
  {
    name: "charmander",
    price: 4632,
    quantity: 87,
    imageUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png",
    pokeType: "fire",
  },
  {
    name: "charmeleon",
    price: 1897,
    quantity: 87,
    imageUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/5.png",
    pokeType: "fire",
  },
  {
    name: "charizard",
    price: 6441,
    quantity: 11,
    imageUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/6.png",
    pokeType: "fire",
  },
  {
    name: "squirtle",
    price: 7651,
    quantity: 22,
    imageUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/7.png",
    pokeType: "water",
  },
  {
    name: "wartortle",
    price: 9786,
    quantity: 23,
    imageUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/8.png",
    pokeType: "water",
  },
  {
    name: "blastoise",
    price: 5443,
    quantity: 19,
    imageUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/9.png",
    pokeType: "water",
  },
  {
    name: "caterpie",
    price: 125,
    quantity: 99,
    imageUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10.png",
    pokeType: "bug",
  },
  {
    name: "metapod",
    price: 3456,
    quantity: 23,
    imageUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/11.png",
    pokeType: "bug",
  },
  {
    name: "butterfree",
    price: 9999,
    quantity: 2,
    imageUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/12.png",
    pokeType: "bug",
  },
  {
    name: "weedle",
    price: 1,
    quantity: 99,
    imageUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/13.png",
    pokeType: "bug",
  },
  {
    name: "kakuna",
    price: 100,
    quantity: 70,
    imageUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/14.png",
    pokeType: "bug",
  },
  {
    name: "beedrill",
    price: 1000,
    quantity: 30,
    imageUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/15.png",
    pokeType: "bug",
  },
  {
    name: "pidgey",
    price: 8,
    quantity: 98,
    imageUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/16.png",
    pokeType: "flying",
  },
  {
    name: "pidgeotto",
    price: 954,
    quantity: 68,
    imageUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/17.png",
    pokeType: "flying",
  },
  {
    name: "pidgeot",
    price: 4023,
    quantity: 21,
    imageUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/18.png",
    pokeType: "flying",
  },
  {
    name: "rattata",
    price: 675,
    quantity: 65,
    imageUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/19.png",
    pokeType: "normal",
  },
  {
    name: "raticate",
    price: 4563,
    quantity: 34,
    imageUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/20.png",
    pokeType: "normal",
  },
  {
    name: "spearow",
    price: 675,
    quantity: 24,
    imageUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/21.png",
    pokeType: "flying",
  },
  {
    name: "fearow",
    price: 5685,
    quantity: 87,
    imageUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/22.png",
    pokeType: "flying",
  },
  {
    name: "ekans",
    price: 1234,
    quantity: 96,
    imageUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/23.png",
    pokeType: "poison",
  },
  {
    name: "arbok",
    price: 978,
    quantity: 23,
    imageUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/24.png",
    pokeType: "poison",
  },
  {
    name: "pikachu",
    price: 10000,
    quantity: 100,
    imageUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png",
    pokeType: "electric",
  },
  {
    name: "raichu",
    price: 9300,
    quantity: 45,
    imageUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/26.png",
    pokeType: "electric",
  },
  {
    name: "sandshrew",
    price: 1704,
    quantity: 88,
    imageUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/27.png",
    pokeType: "ground",
  },
  {
    name: "sandslash",
    price: 3000,
    quantity: 68,
    imageUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/28.png",
    pokeType: "ground",
  },
]

const users = [
  {
    username: "mark",
    password: "jemison",
    email: "mark@mail.com",
    confirmed: true
  },
  {
    username: "anton",
    password: "leroy",
    email: "anton@mail.com",
    confirmed: true
  },
  {
    username: "igor",
    password: "dima",
    email: "igor@mail.com",
    confirmed: true
  },
  {
    username: "vasya",
    password: "petya",
    email: "vasya@mail.com",
    confirmed: true
  },
  {
    username: "grisha",
    password: "yeger",
    email: "grisha@mail.com",
    confirmed: true
  },
  {
    username: "oniichan",
    password: "yametekudasai",
    email: "oniichan@mail.com",
    confirmed: true
  },
  {
    username: "hello",
    password: "goodbye",
    email: "hello@mail.com",
    confirmed: true
  },
  {
    username: "turtle",
    password: "nourturtle",
    email: "turtle@mail.com",
    confirmed: true
  },
  {
    username: "yareyare",
    password: "daze",
    email: "yareyare@mail.com",
    confirmed: true
  },
  {
    username: "platinum",
    password: "zaworudo",
    email: "platinum@mail.com",
    confirmed: true
  },
  {
    username: "leslie",
    password: "john",
    email: "leslie@mail.com",
    confirmed: true
  },
  {
    username: "masha",
    password: "parasha",
    email: "masha@mail.com",
    confirmed: true
  },
  {
    username: "yaebal",
    password: "tvoirot",
    email: "yaebal@mail.com",
    confirmed: true
  },
  {
    username: "cream",
    password: "icing",
    email: "cream@mail.com",
    confirmed: true
  },
  {
    username: "sweet",
    password: "sour",
    email: "sweet@mail.com",
    confirmed: true
  },
]

const seed = async () => {
  try {
    await db.sync({ force: true })

    await Promise.all(
      products.map((product) => {
        return Product.create(product)
      })
    )
    await Promise.all(
      users.map((user) => {
        return User.create(user)
      })
    )

    const user1 = await User.create({
      username: "spencer69",
      password: "password123",
      email: "spencer69@email.com",
      isAdmin: true,
      confirmed: true
    })

    const user2 = await User.create({
      username: "brian69",
      password: "hello1234",
      email: "brian69@email.com",
      confirmed: true
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

    // use if you want to seed on localhost
    // async function userGenerator() {
    //   let username = faker.random.word()
    //   const user = await User.create({
    //     username: username,
    //     password: faker.random.word(),
    //     email: `${username}@gmail.com`,
    //   })
    //   return user
    // }

    // for (let i = 1; i <= 10; i++) {
    //   await userGenerator()
    // }

    // async function productGenerator(index) {
    //   let obj = {}
    //   let quantity = faker.datatype.number({ min: 1, max: 100 })
    //   let price = faker.datatype.number({ min: 1, max: 10000, precision: 1 })
    //   const { data } = await axios.get(
    //     `https://pokeapi.co/api/v2/pokemon/${index}/`
    //   )
    //   obj.pokId = data.id
    //   obj.name = data.name
    //   const product = await Product.create({
    //     name: obj.name,
    //     price: price,
    //     quantity: quantity,
    //     imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${obj.pokId}.png`,
    //   })
    //   return product
    // }

    // for (let i = 1; i <= 25; i++) {
    //   await productGenerator(i)
    // }
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
