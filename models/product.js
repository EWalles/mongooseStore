const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {type: String, required: true},
  description: String,
  img: String,
  price: {type: String, required: true},
  qty: {type: Number, required: true},
})

const products = mongoose.model('Product', productSchema)

module.exports = products;