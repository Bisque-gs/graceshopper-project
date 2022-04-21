const Sequelize = require("sequelize")
const db = require("../db")

const OrderProducts = db.define("orderProducts", {
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 1,
  },
  price: {
    type: Sequelize.DECIMAL(10, 2),
    validate: {
      min: 0.01,
    },
  },
})

module.exports = OrderProducts
