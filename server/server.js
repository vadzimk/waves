const express = require('express');
const bodyParser = require('body-parser'); //bring json from http request
const cookieParser = require('cookie-parser');
const formidable = require('express-formidable'); //use to handle files in requests to the server
const cloudinary = require('cloudinary'); //hosting images


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

//configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
});

const auth = require('./middleware/auth');
const admin = require('./middleware/admin');

//
//================ Models ==============

const User = require('./models/user');
const Brand = require('./models/brand');
const Attribute1 = require('./models/attribute1');
const Attribute2 = require('./models/attribute2');
const Product = require('./models/product');

//================= Products =================
app.post('/api/products/shop', (req, res) => {

    let order = req.body.order ? req.body.order : 'desc'; //by default order is descending.
    let sortBy = req.body.sortBy ? req.body.sortBy : '_id'; //by default sort by id.
    let limit = req.body.limit ? parseInt(req.body.limit) : 100; //if not provided the limit fetch 100 items from db
    let skip = parseInt(req.body.skip);
    let findArgs = {};

    for (let key in req.body.filters) {
        if (req.body.filters[key].length > 0) {
            if (key === 'price') {
                findArgs[key] = {
                    $gte: req.body.filters[key][0],
                    $lte: req.body.filters[key][1]
                };
            } else {
                findArgs[key] = req.body.filters[key];
            }
        }
    }

    findArgs['publish'] = true; // brings only the articles with publish property set to true

    Product
        .find(findArgs)
        .populate('brand')
        .populate('attribute1')
        .populate('attribute2')
        .sort([[sortBy, order]])
        .skip(skip)
        .limit(limit)
        .exec((err, articles) => {
            if (err) return res.status(400).send(err);
            res.status(200).json({
                size: articles.length,
                articles,
            })
        })

});


//query articles by createdAt:
//articles?sortBy=createdAt&order=desc&limit=100&skip=5
//query articles by sold:
//articles?sortBy=sold&order=desc&limit=4
app.get('/api/products/articles', (req, res) => {
    let order = req.query.order ? req.query.order : 'asc';
    let sortBy = req.query.sortBy ? req.query.sortBy : '_id';
    let limit = req.query.limit ? parseInt(req.query.limit) : 100;

    Product
        .find()
        .populate('brand')
        .populate('attribute1')
        .populate('attribute2')
        .sort([[sortBy, order]])
        .limit(limit)
        .exec((err, articles) => {
            if (err) return res.status(400).send(err);
            res.send(articles);
        });
});


//query article/s by id
//article?id=XXX,XXX,XXX&type=single
app.get('/api/products/articles_by_id', (req, res) => {
    const type = req.query.type; //is single or array
    let items = req.query.id;
    if (type === 'array') {
        let ids = req.query.id.split(',');
//array of objectIds:
        items = ids.map(item =>
            mongoose.Types.ObjectId(item)
        );
    }
    Product
        .find({'_id': {$in: items}})
        .populate('brand')
        .populate('attribute1')
        .populate('attribute2')
        .exec((err, docs) => res.status(200).send(docs));
});

//create a new article
app.post('/api/products/article', auth, admin, (req, res) => {
    const product = new Product(req.body);

    product.save((err, doc) => {
        if (err) return res.json({success: false, err});
        res.status(200).json({success: true, article: doc})
    });

});


//================ Attribute1 ===========

//create a new value in the attribute1
app.post('/api/products/attribute1', auth, admin, (req, res) => {
    const attribute1 = new Attribute1(req.body);
    attribute1.save((err, doc) => {
        if (err) return res.json({success: false, err});
        res.status(200).json({
            success: true,
            attribute1: doc,
        });
    });
});

//get all values of the attribute1
app.get('/api/products/attribute1', (req, res) => {
    Attribute1.find({}, (err, attribute1) => {
        if (err) return res.status(400).send(err);
        res.status(200).send(attribute1);
    });
});


//================ Attribute2 ===========

//create a new value in the attribute1
app.post('/api/products/attribute2', auth, admin, (req, res) => {
    const attribute2 = new Attribute2(req.body);
    attribute2.save((err, doc) => {
        if (err) return res.json({success: false, err});
        res.status(200).json({
            success: true,
            attribute2: doc,
        });
    });
});

//get all values of the attribute2
app.get('/api/products/attribute2', (req, res) => {
    Attribute2.find({}, (err, attribute2) => {
        if (err) return res.status(400).send(err);
        res.status(200).send(attribute2);
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


//upload an image on the Add a new product section of Admin dashboard
app.post('/api/users/upload_image', auth, admin, formidable(), (req, res) => {
    cloudinary.uploader.upload(
        req.files.file.path,
        (result) => {
            console.log(result);
            res.status(200).send({public_id: result.public_id, url: result.url})
        },
        {public_id: `${Date.now()}`, resource_type: 'auto'})
});

//remove an image from Cloudinary at the add a new product section of Admin dashboard
app.get('/api/users/remove_image', auth, admin, (req, res) => {
    let image_id = req.query.public_id;
    cloudinary.uploader.destroy(image_id, (err, result)=>{
        if(err)return res.json({success: false, err});
        res.status(200).send('ok');
    })
});

const port = process.env.PORT || 3002;

app.listen(port, console.log("Server running on port " + port));