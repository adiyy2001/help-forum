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
    },
    status: {
        type: Boolean,
        default: false
    }, comments: [{
        comment: {
            author: {
                type: String
            },
            authorID: {
                type: String,
            },
            comment: {
                type: String
            }
        }
    }]
}, {
    timestamps: true
});

const Post = module.exports = mongoose.model('Post', postSchema);