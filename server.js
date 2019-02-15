
//~~~~~~~~~~~~~~~~~~~~ REQUIRES ~~~~~~~~~~~~~~~~~~~~//
require('dotenv').config();
require('./db/db.js');
const PORT                  = process.env.PORT || 9000;
const express               = require('express');
const app                   = express();
const session               = require('express-session');
const bodyParser            = require('body-parser');
const cors                  = require('cors');
const propertyController    = require('./controllers/properties.js');
const userController        = require('./controllers/users.js');
const submissionController  = require('./controllers/submissions.js');

//~~~~~~~~~~~~~~~~~~~~ MIDDLEWARE ~~~~~~~~~~~~~~~~~~~~//

const corsOptions = {
  origin: process.env.CORSPATH,
  credentials: true, 
  optionsSuccessStatus: 200 
}
app.use(cors(corsOptions));
app.use(session({
  secret: process.env.SESSION_SECRET, 
  resave: false, 
  saveUninitialized: false
}));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


app.use('/api/v1/properties', propertyController);
app.use('/api/v1/submissions', submissionController);
app.use('/api/v1/users', userController);

//~~~~~~~~~~~~~~~~~~~~ Main Route ~~~~~~~~~~~~~~~~~~~~//

app.get('/', (req, res, next) => {
  try {
    
    res.send('SERVER IS RUNNING')
    //****************SET UP SESSION****************//

  } catch (err) {
    console.log(err);
    next(err);
  
  }
})



app.listen(PORT, () => {
  console.log(`server is running on Port ${PORT}...`);
})