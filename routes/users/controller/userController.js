const User = require('../model/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { errorHandler } = require('../utils/errorHandler');

const getCurrentUser = async (req, res) => {
    try {
        const { decodedToken } = res.locals;
        const foundUser = await User.findOne({
            email: decodedToken.email,
        }).populate("postHistory", "-postOwner -__v");
        console.log(foundUser)
        res.status(200).json({ message: 'Hello' });
    } catch (error) {
        res.status(500).json({ message: 'Error', error: error.message });
    }
}

const createUser = async (req, res) => {
    try {
        const { firstName, lastName, username, email, password } = req.body;

        let salt = await bcrypt.genSalt(10);
        let hashedPassword = await bcrypt.hash(password, salt);

        let newUser = new User({
            firstName: firstName,
            lastName: lastName,
            username: username,
            email: email,
            password: hashedPassword
        });

        let savedUser = await newUser.save();

        res.status(200).json({ message: 'New user has been saved', payload: savedUser });
    } catch (error) {
        res.status(500).json({ error: errorHandler(error) });
    }
};

const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const foundUser = await User.findOne({  email: email });
        if(foundUser === null) throw { message: 'Email and password do not match' };

        const comparedPassword = await bcrypt.compare(password, foundUser.password);

        if(!comparedPassword) throw { message: 'Email and password do not match' };

        const jwtToken = jwt.sign({
            firstName: foundUser.firstName,
            lastName: foundUser.lastName,
            email: foundUser.email,
            username: foundUser.username,
        }, process.env.SECRET_KEY, { expiresIn: '12h' });
        res.status(200).json({ payload: jwtToken });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const updateProfile = async (req, res) => {
    try {
        const decodedToken = res.locals.decodedToken;

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        req.body.password = hashedPassword;
        const updatedUser = await User.findOneAndUpdate({ email: decodedToken.email }, req.body, { new: true });
        res.status(200).json({ message: 'updated user', payload: updatedUser });
    } catch (error) {
        res.status(500).json({ error: errorHandler(error) });
    }
}

module.exports = {
    getCurrentUser,
    createUser,
    userLogin,
    updateProfile
}