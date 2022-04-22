const Sequelize = require("sequelize");
const db = require("../db");

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
    type: Sequelize.DECIMAL(10, 2),
    validate: {
      min: 0.01,
    },
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue:
      "https://i.imgur.com/PD5Nx4d.png",
  },
});

module.exports = Product;
