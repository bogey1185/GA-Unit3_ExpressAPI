const express   = require('express');
const router    = express.Router();
const Animal    = require('../models/animal.js');
const request   = require('superagent');

router.get('/seed', async (req, res, next) => {
  try {
    console.log('working');
    await request
    .get(`https://pokeapi.co/api/v2/pokemon/?limit=1`)
    .end((err, data) => {
      console.log(data.text);
      const parsedData = JSON.parse(data.text)
      console.log(parsedData);
      res.json(parsedData)
    })

        
  } catch (err) {
    console.log(err);
    next(err);
  
  }
})







module.exports = router;