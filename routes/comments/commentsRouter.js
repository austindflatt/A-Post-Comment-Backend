var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.send('Hello from the comments route');
});

// Create a comment
router.post('/create-comment',);

// Get all commemts from a user
router.get('/get-all-comments/',);

// Delete a comment
router.delete('/delete-comment/:id',);

// Update a comment
router.put('/update-comment/:id',);

module.exports = router;