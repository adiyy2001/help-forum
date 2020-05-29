const express = require('express');
const router = new express.Router();
const User = require('../models/user');
const passport = require('passport');

router.get('/register', (req, res) => {
    res.render('register');
});

router.get('/login', (req, res) => {
    res.render('login');
});

router.get('/userInterface', (req, res) => {
    const user = req.user;
    res.render('userInterface', user);
});

router.get('/logout', function(req, res){
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
        successRedirect: '/users/userInterface',
        failureRedirect: '/users/login',
        failureFlash: true
    })(req, res, next);
});


module.exports = router;