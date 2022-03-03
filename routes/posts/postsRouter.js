var express = require('express');
var router = express.Router();
const { jwtMiddleware } = require('../users/lib/authMiddleware/index');
const { createPost, getPosts } = require('./controller/postsController');

router.get('/', function(req, res, next) {
  res.send('hello from the posts route');
});

router.post('/create-post', jwtMiddleware, createPost);

// Get all posts from the current user
router.get('/get-all-posts/', jwtMiddleware, getPosts);

// Update a post
router.delete('/update-post/:id',);

// Delete a post
router.delete('/delete-post/:id',);

module.exports = router;