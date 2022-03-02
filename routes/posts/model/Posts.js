const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    post: {
        type: String,
        required: true,
    },
    owner: [{ type: mongoose.Schema.ObjectId, ref: 'user' }],
    commentHistory: [{ type: mongoose.Schema.ObjectId, ref: 'comment' }],
}, { timestamps: true });

module.exports = mongoose.model("post", postSchema);