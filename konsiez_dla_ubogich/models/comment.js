const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
    author: {
        type: String,
        required: true,
    },
    comment: {
        type: String,
        required: true,
    },
}, {
    timestamps: true
});


const Comment = module.exports = mongoose.model('Comment', commentSchema);