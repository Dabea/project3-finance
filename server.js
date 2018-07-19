const express = require("express");
const routes = require ("./routes");
const bodyParser = require("body-parser");
const app = express();
// var fileUpload = require('express-fileupload');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 3001;

// Define middleware here
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



//serving routes
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
// Add routes, both API and view
app.use(routes);


// var server = require('http').Server(app);

// app.use(fileUpload());

// Require authors schema
// var db = require('./author')

// var databaseURL = 'models/products';
// var collections = ['products']

// var db = mongojs(databaseURL,collections)

// server.listen(8080);

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/products');

// app.get('/upload', function (req, res) {
//   res.sendFile(__dirname + '/index.html');
// });

// app.get('/example', function(req,res){
//   // Query: In our database, go to the transaction collection, then "find" everything,
//   db.products.find({}, function(error, found) {
//     // Log any errors if the server encounters one
//     if (error) {
//       console.log(error);
//     }
//     // Otherwise, send the result of this query to the browser
//     else {
//       res.json(found);
//     }
//   });

// });


// var upload = require('./upload.js');
// app.post('/', upload.post);

app.listen(PORT, function() {
  console.log("API " + PORT + "!");
});
