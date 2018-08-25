// require express and other modules
const express = require('express');
const app = express();

// parse incoming urlencoded form data
// and populate the req.body object
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

// allow cross origin requests (optional)
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

/************
 * DATABASE *
 ************/

const db = require('./models');

/**********
 * ROUTES *
 **********/

// Serve static files from the `/public` directory:
// i.e. `/images`, `/scripts`, `/styles`
app.use(express.static('public'));

/*
 * HTML Endpoints
 */

app.get('/', function homepage(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


/*
 * JSON API Endpoints
 */

app.get('/api', (req, res) => {
  // TODO: Document all your api endpoints below as a simple hardcoded JSON object.
  // It would be seriously overkill to save any of this to your database.
  // But you should change almost every line of this response.
  res.json({
    message: "Welcome to my personal API! Here's what you need to know!",
    documentationUrl: "https://github.com/natalie-poulson/personal-api", 
    baseUrl: "https://hidden-falls-48101.herokuapp.com/", 
    endpoints: [
      {method: "GET", path: "/api", description: "Describes all available endpoints"},
      {method: "GET", path: "/api/profile", description: "A little about me"},
      {method: "GET", path: "/api/legacy", description: "View all SF Legacy bars and restaurants"}, 
      {method: "GET", path: "/api/legacy/:id", description: "View a specific SF Legacy bar or restaurant by id"}, 
      {method: "POST", path: "/api/legacy", description: "Create a new SF Legacy bar or restaurant"},
      {method: "PUT", path: "/api/legacy/:id", description: "Update a SF Legacy bar or restaurant"}, 
      {method: "DELETE", path: "/api/legacy/:id", description: "Delete a specific SF Legacy bar or restaurant by id"} 
    ]
  })
});


app.get('/api/profile', (req, res) => {
  res.json({
    name: "Natalie Poulson",
    githubUsername: "natalie-poulson", 
    githubLink: "https://github.com/natalie-poulson",
    personalSiteLink: "https://natalie-poulson.github.io/",
    currentCity: "Oakland, California",
    siblings: [
      {name: "Tom" , relationship: "brother"},
      {name: "Doug" , relationship: "brother"},
      {name: "Katie" , relationship: "sister-in-law"}
    ]
  })
});

//get all legacys request
app.get('/api/legacy', (req, res) => {
  //find all legacys in db
  db.Legacy.find( {}, (err, allLegacies) => {
    //if err, send err
    if(err){console.log(err)};
    //else, respond with a json object of all the legacies
    // console.log(allLegacies);
    res.json({data: allLegacies});
    });
  });


  //get a specific legacy by id
  app.get('/api/legacy/:id' , (req, res) => {
    //get id from url parameters
    let legacyId = req.params.id;
  //find legacy in db by id
    db.Legacy.findById( legacyId , (err, foundLegacy) => {
      if(err) { return console.log(err) };
      res.json(foundLegacy);
    });
  });

  //create a new legacy
  app.post('/api/legacy' , (req,res) => {
    //grab what the user entered in the body
    console.log(req.body);
    let newLegacy = req.body;
    //take the req body and create a new legacy in the db
    db.Legacy.create( newLegacy, (err,savedLegacy) => {
      if(err) {return console.log(err)};
      res.json(savedLegacy);
    });
  });

  //update a legacy
  app.put('/api/legacy/:id', (req,res) => {
    //get legacy by id from url params
    let legacyId = req.params.id;
    //get updated body from req.body
    let updatedBody = req.body;

    //find and update the legacy's attributes
    db.Legacy.findOneAndUpdate(
      {_id:legacyId}, //search condition
      updatedBody, // new content to update
      {new:true}, // we want to receive the new object
      (err, updatedLegacy) => { //callback
        if(err) {return console.log(err)};
        res.json(updatedLegacy);
      });
  });

  //delete a legacy
  app.delete('/api/legacy/:id', (req,res) => {
    //get the legacy id from the url params
    let legacyId = req.params.id;

    // fin the legacy by id and delete it
    db.Legacy.deleteOne(
      {_id:legacyId},
      (err, deletedId) => {
        if(err) {return console.log(err)};
        res.json(deletedId);
      });
  });

/**********
 * SERVER *
 **********/

// listen on the port that Heroku prescribes (process.env.PORT) OR port 3000
app.listen(process.env.PORT || 3000, () => {
  console.log('Express server is up and running on http://localhost:3000/');
});
