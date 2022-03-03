const Posts = require('../model/Posts');
const User = require('../../users/model/User');
const { errorHandler } = require('../../users/utils/errorHandler');

const createPost = async (req, res) => {
    try {
        const { title, post } = req.body;

        const decodedData = res.locals.decodedToken;
        console.log(decodedData)

        const foundUser = await User.findOne({ email: decodedData.email });
        if(!foundUser) throw { message: 'User not found' };
        console.log(foundUser)

        const newPost = new Posts({
            title: title,
            post: post,
            owner: foundUser._id
        })

        const savedPost = await newPost.save();

        foundUser.postHistory.push(savedPost.id);

        await foundUser.save();

        console.log(newPost);
        res.status(200).json({  message: "Added new post", payload: savedPost });
    } catch (error) {
        res.status(500).json(errorHandler(error))
    }
}

const getPosts = async (req, res) => {
    try {
        const decodedData = res.locals.decodedToken;
        const foundUser = await User.findOne({ email: decodedData.email })
        if(!foundUser) throw { message: 'User not found' };
        const foundPosts = await Posts.find({ owner: foundUser.id })
        res.status(200).json({ payload: foundPosts });
    } catch (error) {
        res.status(500).json({ message: 'Error', error: error.message });
    }
}

const updatePost = async (req, res) => {
	try {
	  const { id } = req.params;
	  
	  const updatedPost = await Posts.findByIdAndUpdate(id, req.body, { new: true, });
	  console.log(id)

	  res.status(200).json({ message: "Post has been updated successfully", payload: updatedPost });
	} catch (error) {
		res.status(500).json({ message: "Error", error: errorHandler(error) });
	}
};

const deletePost = async (req, res) => {
    try {
        const { id } = req.params;

        const decodedData = res.locals.decodedToken;
        const foundUser = await User.findOne({ email: decodedData.email })
        if(!foundUser) throw { message: 'User not found' };

		const foundPost = await Posts.findByIdAndDelete(id);
		if(!foundPost) throw { message: 'Post was not found' };

        const filteredArray = foundUser.postHistory.filter((element) => element.toString() !== id);
        foundUser.postHistory = filteredArray;
        await foundUser.save();

        res.status(200).json({ message: 'Post was successfully deleted', foundPost });
    } catch (error) {
        res.status(500).json({ message: 'Error', error: error.message });
    }
}

module.exports = {
	createPost,
	getPosts,
	deletePost,
	updatePost,
}