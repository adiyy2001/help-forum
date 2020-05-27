const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');
const config = require('../config/database');
const bcrypt = require('bcryptjs');

module.exports = passport => {
    passport.use(new LocalStrategy((email, password, done) => {
        let query = { email };
        User.findOne(query, function (err, user) {
            if (err) throw err;
            if (!user) return done(null, false, { message: 'nieznaleziono użytkownika' })

            bcrypt.compare(password, user.password, (err, isMatch) => {
                if (err) throw err;

                if (isMatch) return done(null, user);
                else return done(null, false, { message: 'Nieprawidłowe Hasło' });
            });
        })
    }));

    passport.serializeUser((user, done) => done(null, user.id));

    passport.deserializeUser(((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user);
        })
    }))
}