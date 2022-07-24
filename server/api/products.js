const router = require("express").Router()
const { Product } = require("../db")
const { Op } = require("sequelize")
module.exports = router

router.get("/", async (req, res, next) => {
  try {
    const products = await Product.findAll()
    res.json(products)
  } catch (err) {
    next(err)
  }
})

router.get("/search", async (req, res, next) => {
  try {
    const products = await Product.findAll({
      where: {
        name: { [Op.substring]: req.headers.search },
      },
      // attributes: ["name", "quantity", "pokeType", "imageUrl"],
    })
    const cleanedUp = products.reduce((acc, x) => acc.concat(x.dataValues), [])
    res.json(cleanedUp)
  } catch (err) {
    next(err)
  }
})

router.get("/:id", async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id)
    res.send(product)
  } catch (err) {
    next(err)
  }
})
