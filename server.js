
//DEPENDENCIES

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const methodOverride = require("method-override");
require('dotenv').config();


//MIDDLEWARE

app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(express.static("public"));


//DATABASE CONNECTION


mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});


//CONNECTION STATUS

const db = mongoose.connection
db.on('error', (err) => console.log(err + "is mongo not running?"))
db.on('connected', () => console.log('mongo connected'))
db.on('disconnected', () => console.log('mongo disconnected'))


//ROUTES


const productsController = require('./controllers/products.js');
app.use('/products', productsController);


//Listening

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`we are live at ${PORT}`))

