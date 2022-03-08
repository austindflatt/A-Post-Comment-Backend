const Comment = require('../model/Comments');
const Posts = require('../../posts/model/Posts');
const User = require('../../users/model/User');
const { errorHandler } = require('../../users/utils/errorHandler');

const createComment = async (req, res) => {
    try {
		const { comment } = req.body;
		const { postId } = req.params;

        const decodedData = res.locals.decodedToken;
        console.log(decodedData)

        const foundUser = await User.findOne({ email: decodedData.email });

        const newComment = new Comment({
            comment: comment,
            post: postId,
            owner: foundUser._id
        })

        const savedComment = await newComment.save();

        foundUser.commentHistory.push(savedComment.id);
        await foundUser.save();

        res.status(200).json({  message: "Comment was posted", payload: savedComment });
    } catch (error) {
        res.status(500).json(errorHandler(error))
    }
}

const getComments = async (req, res) => {
    try {
		const getAllComments = await Comment.find({});
		res.json(getAllComments);
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