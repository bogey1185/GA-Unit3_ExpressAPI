const express   = require('express');
const router    = express.Router();
const Property    = require('../models/property.js');
const request   = require('superagent');

//create new property
    //-- address of new property used to auto generate
    //-- unique address string. this wil be used to ensure
    //-- multipel people don't try to claim the same address
    //invite code also created by landlord when property is created
    //so it can be saved and send to the tenant












module.exports = router;