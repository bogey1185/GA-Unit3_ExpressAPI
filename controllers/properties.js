const express   = require('express');
const router    = express.Router();
const Property  = require('../models/property.js');
const request   = require('superagent');
const USPS      = require('../extra_express/uspsapikey.js');

//create new property
    //-- address of new property used to auto generate
    //-- unique address string. this wil be used to ensure
    //-- multipel people don't try to claim the same address
    //invite code also created by landlord when property is created
    //so it can be saved and send to the tenant

//~~~~~~~~~~~~~~~~~new property~~~~~~~~~~~~~~~~~//

router.post('/new', async (req, res, next) => {
  try {
    console.log(req.body, ' NEW PROP REQ BODY');

    //need to sanitize submitted address through USPS API
    //first build API query based on req body
    const apiQueryString = `http://production.shippingapis.com/ShippingAPITest.dll?API=Verify&XML=<AddressValidateRequest USERID="${USPS}"><Address ID="0"><Address1>${req.body.unit}</Address1><Address2>${req.body.street}</Address2><City>${req.body.city}</City><State>${req.body.state}</State><Zip5>${req.body.zipCode}</Zip5><Zip4></Zip4></Address></AddressValidateRequest>`
    console.log(apiQueryString, 'API QUERY STRING');
    //api request to USPS
    //make variable to store response for further processing
    const uspsResponse;
    //api request
    request.get(apiQueryString).end((err, data) => {
      if (err) {
        res.send(err)
      } else {
      //data delivered as XML, so need to convert to JSON
        res.send(data)
      }

    });
    console.log(uspsResponse, 'USPS RESPONSE');


    
        
  } catch (err) {
    console.log(err);
    next(err);
  
  }
})


// router.get('/', (req, res) => {
//   request
//     .get(`https://api.openweathermap.org/data/2.5/forecast?zip=60610,us${API_KEY_QS}`)
//     .end((err, data) => {
//       const pretty = JSON.parse(data.text)

//       // pass this data to a template


//       // somehow add something to the db


//       res.json(pretty)
//     })
// })







module.exports = router;