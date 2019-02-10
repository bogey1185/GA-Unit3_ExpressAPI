const mongoose  = require('mongoose');
const Shelter    = require('./shelter.js');

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
  shelter: [Shelter.schema],
  likes: Number,
  follows: Number,
  shares: Number

});



const Animal = mongoose.model('Animal', animalSchema);

module.exports = Animal;