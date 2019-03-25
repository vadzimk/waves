const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); //encrypt passwords
const jwt = require('jsonwebtoken');
const SALT_T = 10;
require('dotenv').config();

//configure Schema for mongoose:
const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        unique: 1,
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
    },
    name: {
        type: String,
        required: true,
        maxlength: 100,
    },
    lastname: {
        type: String,
        required: true,
        maxlength: 100,
    },
    cart: {
        type: Array,
        default: [],
    },
    history: {
        type: Array,
        default: [],
    },
    role: {
        type: Number,
        default: 0,
    },
    token: {
        type: String,
    }
});


userSchema.pre('save', function (next) {
    const user = this;

    if (user.isModified('password')) {
        bcrypt.genSalt(SALT_T, (err, salt) => {
            if (err) return next(err);
            bcrypt.hash(user.password, salt, (err, hash) => {
                if (err) return next(err);
                user.password = hash;
                next();
            });
        });
    } else {
        next();
    }
});


//method to compare password on the userSchema
userSchema.methods.comparePassword = (candidatePassword, cb) => {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
        if (err) return cb(err);
        cb(null, isMatch);
    })
};

//method to generate token
userSchema.methods.generateToken = function (cb) {
    const user = this;
    const token = jwt.sign(user._id.teHexString(), process.env.SECRET);
    user.token = token;
    user.save((err, user)=>{
        if(err) return cb(err);
        cb(null, user);
    });
};


module.exports = mongoose.model('User', userSchema); //User model created out of the userSchema (the name is passed as a string argument inside the model method)

