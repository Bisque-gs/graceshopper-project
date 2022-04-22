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
    defaultValue:
      "https://i.imgur.com/PD5Nx4d.png",
  },
})

//TRYING TO VALIDATE QUANITY UPON CHECKOUT 
Product.beforeUpdate( (product) => {
//  let olditem = await Product.findByPk(product.id)
  //  console.log('OLD ITEM', olditem)
  // if ((olditem.quantity - product.quantity) < 0) {
  //   throw new Error("CANNOT GO BELOW 0")
  // }
  }
)

Product.beforeValidate((product) => {

})



module.exports = Product
