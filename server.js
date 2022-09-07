//==================
//DEPENDENCIES
//==================
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const products = require('./models/products.js');
const methodOverride = require("method-override");
require('dotenv').config();

//==================
//MIDDLEWARE
//==================
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(express.static("public"));
//==================
//DATABASE CONNECTION
//==================
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

//==================
//CONNECTION ERROR/SUCCESS
//==================
const db = mongoose.connection
db.on('error', (err) => console.log(err + "is mongo not running?"))
db.on('connected', () => console.log('mongo connected'))
db.on('disconnected', () => console.log('mongo disconnected'))

//==================
//ROUTES
//==================

//Seed
app.get('/products/seed', (req, res) => {
    products.create(
    [
        {
          name: 'Beans',
          description: 'A small pile of beans. Buy more beans for a big pile of beans.',
          img: 'https://imgur.com/LEHS8h3.png',
          price: 5,
          qty: 99
        }, {
          name: 'Bones',
          description: "It's just a bag of bones.",
          img: 'https://imgur.com/dalOqwk.png',
          price: 25,
          qty: 0
        }, {
          name: 'Bins',
          description: 'A stack of colorful bins for your beans and bones.',
          img: 'https://imgur.com/ptWDPO1.png',
          price: 7000,
          qty: 1
        },
      ],
      (error, data) => {
        res.redirect('/products');
      }
    );
});

//Index
app.get('/products', (req, res) => {
    products.find({}, (error, allProducts) => {
        res.render('index.ejs', {
            products: allProducts,
        })
    })
})
//New
app.get('/products/new', (req, res) => {
    res.render('new.ejs')
});
//D
//Update
app.put('/products/:id', (req, res) => {
    const newItem = {
        name: req.body.name,
        description: req.body.description,
        img: req.body.img,
        price: req.body.price,
        qty: req.body.qty,
    }
    products.findByIdAndUpdate(req.params.id, newItem, (error, updatedItem) => {
        updatedItem[req.params.id] = newItem;
        res.redirect('/products');
    })
});

//Create
app.post('/products', (req, res) => {
    const newItem = {
        name: req.body.name,
        description: req.body.description,
        img: req.body.img,
        price: req.body.price,
        qty: req.body.qty,
    }
    products.create(newItem, (error, createdItem) => {
        res.redirect('/products')
    })
});
//Edit
app.get('/products/:id/edit', (req, res) => {
    products.findById(req.params.id, (err, foundItem) => {
        res.render('edit.ejs', {
            product: foundItem,
            productId: req.params.id
        })
    })
});
//Show
app.get('/products/:id', (req, res) => {
    products.findById(req.params.id, (err, foundItem) => {
        res.render('show.ejs', {
            product: foundItem,
            productId: req.params.id,
        })
    })
});

//==================
//CAN YOU HEARRRR MEEE
//==================
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`we are live at ${PORT}`))

//create update and delete controller
//add buy button