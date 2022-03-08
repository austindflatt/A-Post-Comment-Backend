var express = require('express');
var router = express.Router();
const { jwtMiddleware, checkIsEmpty } = require('../users/lib/authMiddleware/index');
const { createComment, getComments, deleteComment, updateComment } = require('./controller/commentsController');

router.get('/', function(req, res, next) {
  res.send('Hello from the comments route');
});

// Create a comment
router.post('/create-comment/:postId', jwtMiddleware, checkIsEmpty, createComment);

// Get all commemts from a user
router.get('/get-all-comments/', jwtMiddleware, getComments);

// Delete a comment
router.delete('/delete-comment/:id', jwtMiddleware, deleteComment);

// Update a comment
router.put('/update-comment/:id', jwtMiddleware, checkIsEmpty, updateComment);

module.exports = router;