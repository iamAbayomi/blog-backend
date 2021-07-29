module.exports = (app) => {
    const ratings = require('../controller/rating.controller')
    const router = require('express').Router()
  
    // Create a new Ratings for Users
    router.post('/', ratings.createRating)
  
    // Retrieve the all ratings of one User
    router.get('/:post_id', ratings.findAllRating)
  
    // Retrieve one rating for one user
    router.get('/userratings/:rating_id', ratings.findSingleRating)
  
    // Update Ratings
    router.put('/:rating_id', ratings.updateRating)
  
    // Delete Ratings
    router.delete('/:rating_id', ratings.deleteRating)
  
    app.use('/apis/ratings', router)
  }
  