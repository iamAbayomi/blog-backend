/* eslint-disable object-shorthand */
/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable import/order */
/* eslint-disable eqeqeq */
/* eslint-disable no-console */
const db = require('../models')
const User = db.user
const { body, validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const auth = require('../auth/index')
const serverResponse = require('../utilities/response')

// method for creating tokens
// Create and Save a new User
exports.createUser = [([
  body('fullname').isLength({ min: 1 }),
  body('fullname').custom((value) => {
    return User.findAll({
      where: {
        fullname: value
      }
    }).then((data) => {
      console.log('The data from the db ' + data)
      if (data != 0) {
        // res.json({ message: 'Hello I am here ' + data })
        return Promise.reject(value + ' has been taken. Please use another one')
      }
    })
  }),
  body('password').isLength({ min: 1 }),
  body('email').isEmail(),
  body('email').custom((value) => {
    return User.findAll({
      where: {
        email: value
      }
    }).then((data) => {
      console.log('The data from the db ' + data)
      if (data != 0) {
        // res.json({ message: 'Hello I am here ' + data })
        return Promise.reject('This email has been registered. Please use another one')
      }
    })
  }),
  body('provider').isLength({ min: 1 })
]),

(req, res) => {
  const errors = validationResult(req)
  console.log(errors)
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.mapped() })
  }
  // Create a User
  const user = {
    fullname: req.body.fullname,
    firstname: req.body.firstname,
    surname: req.body.surname,
    password: req.body.password,
    provider: req.body.provider,
    email: req.body.email,
    isAdmin: req.body.isAdmin
  }

  console.log(user)
  // Encrypt Password
  const salt = bcrypt.genSaltSync(10)
  const hash = bcrypt.hashSync(user.password, salt)
  user.password = hash

  // Save the user in the database
  User.create(user)
    .then((data) => {
      console.log(data.user_id)
      res.json({
        message: 'success',
        user_id: data.user_id
      })
    })
    .catch((err) => {
      serverResponse.sendError(res, err, 'user')
    })
}
]

exports.createUserWithGoogle = (req, res) => {
  const mutatedfullname = req.body.given_name + ' ' + req.body.family_name
  const user = {
    // user_id: req.body.sub,
    fullname: mutatedfullname,
    firstname: req.body.given_name,
    surname: req.body.family_name,
    password: req.body.password,
    provider: req.body.provider,
    email: req.body.email
  }
  User.findOne({
    where: {
      email: req.body.email
    }
  }).then((data) => {
    if (data === 0) {
      console.log(data)
      // Save the user in the database
      User.create(user)
        .then((data) => {
          // console.log(data.user_id)
          // const token = jwt.sign({ id: data.user_id, fullname: data.fullname, email: data.email }, auth.config.authSecret)
          const token = auth.signToken(data, 'author', auth.config.authSecret)
          res.send({
            data,
            token: token
          })
        })
        .catch((err) => {
          serverResponse.sendError(res, err, 'Error Creating User')
        })
    } else {
      console.log(data)
      // const token = jwt.sign({ id: data.user_id, fullname: data.fullname, email: data.email }, auth.config.authSecret)
      const token = auth.signToken(data, 'author', auth.config.authSecret)
      console.log('token' + token)
      res.send({
        data,
        token: token
      })
    }
  }).catch((err) => {
    console.log('error is in finding user' + '\n' + err)
    User.create(user)
      .then((data) => {
        // console.log(data.user_id)
        // const token = jwt.sign({ id: data.user_id, fullname: data.fullname, email: data.email }, auth.config.authSecret)
        const token = auth.signToken(data, 'author', auth.config.authSecret)
        res.send({
          data,
          token: token
        })
      })
      .catch((err) => {
        serverResponse.sendError(res, err, 'Error Creating User')
      })
  })
}

// Login Module
exports.login = [(
  // Validation
  body('email').isEmail(),
  body('password').isLength({ min: 1 })
),
// Login Middleware
(req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.mapped() })
  }
  // const email = res.
  // Find specific user
  User.findOne({
    where: {
      email: req.body.email
    }
  }).then((data) => {
    // console.log(req.body.password)
    console.log(data)
    // res.send(data)
    bcrypt.compare(req.body.password, data.password)
      .then((response) => {
        console.log(response)
        // Compare password and send token
        if (response == true) {
          // const token = jwt.sign({ id: data.user_id, fullname: data.fullname, email: data.email }, auth.config.authSecret)
          const token = auth.signToken(data, 'author', auth.config.authSecret)
          res.send({
            data,
            token
          })
        } else {
          res.status(500).json({
            message: 'Invalid Email or Password entered.'
          })
        }
      }).catch((err) => {
        res.status(500).json({
          message: 'Invalid Email or Password entered.' + err
        })
      })
  }).catch((err) => {
    console.log(err)
    console.log(err.message)
    res.status(500).send({
      // message: err.message + 'Error retrieving email=' + req.body.email
      message: 'Email does not exist. Please register'
    })
  })
}]

exports.getAuthenticatedUser = (req, res) => {
  const token = req.headers.authorization
  if (token) {
    // verifies secret and checks if the token is expired
    jwt.verify(token.replace(/^Bearer\s/, ''), auth.config.authSecret, function (err, decoded) {
      if (err) {
        return res.status(401).json({ message: 'unauthorized' })
      } else {
        console.log('User Decoded')
        console.log(decoded)
        return res.json({ user: decoded })
      }
    })
  } else {
    return res.status(401).json({ message: 'unauthorized' })
  }
}

// Find all Users Projects
exports.findUserProjects = (req, res) => {
  const userId = req.params.id
  User.findByPk(userId, { include: ['project'] })
    .then((data) => {
      res.send(data)
    }).catch((err) => {
      res.status(500).send({
        message: 'Error retrieving user projects ' + err
      })
    })
}

exports.sendAccessToken = (req, res) => {

}

// Find a single User with id
exports.findUser = (req, res) => {
  const id = req.params.id

  User.findByPk(id)
    .then((data) => {
      res.send(data)
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message + 'Error retrieving User with id=' + id
      })
    })
}

// Update User with id
exports.updateUser = (req, res) => {
  const id = req.params.id

  User.update(req.body, {
    where: { user_id: id }
  })
    .then((num) => {
      console.log(num)
      if (num == 1) {
        res.send({
          message: 'User was updated Successfully'
        })
      } else {
        res.send({
          message: 'Cannot update user with id= ' + id + 'Maybe user was not found ' +
          'or request body is empty!'
        })
      }
    }).catch((err) => {
      res.status(500).send({
        message: err.message + 'Error updating Tutorial with id=' + id
      })
    })
}
// Delete User with the specified id in the request
exports.deleteUser = (req, res) => {
  const id = req.params.id

  User.destroy({
    where: { user_id: id }
  })
    .then((num) => {
      if (num === 1) {
        res.send({
          message: 'User was deleted successfully'
        })
      } else {
        res.send({
          message: 'Cannot delete Tutorial'
        })
      }
    }).catch((err) => {
      res.status(500).send({
        message: err.message + 'Error deleting Tutorial with id=' + id
      })
    })
}
// Retreve all User from the database
exports.findAllUsers = (req, res) => {
  User.findAll()
    .then((data) => {
      res.send(data)
    }).catch((err) => {
      res.status(500).send({
        message: 'Error retrieving Tutorial with id=' + err
      })
    })
}
