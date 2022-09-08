const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {type: String, required: true},
  description: String,
  img: String,
  price: Number,
  qty: Number
})

const products = mongoose.model('Product', productSchema)

module.exports = products;