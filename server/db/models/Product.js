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
  pokeType: {
    type: Sequelize.STRING,
    defaultValue: "normal",
  },
})

Product.beforeValidate((product) => {
  if (product.quantity < 0) {
    throw new Error(
      `${product._previousDataValues.quantity} ${product.name}s remaining in stock`
    )
  }
})

module.exports = Product
