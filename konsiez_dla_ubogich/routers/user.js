const express = require('express');
const router = new express.Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');

router.get('/users/register', (req, res) => {
    res.render('register');
});

router.post('/users/register', (req, res) => {
    const name = req.body.name;
    const surname = req.body.surname;
    const nick = req.body.nick;
    const email = req.body.email;
    const voivodeship = req.body.voivodeship;
    const city = req.body.city;
    const password = req.body.password;
    const password2 = req.body.password2;

    req.checkBody('name', 'Imie jest wymagane').notEmpty();
    req.checkBody('nick', 'Nick jest wymagane').notEmpty();
    req.checkBody('email', 'Email jest wymagany').notEmpty();
    req.checkBody('email', 'Email jest niepoprawny').isEmail();
    req.checkBody('nick', 'Nick jest wymagany').notEmpty();
    req.checkBody('password', 'Hasło jest wymagany').notEmpty();
    req.checkBody('password2', 'hasła nie są równe').equals(password);

    req.getValidationResult().then(function (result) {
        if (!result.isEmpty()) {
            var errors = result.array().map((elem) => elem.msg);

            console.log('There are following validation errors: ' + errors.join('&&'));
            res.render('register', { errors: errors });
        } else {
            let newUser = new User({
                name,
                surname,
                nick,
                email,
                password,
                password2,
                voivodeship,
                city
            });
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) console.log(err);

                    newUser.password = hash;
                    newUser.save(function (err) {
                        if (err) console.log(err);
                        else res.redirect('/users/login')
                    });
                });
            });
        }});
    });

    router.get('/users/login', (req, res) => {
        res.render('login');
    })



    module.exports = router;