const router = require("express").Router()
const { User, Order, OrderProducts, Product } = require("../db")
const Sequelize = require("sequelize")
module.exports = router
//  Here we are "mounted on" (starts with) /api/users

//GET /api/users
router.get("/", async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and username fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ["id", "username", "email"],
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

//GET /api/users/:userid/cart
router.get("/:id/cart", async (req, res, next) => {
  try {
    const userAllOrders = await Order.findAll({
      where: { userId: req.params.id },
    })
    const currentOrder = userAllOrders.filter((order) => {
      return order.dataValues.isCurrentOrder
    })

    if (!currentOrder[0]) {
      res.send(0)
      throw new Error("This cart is empty.")
    }
    
    const itemQuantities = await OrderProducts.findAll({
      where: { orderId: currentOrder[0].id },
      // include: {
      //   model: Product,
      //   // where: {

      //   // }
      // },
    })
    console.log("itemQuantities")
    const cartItems = await Promise.all(
      itemQuantities.map((item) => {
        return Product.findByPk(item.dataValues.productId)
      })
    )

    const updatedPrices = await Promise.all(
      itemQuantities.map((x, i) => {
        return x.update({ price: Number(cartItems[i].price) * 100 })
      })
    )
    res.send({ userAllOrders, currentOrder, updatedPrices, cartItems })
  } catch (err) {
    err.message = "Empty cart"
    next(err)
  }
})

//POST /api/users/:userid/orders/:productId/:quantity
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

    const orderId = order.dataValues.id

    // there was a conflict with users adding the same item twice. solved below:
    // check if orderProduct exists. if so, update it. if not, create it
    let orderProduct = await OrderProducts.findOne({
      where: {
        orderId,
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

// DELETE /api/users/:userid/cart/:itemId
//THIS ROUTE DELETES AN ITEM FROM A USERS CART
router.delete("/:userId/cart/:itemId", async (req, res, next) => {
  try {
    //find the current Order associated with user
    const order = await Order.findOne({
      where: { userId: req.params.userId, isCurrentOrder: true },
    })
    const item = await OrderProducts.findOne({
      where: { productId: req.params.itemId, orderId: order.id },
    })
    console.log(item)
    await item.destroy()
    res.send(item)
  } catch (error) {
    next(error)
  }
})

//HERE I WANT TO DECREMENT THE QUANTITY OF THE ITEM THAT HAS BEEN ORDERED VIA CHECKOUT
//req.body will be the quantity of all the items that we want to decrement
//req.body should essentially contain the entry from the orderProducts thru table asssociated with that item

//  if product has enough quantity:
//    update quantity
//    change order.isCurrentOrder to be false
//    res.send(?????) currently sending product info
//  else:
//    res.send(item that failed, quantity available)

//PUT /api/users/:userid
router.put("/:userId/cart/checkout", async (req, res, next) => {
  try {   
      updatedItems = await Promise.all(
      req.body.itemQuantities.map((item) => {
        let olditem = Product.findByPk(item.productId)
        olditem = Product.increment(
          { quantity: -item.quantity },
          { where: { id: item.productId } }
        )
        return olditem
      })
    )
    await Order.update(
      { isCurrentOrder: false },
      { where: { id: req.body.itemQuantities[0].orderId } }
    )
    res.send(updatedItems)

  } catch (error) {
    next(error)
  }
})

//HERE I WANT TO UPDATE THE QUANITY OF AN ITEM ORDER IN THE ORDER_PRODCUTS THRU TABLE
//PUT /api/users/:userid
router.put("/:userId/cart/:itemId", async (req, res, next) => {
  try {
    //find the current Order associated with user
    const order = await Order.findOne({
      where: { userId: req.params.userId, isCurrentOrder: true },
    })
    const item = await OrderProducts.findOne({
      where: { productId: req.params.itemId, orderId: order.id },
    })
    res.send(await item.update(req.body))
  } catch (error) {
    next(error)
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