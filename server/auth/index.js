const router = require("express").Router()
const { User } = require("../db")
const nodemailer = require("nodemailer");
module.exports = router

router.post("/login", async (req, res, next) => {
  try {
    res.send({ token: await User.authenticate(req.body) })
  } catch (err) {
    next(err)
  }
})

router.post("/signup", async (req, res, next) => {
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GUSER,
      pass: process.env.GPASS
    }
  })
  try {
    // prevent users from creating Admin accounts
    req.body.isAdmin = false
    const user = await User.create(req.body)
    const token = await user.generateToken();
    const url = `http://localhost:8080/confirmation/${token}`;
    // const url = `https://grace-pokebay.herokuapp.com/confirmation/${token}`;
    transporter.sendMail({
      from: process.env.GUSER,
      to: user.email,
      subject: 'Confirm Email',
      html: `Please click this email to confirm your email: <a href="${url}">${url}</a>`,
    })
    res.send({ token: token })
  } catch (err) {
    if (err.name === "SequelizeUniqueConstraintError") {
      res.status(401).send("User already exists")
    } else {
      next(err)
    }
  }
})

router.get("/me", async (req, res, next) => {
  try {
    res.send(await User.findByToken(req.headers.authorization))
  } catch (ex) {
    next(ex)
  }
})
