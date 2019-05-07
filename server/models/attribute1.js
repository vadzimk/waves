const mongoose = require('mongoose');

const attribute1Schema = mongoose.Schema({
    name:{
        required: true,
        type: String,
        unique: 1,
        maxlength: 100,
    }
});

module.exports = mongoose.model('Attribute1', attribute1Schema);