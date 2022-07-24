const router = require("express").Router()
const { Product, User } = require("../db")
const { Op } = require("sequelize")
module.exports = router

// These routes are only accessible to an admin

// GET /api/protected/users/:userid/users/search
// search
router.get("/users/:userid/users/search", async (req, res, next) => {
  try {
    //ADMIN AUTHORIZATION (NOT NECESSARY! We should already be protected via token)
    const users = await User.findAll({
      where: {
        username: { [Op.substring]: req.headers.search },
      },
      attributes: ["id", "username", "email"],
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

//GET /api/protected/users/:userid/users
router.get("/users/:userid/users", async (req, res, next) => {
  try {
    //ADMIN AUTHORIZATION (NECESSARY? We should be protecting via token)
    const findOutIfAdmin = await User.findOne({
      where: {
        id: req.params.userid,
      },
      // explicitly select only the isAdmin field
      attributes: ["isAdmin"],
    })

    if (findOutIfAdmin.dataValues.isAdmin) {
      const users = await User.findAll({
        attributes: ["id", "username", "email"],
      })
      res.json(users)
    } else {
      throw new Error("HEY YOU ARE NOT AN ADMIN NICE TRY POSTMAN MUAHHAHA")
    }
  } catch (err) {
    next(err)
  }
})

//GET /api/users
// router.get("/users/", async (req, res, next) => {
//   try {

//     const users = await User.findAll({
//       // explicitly select only the id and username fields - even though
//       // users' passwords are encrypted, it won't help if we just
//       // send everything to anyone who asks!
//       attributes: ["id", "username", "email"],
//     })
//     res.json(users)
//   } catch (err) {
//     next(err)
//   }
// })

// create a new product
router.post("/products/", async (req, res, next) => {
  try {
    res.status(201).json(await Product.create(req.body))
  } catch (error) {
    next(error)
  }
})

// delete a product
router.delete("/products/:id", async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id)
    await product.destroy()
    res.json(product)
  } catch (error) {
    next(error)
  }
})

// edit a product
router.put("/products/:id", async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id)
    res.json(await product.update(req.body))
  } catch (error) {
    next(error)
  }
})
