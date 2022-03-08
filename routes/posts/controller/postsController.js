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
};

const updatePost = async (req, res) => {
    try {
      const { id } = req.params;
  
      const decodedUser = res.locals.decodedToken;
      const foundUser = await User.findOne({ email: decodedUser.email });
  
      const foundPost = await Posts.findById(id);
  
      if (foundUser._id.toString() !== foundPost.owner.toString()) {
        return res.status(500).json({
          messgae: 'You do not have permission to update this post.'
        })
      }

      const updatedPost = await Posts.findByIdAndUpdate(id, req.body, {
        new: true,
      });

      if(updatedPost === null) {
        throw new Error('No post with that ID is found')
      }

      res.status(200).json({ message: "Updated the post", payload: updatedPost });
    } catch (error) {
      res.status(500).json({ message: error, error: errorHandler(error) });
    }
};

const deletePost = async (req, res) => {
    try {
      const { id } = req.params;
  
      const decodedUser = res.locals.decodedToken;
      const foundUser = await User.findOne({ email: decodedUser.email });
      const foundPost = await Posts.findById(id);
  
      if (foundUser._id.toString() !== foundPost.owner.toString()) {
        return res.status(500).json({
          messgae: 'You do not have permission to delete this post.'
        })
      }
      
      const deletedPost = await Posts.findByIdAndDelete(id);

      if(deletePost === null) {
        throw new Error('No post with that ID is found')
      }

      await foundUser.postHistory.pull(id);

      await foundUser.save();

      res.status(200).json({ message: "Post was deleted successfully", payload: deletedPost });
    } catch (error) {
      res.status(500).json({ message: "error", error: error });
    }
};

module.exports = {
	createPost,
	getPosts,
	deletePost,
	updatePost,
}