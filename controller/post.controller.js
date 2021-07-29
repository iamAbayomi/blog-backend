const db = require('../models/index')
const Posts = db.post


exports.createPost = (req, res) => {
    const post = {
      post_title: req.body.post_title,
      post_description: req.body.post_description,
      user_id: req.body.user_id
    }
    Post.create(post)
      .then((data) => {
        res.send(data)
      })
      .catch((err) => {
        res.status(500).send({
          message:
                err.message || 'Some error occured while creating new Post'
        })
      })
  }
  
  // Retreve all Post belonging to User from the database
  exports.findAllPost = (req, res) => {
    const user_id = req.params.user_id
    Post.findAll(
      {
        where: {
          user_id
        }
      }
    )
      .then((data) => {
        res.send(data)
      }).catch((err) => {
        res.status(500).send({
          message: 'Error retrieving post for the user=' + err
        })
      })
  }
  
  // Retrieve single post from database
  exports.findSinglePost = (req, res) => {
    const post_id = req.params.post_id
  
    Post.findOne({
      where: {
        post_id
      }
    }).then((data) => {
      console.log(data)
      res.send(
        data
      )
    })
      .catch((err) => {
        res.status(500).send({
          message: err.message + 'Error retrieivng Post with id=' + post_id
        })
      })
  }
  
  exports.updatePost = (req, res) => {
    const post_id = req.params.post_id
  
    Post.update(req.body, {
      where: { post_id }
    }).then((num) => {
      console.log(num)
      if (num == 1) {
        res.send({
          message: 'Post was updated Successfully'
        })
      } else {
        res.send({
          message: 'Cannot update Post with id= ' + post_id + 'Maybe Post was not found ' +
          'or request body is empty!'
        })
      }
    }).catch((err) => {
      res.status(500).send({
        message: err.message + 'Error updating Post with id=' + post_id
      })
    })
  }
  
  exports.deletePost = (req, res) => {
    const post_id = req.params.post_id
  
    Post.destroy({
      where: {
        post_id
      }
    }).then((data) => {
      res.send({
        data
      })
    }).catch((err) => {
      res.status(500).send({
        message: err.message + 'Error deleting post with id=' + post_id
      })
    })
  }
  