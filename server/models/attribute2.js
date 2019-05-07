const mongoose = require('mongoose');

const attribute2Schema = mongoose.Schema({
    name:{
        required: true,
        type: Number,
        unique: 1,
    }
});

module.exports = mongoose.model('Attribute2', attribute2Schema);