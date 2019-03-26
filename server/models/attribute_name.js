const mongoose = require('mongoose');

const attribute_nameSchema = mongoose.Schema({
    name:{
        required: true,
        type: String,
        unique: 1,
        maxlength: 100,
    }
});

module.exports = mongoose.model('Attribute_name', attribute_nameSchema);