const express = require('express');
const router = new express.Router();
const Post = require('../models/post');

router.post('/add', (req, res) => {
    req.checkBody('title', 'Title is required').notEmpty();
    req.checkBody('message', 'Body is required').notEmpty();
    let errors = req.validationErrors();

    if (errors) {
        res.render('forum', {
            title: 'Add Article',
            errors
        });
    } else {
        const post = new Post({
            title: req.body.title,
            message: req.body.message,
            author: req.user._id
        });

        post.save(err => {
            if (err) {
                console.log(err);
                return;
            } else {
                req.flash('success', 'Post dodany');
                res.redirect('/forum');
            };
        });
    };
});

module.exports = router;