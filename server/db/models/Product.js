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
  },
  price: {
    type: Sequelize.INTEGER,
    validate: {
      min: 1, // 0?
    },
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue:
      "https://assets.listia.com/photos/c939fcdb265d78ca912c/original.png?s=800x600g&sig=ead89c2504676d3c&ts=1446824194",
  },
})

module.exports = Product
