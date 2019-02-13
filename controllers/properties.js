const express   = require('express');
const router    = express.Router();
const Property  = require('../models/property.js');
const Landlord  = require('../models/landlord.js');
const request   = require('superagent');
const USPS      = require('../extra_express/uspsapikey.js');
const parser    = require('xml2json')

//create new property
    //-- address of new property used to auto generate
    //-- unique address string. this wil be used to ensure
    //-- multipel people don't try to claim the same address
    //invite code also created by landlord when property is created
    //so it can be saved and send to the tenant

//~~~~~~~~~~~~~~~~~new property~~~~~~~~~~~~~~~~~//

router.post('/new', async (req, res, next) => {
  try {

    //need to sanitize submitted address through USPS API
    //first build API query based on req body
    const apiQueryString = `http://production.shippingapis.com/ShippingAPITest.dll?API=Verify&XML=<AddressValidateRequest USERID="${USPS}"><Address ID="0"><Address1>${req.body.unit}</Address1><Address2>${req.body.street}</Address2><City>${req.body.city}</City><State>${req.body.state}</State><Zip5>${req.body.zipCode}</Zip5><Zip4></Zip4></Address></AddressValidateRequest>`;
    
    //api request to USPS
    request.get(apiQueryString).end(async (err, data) => {
      if (err) {
        res.send(err);
      } else {
      //data delivered as XML, so need to convert to JS Object
      //and store in uspsResponse
        const convXML2JSON = parser.toJson(data.text);
        const uspsResponse = JSON.parse(convXML2JSON).AddressValidateResponse.Address;
        

        //if the response has a property indicating the usps api
        //found the property successfully, create the property using 
        //usps's normalized formatting.
        if (uspsResponse.Address2) {
          
          // create a new property in our database 
          const createdProperty = await Property.create({
            ownerUsername: req.body.username,
            street: uspsResponse.Address2,
            unit: uspsResponse.Address1,
            city: uspsResponse.City,
            state: uspsResponse.State,
            zipCode: `${uspsResponse.Zip5}-${uspsResponse.Zip4}`,
            readOnly: false
          })

          //now add created property to landlord's property list
          //find the landlord
          const foundLandlord = await Landlord.findOne({username: req.body.username});
          
          //push the new property into landlord's collection
          await foundLandlord.propertyList.push(createdProperty);
          await foundLandlord.save();

          //send the updated landlord back to front end to update display
          res.json(foundLandlord);
          
        } else {
          //else, usps api wasn't able to find the address. return
          //address not found to front end.
          res.json({
          status: 418,
          sysMsg: 'Address Not Found'

          });
        }
      }
    })  
        
  } catch (err) {
    console.log(err);
    next(err);
  
  }
})








module.exports = router;