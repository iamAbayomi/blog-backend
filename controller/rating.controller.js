const db = require('../models/index')
const Ratings = db.ratings


exports.createRating = (req, res) => {
    const rating = {
      rating_value: req.body.rating_value,
      post_id: req.body.post_id
    }
    Rating.create(rating)
      .then((data) => {
        res.send(data)
      })
      .catch((err) => {
        res.status(500).send({
          message:
                err.message || 'Some error occured while creating new Rating'
        })
      })
  }
  
  // Retreve all Rating belonging to User from the database
  exports.findAllRating = (req, res) => {
    const post_id = req.params.post_id
    Rating.findAll(
      {
        where: {
            post_id
        }
      }
    )
      .then((data) => {
        res.send(data)
      }).catch((err) => {
        res.status(500).send({
          message: 'Error retrieving rating for the user=' + err
        })
      })
  }
  
  // Retrieve single rating from database
  exports.findSingleRating = (req, res) => {
    const rating_id = req.params.rating_id
  
    Rating.findOne({
      where: {
        rating_id
      }
    }).then((data) => {
      console.log(data)
      res.send(
        data
      )
    })
      .catch((err) => {
        res.status(500).send({
          message: err.message + 'Error retrieivng Rating with id=' + rating_id
        })
      })
  }
  
  exports.updateRating = (req, res) => {
    const rating_id = req.params.rating_id
  
    Rating.update(req.body, {
      where: { rating_id }
    }).then((num) => {
      console.log(num)
      if (num == 1) {
        res.send({
          message: 'Rating was updated Successfully'
        })
      } else {
        res.send({
          message: 'Cannot update Rating with id= ' + rating_id + 'Maybe Rating was not found ' +
          'or request body is empty!'
        })
      }
    }).catch((err) => {
      res.status(500).send({
        message: err.message + 'Error updating Rating with id=' + rating_id
      })
    })
  }
  
  exports.deleteRating = (req, res) => {
    const rating_id = req.params.rating_id
  
    Rating.destroy({
      where: {
        rating_id
      }
    }).then((data) => {
      res.send({
        data
      })
    }).catch((err) => {
      res.status(500).send({
        message: err.message + 'Error deleting rating with id=' + rating_id
      })
    })
  }
  