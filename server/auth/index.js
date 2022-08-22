const router = require("express").Router()
const { User } = require("../db")
const nodemailer = require("nodemailer");
const emailVerify = require("../../script/emailVerify");
const emailReset = require("../../script/emailReset");
module.exports = router

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GUSER,
    pass: process.env.GPASS
  }
})

router.post("/login", async (req, res, next) => {
  try {
    res.send({ token: await User.authenticate(req.body) })
  } catch (err) {
    next(err)
  }
})

router.post("/signup", async (req, res, next) => {
  try {
    // prevent users from creating Admin accounts
    req.body.isAdmin = false
    req.body.confirmed = false
    const user = await User.create(req.body)
    const token = await user.generateToken();
    const url = `http://localhost:8080/confirmation/${token}`;
    // const url = `https://grace-pokebay.herokuapp.com/confirmation/${token}`;
    let emailVerifyHTML = emailVerify(url);
    transporter.sendMail({
      from: process.env.GUSER,
      to: user.email,
      subject: `Verify your email for PokEbay, ${user.username}!`,
      html: emailVerifyHTML,
    })
    if (!user.confirmed) {
      const error = Error("Success! Please check your email for confirmation! If you don't see it, make sure to check your spam folder!")
      error.status = 401
      throw error
    }
    res.send({ token: token })
  } catch (err) {
    if (err.name === "SequelizeUniqueConstraintError") {
      res.status(401).send("User already exists")
    } else {
      next(err)
    }
  }
})

router.post("/reset", async (req, res, next) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ where: { email: email } });
    if (!user) {
      throw Error("User with email does not exist! Try again or sign-up.")
    }

    const token = await user.generateToken();
    const url = `http://localhost:8080/reset/${token}`;
    // const url = `https://grace-pokebay.herokuapp.com/confirmation/${token}`;
    let emailResetHTML = emailReset(url);
    transporter.sendMail({
      from: process.env.GUSER,
      to: email,
      subject: `Please reset your password, ${user.username}!`,
      html: emailResetHTML
    })
    res.send(user)
  } catch (err) {
    next(err)
  }
})

router.get("/me", async (req, res, next) => {
  try {
    res.send(await User.findByToken(req.headers.authorization))
  } catch (ex) {
    next(ex)
  }
})
