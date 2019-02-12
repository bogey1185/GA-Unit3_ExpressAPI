const express   = require('express');
const router    = express.Router();
const Tenant    = require('../models/tenant.js');
const Landlord  = require('../models/landlord.js');


//~~~~~~~~~~~Register Route~~~~~~~~~~~~//

  //landlord register

router.post('/registerLandlord', (req, res, next) => {
  console.log(req.body);
  try {
    console.log('working');
        
  } catch (err) {
    console.log(err);
    next(err);
  
  }
})


  //tenant register



//login route

    // be sure to pass this forward if login successful:

    // res.json({
    //   status: 200,
    //   data: 'login successful'
    // });







module.exports = router;