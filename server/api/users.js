const router = require("express").Router()
const { User, Order, OrderProducts } = require("../db")
module.exports = router

router.get("/", async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and username fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ["id", "username"],
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.get("/:id", async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id)
    res.send(user)
  } catch (err) {
    next(err)
  }
})

router.post("/:userId/orders/:orderId", async (req, res, next) => {
  try {
    const order = await Order.create(req.body)
    // const orderprod = await OrderProducts.update({req.params.userId, productId: orderId})

    res.send(order)
  } catch (err) {
    next(err)
  }
})
