 const mongoose  = require('mongoose');
const Property  = require('./property.js');

const landlordSchema = new mongoose.Schema({
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  businessName: String,
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  email:    {type: String, required: true},
  propertyList: [Property.schema]
  
})

const Landlord = mongoose.model('Landlord', landlordSchema);

module.exports = Landlord;