const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        // validate(value) {
        //     if (value.length < 3) throw new Error('Imie jest za krótkie')
        // }
    },
    surname: {
        type: String,
        required: true,
        trim: true,
        // validate(value) {
        //     if (value.length < 3) throw new Error('Nazwisko jest za krótkie')
        // }
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
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    voivodeship: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
}, {
    timestamps: true
});



userSchema.pre('save', async function (next) {
    const user = this;
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
        user.password2 = await bcrypt.hash(user.password, 8);
    }
    next();
})


userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email })

    if (!user) throw new Error('Unable to login')

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) throw new Error('Unable to login')
    return user
}

userSchema.methods.generateAuthToken = async function () {
    const user = this;
    const token = jwt.sign({ _id: user._id.toString() }, 'eDJ6&$E2d');

    user.tokens = user.tokens.concat({ token });
    await user.save();
    return token
}

const User = module.exports = mongoose.model('User', userSchema)