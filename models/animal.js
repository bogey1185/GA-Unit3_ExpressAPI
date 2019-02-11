const mongoose  = require('mongoose');
const User      = require('./user.js');

const animalSchema = new mongoose.Schema({
  name: String,
  species: String,
  age: Number,
  breed: String,
  color: String,
  gender: String,
  size: String,
  narrative: String,
  imageURL: [String],
  shelter: [User.schema],
  likes: Number,
  follows: Number,
  shares: Number

});



const Animal = mongoose.model('Animal', animalSchema);

module.exports = Animal;