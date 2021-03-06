// *** Dependencies
var express = require("express");
var bodyParser = require("body-parser");

// Read and set environment variables
require('dotenv').config();

// Sets up the Express App
var app = express();
var PORT = process.env.PORT || 8080;

// Requiring our models for syncing
var db = require("./models");

// Sets up the Express app to handle data parsing

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Static directory
app.use(express.static("public"));

/*app.get('/', (req, res)=>{
  res.send(process.env.ACCOUNT_SID);
  res.send(process.env.AUTH_TOKEN)
}); */

// Routes
require("./routes/api-routes.js")(app);
require("./routes/html-routes.js")(app);
require("./routes/sms-routes.js")(app);

// Syncs sequelize models and then starts the Express app
db.sequelize.sync().then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});