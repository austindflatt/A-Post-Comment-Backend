var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/create-comment',);

// Get all comments from user
router.get('/get-comments/',);

// Update comment
router.delete('/delete-comment/:id',);

// Delete a comment
router.delete('/delete-comment/:id',);

module.exports = router;