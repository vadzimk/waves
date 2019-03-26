const mongoose = require('mongoose');


const productSchema = mongoose.Schema({
    name:{
        required: true,
        type: String,
        unique: 1,
        maxlength: 100
    },
    description:{
        required: true,
        type: String,
        maxlength: 10000,
    },
    price:{
        required: true,
        type: Number,
        maxlength: 255,
    },
    brand:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Brand",
        required: true,
    },
    shipping:{
        required: true,
        type: Boolean
    },
    available:{
        required:true,
        type: Boolean
    },
    attribute_name:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "attribute_name",
        required: true,
    },
    attribute2:{
        reqiured:true,
        type: Number,
    },
    sold:{
        type: Number,
        maxlength: 100,
        default: 0,
    },
    publish:{
        required: true,
        type: Boolean,
    },
    images:{
        type: Array,
        default: [],
    }

},{timestamps: true}); //generate timestamps for the products automatically by mongo db

module.exports = mongoose.model('Product', productSchema);