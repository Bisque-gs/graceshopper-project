const Sequelize = require("sequelize")
const db = require("../db")

const OrderProducts = db.define("orderProducts", {
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 1,
  },

  // price (in cents) needs to be set at checkout (at view cart?), not at add-to-cart, to avoid price conflicts
  price: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0,
    },
    defaultValue: 0,
  },
})

module.exports = OrderProducts
