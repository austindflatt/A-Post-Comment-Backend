const { isAlpha, isAlphanumeric, isEmail, isStrongPassword } = require('validator');

function checkIsValid(req, res, next) {
    let errObj = {};
    const { firstName, lastName, username, email, password } = req.body;

    let body = req.body;

    if(!isAlpha(firstName)){
        errObj.firstName = 'First name should only have letters, no special characters or numbers';
    }

    if(!isAlpha(lastName)){
        errObj.lastName = 'Last name should only have letters, no special characters or numbers';
    }

    if(!isAlphanumeric(username)){
        errObj.username = 'Username should only contain letters or numbers, no special characters or spaces';
    }

    if(!isEmail(email)){
        errObj.email = 'Please enter a valid email';
    }

    if(!isStrongPassword(password)){
        errObj.password = 'Please enter a strong password';
    }

    let checkedObj = Object.keys(errObj); // creates an array of the object keys

    if(checkedObj.length > 0){
        return res.status(500).json({ message: 'There was an error', error: errObj })
    } else {
        next();
    }
};

module.exports = {
    checkIsValid,
}