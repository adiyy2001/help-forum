const express = require('express');
const router = new express.Router();
const User = require('../models/user');

router.get('/users/register', (req, res) => {
    res.render('register');
});

router.post('/users/register', async (req, res) => {
    const user = new User(req.body);

    try {
        await user.save();
        res.status(201).redirect('/users/login');
    } catch (err) {
        const errors = err.message.substring(23, err.message.length)
        .split(",")
        .map(x => x.substring(x.indexOf(':') + 1, x.length))
        res.render('register', { errors });
    }

});

router.get('/users/login', (req, res) => {
    res.render('login');
})



module.exports = router;