// Require Built In Packages
const path = require("path");

// Require 3rd Party Packages
const express = require("express");
const port = process.env.PORT || 3000;

// Require Own packages
// Give path to file in relation to app.js
const defaultRoutes = require('./routes/default');
const restaurantRoutes = require('./routes/restaurants');

const app = express();

// set method allows us to set certain options for express app
// we want to use an engine to process our view files
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

/////// MIDDLEWARE ////////
// Middleware to host all static files like css & js
// All files in public folder will be available to all users
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

/////// ROUTE HANDLERS ////////////
app.use('/', defaultRoutes);
app.use('/', restaurantRoutes);
// use works as a filter - so all routes having '/' will move to default routes
// this is unlike get and post which look for exact match of url
// all requests will first be moved through defaultRoutes, if no match then code moves down



///////////////////////////////////
///////  HANDLING ERRORS  /////////
///////////////////////////////////

///// HANDLING INVALID ROUTES /////
app.use(function (req, res) {
  // res.render('404'); <= The browser will receive a page and will think, success, so send error code also
  res.status(404).render('404');
});

///// MIDDLEWARE TO HANDLE SERVER SIDE ERRORS //////
// error is automatically geenrated by express
app.use(function (error, req, res, next) {
  res.status(500).render('500');
})

//////// STARTING SERVER ////////
app.listen(port);
console.log("Server started at http://localhost:" + port);
