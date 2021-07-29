module.exports = (app) => {
    const comment = require('../controller/comment.controller')
    const router = require('express').Router()
  
    // Create a new Comment for Users
    router.post('/', comment.createComment)
  
    // Retrieve the all comment of one User
    router.get('/:user_id', comment.findAllComment)
  
    // Retrieve one note for one user
    router.get('/usercomment/:note_id', comment.findSingleComment)
  
    // Update Comment
    router.put('/:note_id', comment.updateComment)
  
    // Delete Comment
    router.delete('/:note_id', comment.deleteComment)
  
    app.use('/apis/comment', router)
  }
  