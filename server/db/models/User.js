const Sequelize = require("sequelize")
const db = require("../db")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const nodemailer = require("nodemailer");
// const axios = require("axios");

const SALT_ROUNDS = 5

const User = db.define("user", {
  username: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  password: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: true,
    },
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      isEmail: true,
      notEmpty: true,
    },
  },
  isAdmin: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  confirmed: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
})

module.exports = User

/**
 * instanceMethods
 */
User.prototype.correctPassword = function (candidatePwd) {
  //we need to compare the plain version to an encrypted version of the password
  return bcrypt.compare(candidatePwd, this.password)
}

User.prototype.generateToken = async function (username) {
  const user = await User.findOne({ where: { username } })

  if (user.confirmed) return jwt.sign({ id: this.id }, process.env.JWT);
  return jwt.sign(
    {
      user: _.pick(user, 'id')
    },
    user.email,
    {
      expiresIn: '1d'
    },
    (err, emailToken) => {
      // const url = `https://grace-pokebay.herokuapp.com/confirmation/${emailToken}`;
      const url = `http://localhost:8080/confirmation/${emailToken}`;
      transporter.sendMail({
        to: user.email,
        subject: 'Confirm your email for PokeBay!',
        html: `Please click the link to confirm your email and start using pokeBay! <a href="${url}">${url}</a>`
      });
    }
  )
}

/**
 * classMethods
 */
User.authenticate = async function ({ username, password }) {
  const user = await this.findOne({ where: { username } })
  if (!user || !(await user.correctPassword(password))) {
    const error = Error("Incorrect username/password")
    error.status = 401
    throw error
  }
  if (!user.confirmed) {
    const error = Error("Please confirm your email")
    error.status = 401
    throw error
  }
  return user.generateToken(username)
}

User.findByToken = async function (token) {
  try {
    const { id } = await jwt.verify(token, process.env.JWT)
    const user = User.findByPk(id)
    if (!user) {
      throw "nooo"
    }
    return user
  } catch (ex) {
    const error = Error("bad token")
    error.status = 401
    throw error
  }
}

/**
 * hooks
 */
const hashPassword = async (user) => {
  //in case the password has been changed, we want to encrypt it with bcrypt
  if (user.changed("password")) {
    user.password = await bcrypt.hash(user.password, SALT_ROUNDS)
  }
}

User.beforeCreate(hashPassword)
User.beforeUpdate(hashPassword)
User.beforeValidate((user) => {
  if (user.username === "") {
    throw new Error("Name is a required field")
  }
  if (user.email === "") {
    throw new Error("Email is a required field")
  }
  if (user.password === "") {
    throw new Error("Password is a required field")
  }
})
User.beforeBulkCreate((users) => Promise.all(users.map(hashPassword)))
