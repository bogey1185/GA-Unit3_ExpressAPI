const express   = require('express');
const router    = express.Router();
const bcrypt    = require('bcryptjs');
const Tenant    = require('../models/tenant.js');
const Landlord  = require('../models/landlord.js');


//~~~~~~~~~~~Register Routes~~~~~~~~~~~~//

  //landlord register

router.post('/registerLandlord', async (req, res, next) => {

  try {
    
    const foundUser = await Landlord.findOne({username: req.body.username});

    if (!foundUser) {
      const hashedPwd = await bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
      const createdLandlord = await Landlord.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        businessName: req.body.businessName,
        username: req.body.username,
        password: hashedPwd,
        email: req.body.email
      });

      res.json({
        status: 200,
        data: 'user created!'
      })
      
    } else {
      res.json({
        status: 418,
        data: 'username taken!'
      })
    }
        
  } catch (err) {
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