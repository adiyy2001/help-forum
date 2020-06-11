const express = require('express');
const router = new express.Router();
const Post = require('../models/post');

router.post('/add', (req, res) => {
    if (!req.isAuthenticated()) {
        req.flash('danger', 'Musisz się zalogować, by dodawać posty');
        res.redirect('/users/login');
    }
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
            author: `${req.user.name} ${req.user.surname}`,
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

router.get('/:id', async (req, res) => {
    const _id = req.params.id;
    try {
        const post = await Post.findById({ _id });
        res.render('post', post);
    } catch (err) { res.status(401).send(err) }
})

router.post('/:id/add-comment', async (req, res) => {
    const _id = req.params.id;
    const user = `${req.user.name} ${req.user.surname}`;
    try {
        const post = await Post.findById({ _id });
        post.comments.push({
            comment: {
                author: user,
                comment: req.body.message
            }
        });
        await post.save();
        res.redirect(`/posts/${req.params.id}`)
    } catch (err) { console.log(err) }
})

module.exports = router;