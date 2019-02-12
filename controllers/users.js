const express   = require('express');
const router    = express.Router();
const Tenant    = require('../models/tenant.js');
const Landlord  = require('../models/landlord.js');


//~~~~~~~~~~~Register Route~~~~~~~~~~~~//

  //landlord register

router.post('/registerLandlord', async (req, res, next) => {
  console.log(req.body);
  try {
    
    const createLandlord = await Landlord.create(req.body);
    console.log(createLandlord);
    res.json({
      status: 200,
      data: 'user created!'
    })
        
  } catch (err) {
    console.log(err, 'this is server ERR');
    res.send(err);
  
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