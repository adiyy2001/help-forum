const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        validate(value) {
            if (value.length < 3) throw new Error('Imie jest za krótkie')
        }
    },
    surname: {
        type: String,
        required: true,
        trim: true,
        validate(value) {
            if (value.length < 3) throw new Error('Nazwisko jest za krótkie')
        }
    },
    nick: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        validate(value) {
            if (!validator.isEmail(value)) throw new Error('niepoprawny adres email')
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        validate(value) {
            if (value.length < 6) throw new Error('Hasło musi mieć conajmniej 6 znaków')
        }
    },
    password2: {
        type: String,
        required: true,
        trim: true,
        validate(value) {
            if (!validator.equals(value, this.password)) throw new Error('Hasła nie są identyczne')
        }
    },
    voivodeship: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    }
});

userSchema.pre('save', async function (next) {
    const user = this;
    if (user.isModified('password')) user.password = await bcrypt.hash(user.password, 8);
    next();
})

const User = module.exports = mongoose.model('User', userSchema);