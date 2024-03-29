const router = require("express").Router()
const { User } = require("../db")
const bcrypt = require("bcrypt")
const nodemailer = require("nodemailer");
const emailVerify = require("../../script/emailVerify");
const emailReset = require("../../script/emailReset");
const emailAccChanged = require("../../script/emailAccChanged");
module.exports = router

let transporter = nodemailer.createTransport({
  service: 'gmail',
  port: 465,
  secure: true,
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
    req.body.confirmed = true; // change to false if want user to confirm
    const user = await User.create(req.body)
    const token = await user.generateToken();
    // const url = `http://localhost:8080/confirmation/${token}`;
    // const url = `https://grace-pokebay.herokuapp.com/confirmation/${token}`;
    // let emailVerifyHTML = emailVerify(url);
    // transporter.sendMail({
    //   from: process.env.GUSER,
    //   to: user.email,
    //   subject: `Verify your email for PokEbay, ${user.username}!`,
    //   html: emailVerifyHTML,
    // })
    // if (!user.confirmed) {
    //   const error = Error("Success!")
    //   error.status = 401
    //   throw error
    // }
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
    // const url = `http://localhost:8080/reset/${token}`;
    const url = `https://pokebay.onrender.com/reset/${token}`;
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

router.post('/reset/:token/password', async (req, res, next) => {
  const { email, newPass, confirmPass } = req.body;
  try {
    const user = await User.findOne({ where: { email: email } });
    if (!user) {
      throw Error("User with email does not exist! Try again or sign-up.")
    }
    if (newPass !== confirmPass) {
      throw Error("Passwords must match!")
    }
    user.password = await bcrypt.hash(newPass, 5)

    await User.update({ password: user.password }, { where: { email } });
    let emailAccChangedHTML = emailAccChanged();
    transporter.sendMail({
      from: process.env.GUSER,
      to: email,
      subject: `Your account information has been updated, ${user.username}!`,
      html: emailAccChangedHTML
    })
    res.send(user)
  } catch (e) {
    next(e)
  }
})

router.get("/me", async (req, res, next) => {
  try {
    res.send(await User.findByToken(req.headers.authorization))
  } catch (ex) {
    next(ex)
  }
})
