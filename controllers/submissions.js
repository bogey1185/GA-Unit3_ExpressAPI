const express   = require('express');
const router    = express.Router();
const Submission= require('../models/submission.js');
const Property  = require('../models/property.js');
const request   = require('superagent');


//~~~~~~~~~~~~~~~~~ submission create route ~~~~~~~~~~~~~~~~~//

router.post('/', async (req, res, next) => {
  console.log(req.body, "REQ BODY SUBMISSIONS POST");
  try {
    //get current date
    const currentDate = await new Date();
    //create new submission
    const createdSubmission = await Submission.create({
      parentPropertyId: req.body.parentPropertyId,
      imageUrl: req.body.imageUrl,
      text: req.body.text,
      uploadDate: currentDate
    })
    console.log(createdSubmission, 'createdsubmission !!!!!!!');

    //now add new submission to parent array
    //find parent
    const foundProperty = await Property.findById(createdSubmission.parentPropertyId);
    console.log(foundProperty, " FOUND PROPERY pre push");
    //add submission to parent property
    foundProperty.inspectionData.push(createdSubmission);
    console.log(foundProperty, ' FOUND PROPERY POST PUSH)');
    foundProperty.save();
    console.log(foundProperty, ' POST SAVE');

    //send the updated property back to front end to update display
    res.json({
      status: 200,
      submission: createdSubmission,
      property: foundProperty
    });
        
  } catch (err) {
    console.log(err);
    next(err);
  
  }
})





module.exports = router;