module.exports = (app) => {
    const ratings = require('../controller/ratings.controller')
    const router = require('express').Router()
  
    // Create a new Ratings for Users
    router.post('/', ratings.createRatings)
  
    // Retrieve the all ratings of one User
    router.get('/:user_id', ratings.findAllRatings)
  
    // Retrieve one rating for one user
    router.get('/userratings/:rating_id', ratings.findSingleRatings)
  
    // Update Ratings
    router.put('/:rating_id', ratings.updateRatings)
  
    // Delete Ratings
    router.delete('/:rating_id', ratings.deleteRating)
  
    app.use('/apis/ratings', router)
  }
  