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
    validate: {
      min: 0,
    },
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
      "https://assets.listia.com/photos/c939fcdb265d78ca912c/original.png?s=800x600g&sig=ead89c2504676d3c&ts=1446824194",
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



module.exports = Product;
