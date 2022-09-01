const path = require('path')
const express = require('express')
const morgan = require('morgan')
const jwt = require("jsonwebtoken")
const app = express()
const { User, Order, OrderProducts, Product } = require("./db")
const nodemailer = require("nodemailer");
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

const brushTeethReminder = schedule.scheduleJob('0 10 9 * * *', () => { //sends every day at 9:10AM local time (secs, mins, hour(24), day, month, dayOfWeek(0=7=Sun))
  transporter.sendMail({
    from: process.env.GUSER,
    to: 'andstatik@gmail.com',
    subject: `Daily reminder to brush your teeth!`,
    html: "Hey you! Brush your teeth! I will come back tomorrow to check-in on you again, you little punk!"
  })
})

app.get('/confirmation/:token', async (req, res) => {
  try {
    const { id } = await jwt.verify(req.params.token, process.env.JWT)
    await User.update({ confirmed: true }, { where: { id } });
  } catch (e) {
    res.send('error', e);
  }
  return res.redirect('https://grace-pokebay.herokuapp.com/login')
})

app.get('/reset/:token', async (req, res) => {
  const token = req.params.token;
  try {
    // const { id } = await jwt.verify(req.params.token, process.env.JWT)
    // await User.update({ password: }, { where: { id } });
  } catch (e) {
    res.send('error', e);
  }
  return res.redirect(`https://grace-pokebay.herokuapp.com/reset/${token}/password`)
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
