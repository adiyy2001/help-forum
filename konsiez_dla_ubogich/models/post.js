const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    title: {
        type: String,
        require: true,
    },
    message: {
        type: String,
        require: true,
    },
    author: {
        type: String,
        require: true,
    }
});

const Post = module.exports = mongoose.model('Post', postSchema);