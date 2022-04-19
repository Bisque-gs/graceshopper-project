const Sequelize = require("sequelize");
const db = require("../db");

const OrderProducts = db.define("orderProducts", {
  // name: {
  //   type: Sequelize.STRING,
  //   unique: true,
  //   allowNull: false,
  //   validate: {
  //     notEmpty: true,
  //   },
  // },
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 1,
  },
  // price: {
  //   type: Sequelize.DECIMAL(10, 2),
  //   validate: {
  //     min: 0.01,
  //   },
  // },
});

module.exports = OrderProducts;
