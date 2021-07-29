module.exports = (app) => {
    const comment = require('../controller/comment.controller')
    const router = require('express').Router()
  
    // Create a new Comment for Users
    router.post('/', comment.createComment)
  
    // Retrieve the all comment of one User
    router.get('/:post_id', comment.findAllComment)
  
    // Retrieve one comment for one user
    router.get('/usercomment/:comment_id', comment.findSingleComment)
  
    // Update Comment
    router.put('/:comment_id', comment.updateComment)
  
    // Delete Comment
    router.delete('/:comment_id', comment.deleteComment)
  
    app.use('/apis/comment', router)
  }
  