//Dependencies
const express = require('express')
const productsRouter = express.Router();
const products = require('../models/products.js')

//Seed
productsRouter.get('/seed', (req, res) => {
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

//Buy
productsRouter.put('/:id/buy', (req, res) => {
        products.findById(req.params.id, (error, foundItem) => {
            console.log(foundItem)
            foundItem.qty -= 1;
            foundItem.save();
            res.redirect(`/products/${req.params.id}`);
        })
});

//Index
productsRouter.get('/', (req, res) => {
    products.find({}, (error, allProducts) => {
        res.render('index.ejs', {
            products: allProducts,
        })
    })
})

//New
productsRouter.get('/new', (req, res) => {
    res.render('new.ejs')
});

//Delete
productsRouter.delete('/:id', (req, res) => {
    products.findByIdAndDelete(req.params.id, (error, foundItem) => {
        productId = req.params.id;
        res.redirect('/products');
    })
})

//Update
productsRouter.put('/:id', (req, res) => {
    const newItem = {
        name: req.body.name,
        description: req.body.description,
        img: req.body.img,
        price: req.body.price,
        qty: req.body.qty,
    }
    products.findByIdAndUpdate(req.params.id, newItem, (error, foundItem) => {
        foundItem[req.params.id] = newItem;
        res.redirect(`/products/${req.params.id}`)
    })
});

//Create
productsRouter.post('/', (req, res) => {
    const newItem = {
        name: req.body.name,
        description: req.body.description,
        img: req.body.img,
        price: req.body.price,
        qty: req.body.qty,
    }
    products.create(newItem, (error, foundItem) => {
        res.redirect('/products')
    })
});

//Edit
productsRouter.get('/:id/edit', (req, res) => {
    products.findById(req.params.id, (err, foundItem) => {
        res.render('edit.ejs', {
            product: foundItem,
            productId: req.params.id
        })
    })
});

//Show
productsRouter.get('/:id', (req, res) => {
    products.findById(req.params.id, (err, foundItem) => {
        res.render('show.ejs', {
            product: foundItem,
            productId: req.params.id,
        })
    })
});

//Exports
module.exports = productsRouter;