const mongoose  = require('mongoose');

const tenantSchema = new mongoose.Schema({
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  email:    {type: String, required: true}  
})

const Tenant = mongoose.model('Tenant', tenantSchema);

module.exports = Tenant;