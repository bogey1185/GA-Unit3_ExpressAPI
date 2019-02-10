const mongoose  = require('mongoose');
const Animal    = require('./animal.js');

const userSchema = new mongoose.Schema({
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  email:    String,
  account:  {
    imageURL: String,
    address: {
      streetNum: String,
      street: String,
      unit: String,
      city: String,
      state: String,
      zip: String
    }, 
    narrative: String, 
    followedPets: [Animal.schema]
  }
})

const User = mongoose.model('User', userSchema);

module.exports = User;