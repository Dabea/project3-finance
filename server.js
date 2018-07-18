

const routes = require ("./routes");
var app = require('express')();
var fileUpload = require('express-fileupload');
var mongoose = require('mongoose');
var mongojs = require('mongojs')


//serving routes
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(routes)


// var server = require('http').Server(app);

// app.use(fileUpload());

// Require authors schema
// var db = require('./author')

// var databaseURL = 'models/products';
// var collections = ['products']

// var db = mongojs(databaseURL,collections)

// server.listen(8080);

mongoose.connect('mongodb://localhost/products');

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


var upload = require('./upload.js');
app.post('/', upload.post);

app.listen(8080, function() {
  console.log("API " + 8080 + "!");
});
