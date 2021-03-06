const mongoose  = require('mongoose');
const Submission = require('./submission.js');

const propertySchema = new mongoose.Schema({
  ownerUsername: String,
  street: String,
  unit: String,
  city: String, 
  state: String,
  zipCode: String,
  propertyCode: String,
  readOnly: Boolean,  //this will switch to true once tenant uploads photos. Therefore, can't be changed later.
  inspectionData: [Submission.schema] 
});

const Property = mongoose.model('Property', propertySchema);

module.exports = Property;