const Comment = require('../model/Comments');
const Posts = require('../../posts/model/Posts');
const User = require('../../users/model/User');
const { errorHandler } = require('../../users/utils/errorHandler');

const createComment = async (req, res) => {
    try {
    } catch (error) {
        res.status(500).json(errorHandler(error))
    }
}

const getComments = async (req, res) => {
    try {
        
    } catch (error) {
        res.status(500).json({ message: 'Error', error: error.message });
    }
};

const updateComment = async (req, res) => {
    try {
    } catch (error) {
      res.status(500).json({ message: error, error: errorHandler(error) });
    }
};

const deleteComment = async (req, res) => {
    try {
    } catch (error) {
      res.status(500).json({ message: "error", error: error });
    }
};

module.exports = {
	createComment,
	getComments,
	updateComment,
	deleteComment,
}