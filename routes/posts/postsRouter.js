var express = require('express');
var router = express.Router();
const { jwtMiddleware, checkIsEmpty } = require('../users/lib/authMiddleware/index');
const { createPost, getPosts, deletePost, updatePost } = require('./controller/postsController');

router.get('/', function(req, res, next) {
  res.send('hello from the posts route');
});

router.post('/create-post', jwtMiddleware, checkIsEmpty ,createPost);

// Get all posts from the current user
router.get('/get-all-posts/', jwtMiddleware, getPosts);

// Delete a post
router.delete('/delete-post/:id', jwtMiddleware, deletePost);

// Update a post
router.put('/update-post/:id', jwtMiddleware, checkIsEmpty, updatePost);

module.exports = router;