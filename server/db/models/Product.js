const Sequelize = require("sequelize")
const db = require("../db")

const Product = db.define("product", {
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  quantity: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0,
    },
  },
  price: {
    type: Sequelize.INTEGER,
    validate: {
      min: 1, // 0?
    },
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue: "https://i.imgur.com/PD5Nx4d.png",
  },
})

//TRYING TO VALIDATE QUANITY UPON CHECKOUT
// can't use beforeUpdate, this runs after changes are attempted.
// Product.beforeUpdate((product) => {
//   // let olditem = await Product.findByPk(product.id)
//   console.log(product.quantity)
//   if (product.quantity < 0) {
//     console.log("beforeUpdate")

//     // throw new Error("CANNOT GO BELOW 0")
//   }
// })

Product.beforeValidate((product) => {
  if (product.quantity < 0) {
    // const error = new Error(`{
    //   "name": "${product.name}",
    //   "quantityInStock": ${product._previousDataValues.quantity}
    // }`)
    const error = new Error(JSON.stringify(product._previousDataValues))
    throw error
  }
})

module.exports = Product
