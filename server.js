const express = require("express");
const routes = require ("./routes");
const bodyParser = require("body-parser");
const app = express();
const mongoose = require('mongoose');
const PORT = process.env.PORT || 3001;

// Define middleware here

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
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
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/products');

app.listen(PORT, function() {
  console.log("API " + PORT + "!");
});
