

const routes = require ("./routes");
var app = require('express')();
var fileUpload = require('express-fileupload');
var mongoose = require('mongoose');
var mongojs = require('mongojs')


//serving routes

app.use(routes)


// var server = require('http').Server(app);

// app.use(fileUpload());

// Require authors schema
// var db = require('./author')

// var databaseURL = 'products';
// var collections = ['products']

// var db = mongojs(databaseURL,collections)

// server.listen(8080);

mongoose.connect('mongodb://localhost/products');

// app.get('/', function (req, res) {
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
  console.log("App running on port " + 8080 + "!");
});
