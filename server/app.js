const path = require('path')
const express = require('express')
const morgan = require('morgan')
const jwt = require("jsonwebtoken")
const app = express()
const { User, Order, OrderProducts, Product } = require("./db")
const nodemailer = require("nodemailer");
const emailReminder = require("../script/emailReminder");
const schedule = require('node-schedule');
let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GUSER,
    pass: process.env.GPASS
  }
})
module.exports = app

// logging middleware
app.use(morgan('dev'))

// body parsing middleware
app.use(express.json())

// auth and api routes
app.use('/auth', require('./auth'))

schedule.scheduleJob('0 30 7 * * 4', async () => { //sends every Thursday at 7:30AM local time (secs, mins, hour(24), day, month, dayOfWeek(0=7=Sun))
  const orders = await Order.findAll({ // find all current orders
    where: {
      isCurrentOrder: true
    }
  });
  await orders.map(async (orderObj) => { // for each order we detect a user...
      const userWithOpenOrder = await User.findByPk(orderObj.dataValues.userId);
      const email = userWithOpenOrder.email; //...extract email
      const orderInfo = await OrderProducts.findAll({
        where: {
          orderId: orderObj.dataValues.id
        }
      })
      let iNames = [];
      let iQuant = [];
      let iImgs = [];
      let iPrice = [];
      let iSubT = [];
      const products = await Promise.all(
        orderInfo.map(async (orderObj) => {
          const product = await Product.findByPk(orderObj.dataValues.productId)
          iQuant.push(orderObj.dataValues.quantity)
          return product;
        })
      );
      products.map((item, i) => {
        iNames.push(item.dataValues.name);
        iImgs.push(item.dataValues.imageUrl);
        iPrice.push(item.dataValues.price / 100);
        iSubT.push(iQuant[i] * (item.dataValues.price / 100));//
      })
      let iTotal = iSubT.reduce((prev, curr) => prev + curr, 0);
      let cartUrl = `https://pokebay.onrender.com/users/${userWithOpenOrder.id}/cart`;
      console.log(cartUrl)
      let emailReminderHTML = emailReminder({ iNames, iQuant, iImgs, iPrice, iSubT, iTotal, cartUrl });
      transporter.sendMail({ //message that user
        from: process.env.GUSER,
        to: email,
        subject: `Did you forget to checkout? 😉`,
        html: emailReminderHTML
      })
    }
  )
})

app.get('/confirmation/:token', async (req, res) => {
  try {
    const { id } = await jwt.verify(req.params.token, process.env.JWT)
    await User.update({ confirmed: true }, { where: { id } });
  } catch (e) {
    res.send('error', e);
  }
  return res.redirect('https://pokebay.onrender.com/login')
})

app.get('/reset/:token', async (req, res) => {
  const token = req.params.token;
  try {
    // const { id } = await jwt.verify(req.params.token, process.env.JWT)
    // await User.update({ password: }, { where: { id } });
  } catch (e) {
    res.send('error', e);
  }
  return res.redirect(`https://pokebay.onrender.com/reset/${token}/password`)
})

app.use('/api', require('./api'))

app.get('/', (req, res)=> res.sendFile(path.join(__dirname, '..', 'public/index.html')));

// static file-serving middleware
app.use(express.static(path.join(__dirname, '..', 'public')))

// any remaining requests with an extension (.js, .css, etc.) send 404
app.use((req, res, next) => {
  if (path.extname(req.path).length) {
    const err = new Error('Not found')
    err.status = 404
    next(err)
  } else {
    next()
  }
})

// sends index.html
app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public/index.html'));
})

// error handling endware
app.use((err, req, res, next) => {
  console.error(err)
  console.error(err.stack)
  res.status(err.status || 500).send(err.message || 'Internal server error.')
})
