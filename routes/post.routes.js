module.exports = (app) => {
    const post = require('../controller/post.controller')
    const router = require('express').Router()
  
    // Create a new Post for Users
    router.post('/', post.createPost)
  
    // Retrieve the all post of one User
    router.get('/:user_id', post.findAllPost)
  
    // Retrieve one note for one user
    router.get('/userpost/:note_id', post.findSinglePost)
  
    // Update Post
    router.put('/:note_id', post.updatePost)
  
    // Delete Post
    router.delete('/:note_id', post.deletePost)
  
    app.use('/apis/post', router)
  }
  