const db = require('../models/index')
const Comment = db.comments


exports.createComment = (req, res) => {
    const comment = {
      comment_name: req.body.comment_name,
      comment_message: req.body.comment_message,
      post_id: req.body.post_id
    }
    Comment.create(comment)
      .then((data) => {
        res.send(data)
      })
      .catch((err) => {
        res.status(500).send({
          message:
                err.message || 'Some error occured while creating new Comment'
        })
      })
  }
  
  // Retreve all Comment belonging to User from the database
  exports.findAllComment = (req, res) => {
    const post_id = req.params.post_id
    Comment.findAll(
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
          message: 'Error retrieving comment for the user=' + err
        })
      })
  }
  
  // Retrieve single comment from database
  exports.findSingleComment = (req, res) => {
    const comment_id = req.params.comment_id
  
    Comment.findOne({
      where: {
        comment_id
      }
    }).then((data) => {
      console.log(data)
      res.send(
        data
      )
    })
      .catch((err) => {
        res.status(500).send({
          message: err.message + 'Error retrieivng Comment with id=' + comment_id
        })
      })
  }
  
  exports.updateComment = (req, res) => {
    const comment_id = req.params.comment_id
  
    Comment.update(req.body, {
      where: { comment_id }
    }).then((num) => {
      console.log(num)
      if (num == 1) {
        res.send({
          message: 'Comment was updated Successfully'
        })
      } else {
        res.send({
          message: 'Cannot update Comment with id= ' + comment_id + 'Maybe Comment was not found ' +
          'or request body is empty!'
        })
      }
    }).catch((err) => {
      res.status(500).send({
        message: err.message + 'Error updating Comment with id=' + comment_id
      })
    })
  }
  
  exports.deleteComment = (req, res) => {
    const comment_id = req.params.comment_id
  
    Comment.destroy({
      where: {
        comment_id
      }
    }).then((data) => {
      res.send({
        data
      })
    }).catch((err) => {
      res.status(500).send({
        message: err.message + 'Error deleting comment with id=' + comment_id
      })
    })
  }
  