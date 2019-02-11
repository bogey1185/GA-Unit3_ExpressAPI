const mongoose  = require('mongoose');

const propertySchema = new mongoose.Schema({
  address: {
    streetNum: Number,
    streetName: String,
    unit: String,
    city: String, 
    state: String,
    zipCode: Number
  },
  displayProperty: Boolean,
  inviteCode: String,
  landlordImgUrl: String,
  inspectionData: [{
    imageUrl: {type: String, required: true},
    text: String,
    uploadDate: Date
  }] 

});



const Property = mongoose.model('Property', propertySchema);

module.exports = Property;