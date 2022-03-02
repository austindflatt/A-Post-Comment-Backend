var express = require('express');
const { createUser, userLogin, updateProfile } = require('./controller/userController');
const {
    checkIsEmpty,
    jwtMiddleware,
    checkIsValid,
    validateLogin,
    validateUpdateData
} = require('./lib/authMiddleware/index');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('hello from the users route');
});

// Create a user
router.post('/create-user', checkIsEmpty, checkIsValid, createUser);

// Login
router.post('/login', checkIsEmpty, validateLogin, userLogin);

// Update Profile
router.put('/update-profile', jwtMiddleware, checkIsEmpty, validateUpdateData, updateProfile);

module.exports = router;