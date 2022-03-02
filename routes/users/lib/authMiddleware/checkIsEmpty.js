const { isEmpty } = require('validator');

function checkIsEmpty(req, res, next) {
    let errObj = {};
    let body = req.body;
    for(let key in body){
        if(isEmpty(body[key])){
            errObj[key] = `${key} cannot be empty`;
        }
    }
    let checkedObj = Object.keys(errObj);
    if(checkedObj.length > 0){
        return res.status(500).json({ message: 'Error', error: errObj });
    } else {
        next();
    }
};

module.exports = {
    checkIsEmpty
}