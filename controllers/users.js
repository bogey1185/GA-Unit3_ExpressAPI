const express   = require('express');
const router    = express.Router();
const bcrypt    = require('bcryptjs');
const Tenant    = require('../models/tenant.js');
const Landlord  = require('../models/landlord.js');


//~~~~~~~~~~~Registration Routes~~~~~~~~~~~~//

  //new landlord registration

router.post('/registerlandlord', async (req, res, next) => {

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
        sysMsg: 'user created!'
      })
      
    } else {
      res.json({
        status: 418,
        sysMsg: 'username taken!'
      })
    }
        
  } catch (err) {
    res.send(err);
  
  }
})

  //new tenant registration

router.post('/registertenant', async (req, res, next) => {

  try {
    
    const foundUser = await Tenant.findOne({username: req.body.username});

    if (!foundUser) {
      const hashedPwd = await bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
      const createdTenant = await Tenant.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.username,
        password: hashedPwd,
        email: req.body.email
      });
      
      res.json({
        status: 200,
        sysMsg: 'user created!'
      })
      
    } else {
      res.json({
        status: 418,
        sysMsg: 'username taken!'
      })
    }
        
  } catch (err) {
    res.send(err);
  
  }
})

//~~~~~~~~~~~Login Routes~~~~~~~~~~~~//

  //Landlord login

router.post('/loginlandlord', async (req, res, next) => {
  try {

    //try to find submitted username
    const foundUser = await Landlord.findOne({username: req.body.username});

    //if user not found
    if (!foundUser) {
      res.json({
        status: 418,
        sysMsg: 'user not found'
      })
    } else {
      if (bcrypt.compareSync(req.body.password, foundUser.password)) {
        res.json({
          status: 200,
          sysMsg: 'login successful',
          data: foundUser
        })
      } else {
        re.json({
          status: 418,
          sysMsg: 'password incorrect'
        })
      }
    }
        
  } catch (err) {
    console.log(err);
    res.send(err);
  
  }
})


//tenant login

router.post('/logintenant', async (req, res, next) => {
  try {

    //try to find submitted username
    const foundUser = await Tenant.findOne({username: req.body.username});

    //if user not found
    if (!foundUser) {
      res.json({
        status: 418,
        sysMsg: 'user not found'
      })
    } else {
      if (bcrypt.compareSync(req.body.password, foundUser.password)) {
        res.json({
          status: 200,
          sysMsg: 'login successful',
          data: foundUser
        })
      } else {
        re.json({
          status: 418,
          sysMsg: 'password incorrect'
        })
      }
    }
        
  } catch (err) {
    console.log(err);
    res.send(err);
  
  }
})

//~~~~~~~~~~~Update route for landlord delete button~~~~~~~~~~~~//

router.put('/:id', async (req, res, next) => {
  try {
    //find landlord who owns the subject property 
    const foundOwner = await Landlord.findOne({'propertyList._id': req.params.id});   
    //remove offending property and save change
    foundOwner.propertyList.id(req.params.id).remove();
    foundOwner.save();
    //send code, offender index to front end
    res.json({
      status: 200,
      data: req.params.id
    })

  } catch (err) {
    console.log(err);
    next(err);
  
  }
})



module.exports = router;