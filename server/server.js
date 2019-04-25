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
const Product = require('./models/product');

//================= Product =================
//query articles by createdAt:
//articles?sortBy=createdAt&order=desc&limit=100&skip=5
//query articles by sold:
//articles?sortBy=sold&order=desc&limit=4
app.get('/api/products/articles',(req,res)=>{
    let order = req.query.order ? req.query.order : 'asc';
    let sortBy = req.query.sortBy ? req.query.sortBy : '_id';
    let limit = req.query.limit ? parseInt(req.query.limit) : 100;

    Product
        .find()
        .populate('brand')
        .populate('attribute_name')
        .sort([[sortBy, order]])
        .limit(limit)
        .exec((err, articles)=>{
            if(err) return res.status(400).send(err);
            res.send(articles);
        });
});




//query article/s by id
//article?id=XXX,XXX,XXX&type=single
app.get('/api/products/articles_by_id', (req,res)=>{
    const type = req.query.type; //is single or array
    let items = req.query.id;
    if(type==='array'){
        let ids = req.query.id.split(',');
//array of objectIds:
        items = ids.map(item=>
            mongoose.Types.ObjectId(item)
        );
    }
    Product
        .find({'_id':{$in:items}})
        .populate('brand')
        .populate('attribute_name')
        .exec((err, docs)=>res.status(200).send(docs));
});

//create a new article
app.post('/api/products/article', auth, admin, (req, res) => {
    const product = new Product(req.body);

    product.save((err, doc) => {
        if (err) return res.json({success: false, err});
        res.status(200).json({success: true, article: doc})
    });

});


//================ Attribute_name ===========

//create a new sort in the attribute_name
app.post('/api/products/attribute_name', auth, admin, (req, res) => {
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
app.get('/api/products/attribute_names', (req, res) => {
    Attribute_name.find({}, (err, attribute_names) => {
        if (err) return res.status(400).send(err);
        res.status(200).send(attribute_names);
    });
});


//================ Brand ===============

//create a new brand
app.post('/api/products/brand', auth, admin, (req, res) => {
    const brand = new Brand(req.body);
    //by default the save method returns back what was saved to the db
    brand.save((err, doc) => {
        if (err) return res.json({success: false, err});
        res.status(200).json({success: true, brand: doc});
    });


});

//get all brands from administrator's panel
app.get('/api/products/brands', (req, res) => {
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

app.get('/api/users/logout', auth, (req, res) => {
    User.findOneAndUpdate({_id: req.user._id}, {token: ''}, (err, doc) => {
        if (err) return res.json({success: false, err});
        return res.status(200).send({success: true});
    });
});

const port = process.env.PORT || 3002;

app.listen(port, console.log("Server running on port " + port));