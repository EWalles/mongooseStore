const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userName: {type: String, required: true},
  description: String,
  img: String,
  price: {type: String, required: true},
  qty: {type: Number, required: true},
  shoppingCart:{}
})

const user = mongoose.model('User', userSchema)

module.exports = user;