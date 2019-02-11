
//~~~~~~~~~~~~~~~~~~~~ REQUIRES ~~~~~~~~~~~~~~~~~~~~//
require('./db/db.js')
const PORT            = process.env.PORT || 3000;
const express         = require('express');
const app             = express();
const session         = require('express-session');
const bodyParser      = require('body-parser');
const passString      = require('./extra_express/pass.js');
const animalController  = require('./controllers/animals.js');
const userController  = require('./controllers/users.js');

//~~~~~~~~~~~~~~~~~~~~ MIDDLEWARE ~~~~~~~~~~~~~~~~~~~~//

app.use(session({
  secret: passString, 
  resave: false, 
  saveUninitialized: false
}));
app.use(bodyParser.urlencoded({extended: false}));

app.use('/animals', animalController);
app.use('/users', animalController);

//~~~~~~~~~~~~~~~~~~~~ Main Route ~~~~~~~~~~~~~~~~~~~~//

app.get('/', (req, res, next) => {
  try {
    
    res.send('APP IS RUNNING')
    //****************SET UP SESSION****************//

  } catch (err) {
    console.log(err);
    next(err);
  
  }
})



app.listen(PORT, () => {
  console.log(`server is running on Port ${PORT}...`);
})