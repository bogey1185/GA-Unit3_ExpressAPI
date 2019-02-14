const express   = require('express');
const router    = express.Router();
const Property  = require('../models/property.js');
const Landlord  = require('../models/landlord.js');
const request   = require('superagent');
const USPS      = require('../extra_express/uspsapikey.js');
const parser    = require('xml2json');

//~~~~~~~~~~~~~~~~~ property create route ~~~~~~~~~~~~~~~~~//

router.post('/', async (req, res, next) => {
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
          res.json({
            status: 200,
            property: createdProperty,
            data: foundLandlord
          });
          
        } else {
          //else, usps api wasn't able to find the address. return
          //address not found to front end to trigger user message.
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

//~~~~~~~~~~~~~~~~~ property update route ~~~~~~~~~~~~~~~~~//

router.put('/:id', async (req, res, next) => {
  try {

    //find property with proper ID and update it
    const foundProperty = await Property.findByIdAndUpdate(req.params.id, {propertyCode: req.body[0]}, {new: true});

    //find person who owns the property
    const foundOwner = await Landlord.findOne({'propertyList._id': req.params.id});
    
    //pull old version of property w/o propertyCode OUT, and insert new and save
    foundOwner.propertyList.id(req.params.id).remove();
    foundOwner.propertyList.push(foundProperty);
    foundOwner.save();

    res.json({
      status: 200,
      property: foundProperty,
      data: foundOwner
    })
       
        
  } catch (err) {
    console.log(err);
    next(err);
  
  }
})





module.exports = router;