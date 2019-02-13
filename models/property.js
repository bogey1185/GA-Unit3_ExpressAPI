const mongoose  = require('mongoose');

const propertySchema = new mongoose.Schema({
  street: String,
  unit: String,
  city: String, 
  state: String,
  zipCode: Number,
  displayProperty: Boolean, //switch to false after LL deletes listing. this allows for saving after LL 'deletes' listing
  propertyCode: String,
  readOnly: Boolean,  //this will switch to true once tenant uploads photos. Therefore, can't be changed later.
  inspectionData: [{
    imageUrl: {type: String, required: true},
    text: String,
    uploadDate: Date
  }] 

});



const Property = mongoose.model('Property', propertySchema);

module.exports = Property;