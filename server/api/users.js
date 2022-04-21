const router = require("express").Router()
const { User, Order, OrderProducts, Product } = require("../db")
module.exports = router
//  Here we are "mounted on" (starts with) /api/users

//GET /api/users
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

//GET /api/users/:userid
router.get("/:id", async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id)
    res.send(user)
  } catch (err) {
    next(err)
  }
})

//First we Grab all the orders associated with that user
//Next we filter all the orders and grab the 'current order', the one with a status of True
//Then we grab all the entries in our through table that share the same OrderId
//Then we map over this array and we grab all the items from our item model and save that in an item array
//send all info to front end

//GET /api/users/:userid/orders
router.get("/:id/orders", async (req, res, next) => {
  try {
    const userAllOrders = await Order.findAll({
      where: { userId: req.params.id },
    })
    const currentOrder = userAllOrders.filter((order) => {
      return order.dataValues.isCurrentOrder
    })
    const itemQuantities = await OrderProducts.findAll({
      where: { orderId: currentOrder[0].id },
    })
    const cartItems = await Promise.all(
      itemQuantities.map((item) => {
        return Product.findByPk(item.dataValues.productId)
      })
    )
    res.send({ userAllOrders, currentOrder, itemQuantities, cartItems })
  } catch (err) {
    next(err)
  }
})

//POST /api/users/:userid/orders/:productId
router.post("/:userId/orders/:productId/:quantity", async (req, res, next) => {
  try {
    // check if cart (order) exists. if so, find it. if not, create it
    let order = await Order.findOne({
      where: {
        isCurrentOrder: true,
        userId: Number(req.params.userId),
      },
    })

    if (!order) {
      console.log("first item in new order")
      order = await Order.create(req.body)
    } else {
      console.log("adding to existing order")
    }

    // get the id of the new order
    const orderId = order.dataValues.id

    // there was a conflict with users adding the same item twice. solved below:
    // check if orderProduct exists. if so, update it. if not, create it
    let orderProduct = await OrderProducts.findOne({
      where: {
        productId: Number(req.params.productId),
      },
    })

    // create corresponding orderProduct
    if (!orderProduct) {
      console.log("first of this product in this order")
      orderProduct = await OrderProducts.create({
        orderId,
        productId: Number(req.params.productId),
        quantity: Number(req.params.quantity),
      })
    } else {
      console.log("product already exists in this order; adding to quantity")
      const alreadyInCart = orderProduct.quantity
      await orderProduct.update({
        quantity: Number(req.params.quantity) + alreadyInCart,
      })
    }

    res.send({ order, orderProduct })
  } catch (err) {
    next(err)
  }
})

//PUT /api/users/:userid
router.put("/:id", async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id)
    res.send(await user.update(req.body))
  } catch (error) {
    next(error)
  }
})

// DELETE /api/users/:userid/orders/:orderId
// DELETE /api/users/:userid/cart/:itemId
//gets rid of the order entirely
router.delete("/:userId/cart/:itemId", async (req, res, next) => {
  try {
    console.log(req.params)
    const item = await OrderProducts.findOne({
      where: { productId: req.params.itemId },
    })
    console.log(item)
    await item.destroy()
    res.send(item)
  } catch (error) {
    next(error)
  }
})
