const express = require('express');
const bodyParser = require('body-parser'); //bring json from http request
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
require('dotenv').config(); //handle the .env import


const app = express();
mongoose.Promise = global.Promise;
mongoose.connect(process.env.DATABASE, {useNewUrlParser: true});
mongoose.set('useCreateIndex', true); //get rid of warning

//register middlaware
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());
const auth = require('./middleware/auth');
const admin = require('./middleware/admin');

//
//================ Models ==============

const User = require('./models/user');
const Brand = require('./models/brand');
const Attribute_name = require('./models/attribute_name');

//================ Attribute_name ===========

//create a new sort in the attribute_name
app.post('/api/product/attribute_name', auth, admin, (req, res) => {
    const attribute_name = new Attribute_name(req.body);
    attribute_name.save((err, doc) => {
        if (err) return res.json({success: false, err});
        res.status(200).json({
            success: true,
            attribute_name: doc,
        });
    });
});

//get all sorts of the attribute_name
app.get('/api/product/attribute_names', (req,res)=>{
    Attribute_name.find({}, (err, attribute_names)=>{
        if(err) return res.status(400).send(err);
        res.status(200).send(attribute_names);
    });
});


//================ Brand ===============

//create a new brand
app.post('/api/product/brand', auth, admin, (req, res) => {
    const brand = new Brand(req.body);
    //by default the save method returns back what was saved to the db
    brand.save((err, doc) => {
        if (err) return res.json({success: false, err});
        res.status(200).json({success: true, brand: doc});
    });


});

//get all brands from administrator's panel
app.get('/api/product/brands', (req, res) => {
    Brand.find({}, (err, brands) => {
        if (err) return res.status(400).send(err);
        res.status(200).send(brands);
    });
});

//================ Users ================

app.get('/', (req, res) => {
    res.send('<html><head></head><body><h1>Hello world</h1></body></html>');
});

app.get('/api/users/auth', auth, (req, res) => {
    res.status(200).json({
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname,
        role: req.user.role,
        cart: req.user.cart,
        history: req.user.history,
    });
});

app.post('/api/users/register', (req, res) => {
    //create a new user schema
    const user = new User(req.body);
    //take the data form the body of the post request and store it in database
    user.save((err, doc) => {
        if (err) return res.json({success: false, err});
        res.status(200).json({success: true});
    });
});

app.post('/api/users/login', (req, res) => {
    //find email
    User.findOne({'email': req.body.email}, (err, user) => {
        if (!user) return res.json({loginSuccess: false, message: "Auth failed - email not found"});
        //if the email is in the database check the password
        user.comparePassword(req.body.password, (err, isMatch) => {
            if (!isMatch) return res.json({loginSuccess: false, message: "Wrong password."});
            //if password is correct, generate a token
            user.generateToken((err, user) => {
                if (err) return res.status(400).send(err);
                //if there is no error, store the token as a cookie
                res.cookie('w_auth', user.token).status(200).json({loginSuccess: true});
            });
        });
    });
});

app.get('/api/user/logout', auth, (req, res) => {
    User.findOneAndUpdate({_id: req.user._id}, {token: ''}, (err, doc) => {
        if (err) return res.json({success: false, err});
        return res.status(200).send({success: true});
    });
});

const port = process.env.PORT || 3002;

app.listen(port, console.log("Server running on port " + port));