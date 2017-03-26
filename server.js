var express = require('express');
var path = require('path');
var bodyParser = require("body-parser");
var request = require("request");
var cheerio = require('cheerio');
var mongoose = require('mongoose');

var app = express();

app.use(express.static("public"));

mongoose.connect("mongodb://heroku_kkh20g2g:heroku_kkh20g2g@ds141950.mlab.com:41950/heroku_kkh20g2g");
var db = mongoose.connection;

app.use(bodyParser.urlencoded({
  extended: false
}));

var Comment = require("./models/Comment.js");
var Article = require("./models/Article.js");


require('./routes/scrape.js')(app);
require('./routes/html.js')(app);
require('./routes/api.js')(app);



app.listen(3000, function(){
	console.log('Running on port 3000');
});