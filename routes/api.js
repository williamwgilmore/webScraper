var Comment = require("../models/Comment.js");
var Article = require("../models/Article.js");

module.exports = function(app) {

	app.get('/findArticles', function(req, res){

		Article.find({}, function(error, data){
			if(error){
				res.send(error);
			} else {
				res.send(data);
			}
		})
	});

};