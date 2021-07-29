module.exports = (app) => {
    const user = require('../controller/user.controller')
    const router = require('express').Router()
    const auth = require('../auth/index')
    // Create a new User
    router.post('/', user.createUser)
  
    // Create a new User with Google
    router.post('/googlesignin', user.createUserWithGoogle)
  
    // Create a new User with Google
    router.post('/googletoken/:token', user.sendAccessToken)
  
    // Sign in User locally
    router.post('/login', user.login)
  
    // Retrieve Specific User
    router.get('/:id', user.findUser)
  
    // Get Authenticated User
    router.get('/data/userdata', user.getAuthenticatedUser)
  
    // Get all Users
    router.get('/', auth.isAuthenticated, user.findAllUsers)
  
    // Update User
    router.put('/:id', user.updateUser)
  
    app.use('/apis/user', router)
  }
  