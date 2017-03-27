var express = require('express');
var path = require('path');
var bodyParser = require("body-parser");
var request = require("request");
var cheerio = require('cheerio');
var mongoose = require('mongoose');

var app = express();

app.use(express.static("public"));

mongoose.connect("mongodb://admin:passcode@ds141950.mlab.com:41950/heroku_kkh20g2g");
var db = mongoose.connection;

app.use(bodyParser.urlencoded({
  extended: false
}));

var Comment = require("./models/Comment.js");
var Article = require("./models/Article.js");


require('./routes/scrape.js')(app);
require('./routes/html.js')(app);
require('./routes/api.js')(app);


app.set( 'port', ( process.env.PORT || 5000 ));

// Start node server
app.listen( app.get( 'port' ), function() {
  console.log( 'Node server is running on port ' + app.get( 'port' ));
  });