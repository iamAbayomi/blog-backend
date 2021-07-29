module.exports = (app) => {
    const post = require('../controller/post.controller')
    const router = require('express').Router()
  
    // Create a new Post for Users
    router.post('/', post.createPost)
  
    // Retrieve the all post of one User
    router.get('/:user_id', post.findAllPost)
  
    // Retrieve one post for one user
    router.get('/userpost/:post_id', post.findSinglePost)
  
    // Update Post
    router.put('/:post_id', post.updatePost)
  
    // Delete Post
    router.delete('/:post_id', post.deletePost)
  
    app.use('/apis/post', router)
  }
  