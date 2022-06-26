const router = require("express").Router()
const { User, Order, OrderProducts, Product } = require("../db")

module.exports = router

//GET /api/users/:userid
router.get("/:id", async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id)
    res.send(user)
  } catch (err) {
    next(err)
  }
})

//GET THE ORDER HISTORY FOR A USER:
//ITEM PURCHASED, AND THEIR PRICES AT THE TIME OF PURCHASE
//BASICALLY SHOULD LOAD UP THE ENTIRE CART
//NEED EVERY CART EVER FML
//GET /api/users/:userid/cart/orderhistory
router.get("/:id/cart/orderhistory", async (req, res, next) => {
  try {
    const userAllOrders = await Order.findAll({
      where: { userId: req.params.id },
      include: {
        model: Product, // including product also includes OrderProducts
      },
    })

    console.log("USER ALL ORDERS", userAllOrders)

    // const currentOrder = userAllOrders.filter((order) => {
    //   return order.dataValues.isCurrentOrder
    // })

    // if (!currentOrder[0]) {
    //   res.send(0)
    //   throw new Error("This cart is empty.")
    // }

    // const orderProducts = currentOrder[0].products.map((x) => x.orderProducts)

    // const cartItems = currentOrder[0].products

    // const updatedPrices = await Promise.all(
    //   orderProducts.map((x, i) => {
    //     return x.update({ price: Number(cartItems[i].price) * 100 })
    //   })
    // )
    res.send({ userAllOrders })

    // res.send({ userAllOrders, currentOrder, updatedPrices, cartItems })
  } catch (err) {
    err.message = "Empty cart"
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
      include: { model: Product },
    })

    const currentOrder = userAllOrders.filter((order) => order.isCurrentOrder)

    if (!currentOrder[0]) {
      res.send(0)
      throw new Error("This cart is empty.")
    }

    const cartItems = currentOrder[0].products
    const orderProducts = cartItems.map((x) => x.orderProducts)
    const updatedPrices = await Promise.all(
      orderProducts.map((x, i) => {
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
    const order = await Order.findOne({
      where: { userId: req.params.userId, isCurrentOrder: true },
      include: { model: Product },
    })
    const item = order.products
      .filter((x) => x.id === Number(req.params.itemId))
      .map((x) => x.dataValues.orderProducts)
      .pop()

    await item.destroy()
    res.send(item)
  } catch (error) {
    next(error)
  }
})

//HERE I WANT TO DECREMENT THE QUANTITY OF THE ITEM THAT HAS BEEN ORDERED VIA CHECKOUT
//req.body will be the quantity of all the items that we want to decrement
//req.body should essentially contain the entry from the orderProducts thru table asssociated with that item

//PUT /api/users/:userid
router.put("/:userId/cart/checkout", async (req, res, next) => {
  try {
    const items = await Promise.all(
      req.body.itemQuantities.map((item) => {
        return Product.findByPk(item.productId)
      })
    )

    const updatedItems = await Promise.all(
      items.map((item, i) => {
        const updated = item.update(
          { quantity: item.quantity - req.body.itemQuantities[i].quantity },
          { individualHooks: true }
        )
        return updated
      })
    )

    await Order.update(
      { isCurrentOrder: false },
      { where: { id: req.body.itemQuantities[0].orderId } }
    )
    res.send(updatedItems)
  } catch (error) {
    console.log(error)
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
      include: { model: Product },
    })

    const item = order.products
      .filter((x) => x.id === Number(req.params.itemId))
      .map((x) => x.dataValues.orderProducts)
      .pop()

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
