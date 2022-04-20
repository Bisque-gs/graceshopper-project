const router = require("express").Router();
const { User, Order, OrderProducts, Product } = require("../db");
module.exports = router;

router.get("/", async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and username fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ["id", "username"],
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    res.send(user);
  } catch (err) {
    next(err);
  }
});


//First we Grab all the orders associated with that user 
//Next we fitler all the orders and grab the 'current order', the one with a status of True 
//Then we grab all the entries in our through table that share the same OrderId
//Then we map over this array and we grab all the items from our item model and save that in an item array
//send all info to front end 

router.get("/:id/orders", async (req, res, next) => {
  try {
    const userAllOrders = await Order.findAll({ where: { userId: req.params.id } });
    const currentOrder = userAllOrders.filter((order) => { return order.dataValues.isCurrentOrder })
    const itemQuantities = await OrderProducts.findAll({ where: { orderId: currentOrder[0].id } });
    const cartItems = await Promise.all(itemQuantities.map((item) => {  
        return Product.findByPk(item.dataValues.productId)
    }) )
    res.send({ userAllOrders, currentOrder, itemQuantities, cartItems });
  } catch (err) {
    next(err);
  }
});
