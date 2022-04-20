const Sequelize = require("sequelize")
const db = require("../db")

const Order = db.define("order", {
  isCurrentOrder: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
})

module.exports = Order
