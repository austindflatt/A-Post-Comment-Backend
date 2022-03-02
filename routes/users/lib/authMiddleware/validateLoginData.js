const { isEmail } = require('validator');

function validateLogin (req, res, next) {
    const { email } = req.body;

    let errObj = {};

    if(!isEmail(email)){
        errObj.email = 'Please enter a valid email';
    }
    let checkObj = Object.keys(errObj);
    if(checkObj.length > 0){
        return res.status(500).json({ message: 'There was an error', error: errObj})
    } else {
        next();
    }
}

module.exports = {
    validateLogin
}