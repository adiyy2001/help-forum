const express = require('express');
const router = new express.Router();
const User = require('../models/user');
const Post = require('../models/post');
const passport = require('passport');
const multer = require('multer');

router.get('/register', (req, res) => {
    res.render('register');
});

router.get('/login', (req, res) => {
    res.render('login');
});

router.get('/me', async (req, res) => {
    if (!req.isAuthenticated()) {
        req.flash('danger', 'Musisz się zalogować');
        res.redirect('/users/login');
    }
    const _id = req.session.passport['user'];
    try {
        const user = await User.findOne({ _id });
        const posts = await Post.find({ authorID: user._id.toString() });
        res.render('userInterface', { 
            _id,
            userData: user, 
            posts 
        });
    } catch (err) {
        res.status(401).send({ err })
    }
});

router.post('/me/avatar', (req, res ) => {

})

const upload = multer({
    dest: 'images'
})

router.get('/me/active', async (req, res) => {
    const _id = req.session.passport['user'];
    try {
        const posts = await Post.find({ status: false, authorID: _id.toString() });
        res.render('userInterface', { 
            _id,
            userData: req.user, 
            posts 
        }).send();
    } catch {}
});

router.get('/me/done', async (req, res) => {
    const _id = req.session.passport['user'];
    try {
        const posts = await Post.find({ status: true, authorID: _id.toString() });
        res.render('userInterface', { 
            _id,
            userData: req.user, 
            posts 
        }).send();
    } catch {}
});

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

router.post('/register', async (req, res) => {
    const name = req.body.name;
    const surname = req.body.surname;
    const nick = req.body.nick;
    const email = req.body.email;
    const voivodeship = req.body.voivodeship;
    const city = req.body.city;
    const password = req.body.password;
    const password2 = req.body.password2;

    req.checkBody('name', 'Imie jest wymagane').notEmpty();
    req.checkBody('surname', 'Nazwisko jest wymagane').notEmpty();
    req.checkBody('nick', 'Nick jest wymagane').notEmpty();
    req.checkBody('email', 'Email jest wymagane').isEmail();
    req.checkBody('voivodeship', 'Województwo jest wymagane').notEmpty();
    req.checkBody('city', 'Miasto jest wymagane').notEmpty();
    req.checkBody('password', 'Hasło jest wymagane').notEmpty();
    req.checkBody('password2', 'Hasła do siebie nie pasują').equals(req.body.password);

    let errors = req.validationErrors();
    if (errors) {
        res.render('register', { errors })
    }
    else {
        let newUser = new User({
            name,
            surname,
            email,
            nick,
            voivodeship,
            city,
            password
        });

        newUser.save(function (err) {
            if (err) {
                console.log(error);
                return;
            } else {
                req.flash('succes', 'Jesteś zarejestrowany, możesz się zalogować');
                res.redirect('/user/login');
            }
        })
    }



});

router.post('/login', async (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/users/me',
        failureRedirect: '/users/login',
        failureFlash: true
    })(req, res, next);
});

router.post('/me/add-contact', async (req, res) => {
    user = req.user;
    user.contact = req.body.contact;
    try {
        await user.save();
        res.redirect('/users/me')
    } catch(err) { console.log(err) }
})

module.exports = router;