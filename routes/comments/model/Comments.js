const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    comment: {
        type: String
    },
    owner: [{ type: mongoose.Schema.ObjectId, ref: 'user' }],
    post: [{ type: mongoose.Schema.ObjectId, ref: 'post' }],
}, { timestamps: true });

module.exports = mongoose.model("comment", commentSchema);