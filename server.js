// Loading evnironmental variables here
if (process.env.NODE_ENV !== 'production') {
	console.log('loading dev environments')
	require('dotenv').config()
}
require('dotenv').config()

const express = require("express");
const bodyParser = require('body-parser')
const routes = require ("./routes");
const app = express();
// const mongoose = require('mongoose');
const morgan = require('morgan')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const dbConnection = require('./authentication/db') // loads our connection to the mongo database
const passport = require('./authentication/passport')
const PORT = process.env.PORT || 3001;

// ===== Middleware ====
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(
	session({
		secret: process.env.APP_SECRET || 'this is the default passphrase',
		store: new MongoStore({ mongooseConnection: dbConnection }),
		resave: false,
		saveUninitialized: false
	})
)

// ===== Passport ====
app.use(passport.initialize())
app.use(passport.session()) // will call the deserializeUser


// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
	console.log('Production environment')
}
// Add routes, both API and view
// app.use(routes);
// mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/products');

/* Express app ROUTING */
app.use('/auth', require('./authentication/auth'))


// Use routes
app.use(routes)

// ====== Error handler ====
app.use(function(err, req, res, next) {
	console.log('====== ERROR =======')
	console.error(err.stack)
	res.status(500)
})

// ==== Starting Server =====

app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT + "!");
});

// const express = require("express");
// const routes = require ("./routes");
// const bodyParser = require("body-parser");
// const app = express();
// const mongoose = require('mongoose');
// const PORT = process.env.PORT || 3001;

// // Define middleware here

// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

// // Serve up static assets (usually on heroku)
// if (process.env.NODE_ENV === "production") {
//   app.use(express.static("client/build"));
// }
// // Add routes, both API and view
// app.use(routes);
// mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/products');

// app.listen(PORT, function() {
//   console.log("API " + PORT + "!");
// });
