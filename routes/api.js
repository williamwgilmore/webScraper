var Comment = require("../models/Comment.js");
var Article = require("../models/Article.js");

module.exports = function(app) {
	app.get("/articles/:id", function(req, res) {
		console.log(req.body);

  		Article.find({'_id': req.params.id}).populate('comments').exec(function(error, data) {
      		if (error) {
        		res.send(error);
      		} else {
        		res.send(data);
        		console.log(data)
      		}
  		});
	});

	app.post("/articles/:id", function(req, res) {
		console.log(req.body);
 		// Create a new note and pass the req.body to the entry
  		var newComment = new Comment(req.body);

 		 // And save the new note the db
  		newComment.save(function(error, doc) {
    		// Log any errors
    		if (error) {
      			console.log(error);
    		} else {
      			// Use the article id to find and update it's note
      			Article.findOneAndUpdate({ "_id": req.params.id }, { "note": doc._id })
      			// Execute the above query
      			.exec(function(err, doc) {
        			// Log any errors
        			if (err) {
          				console.log(err);
        			} else {
          			// Or send the document to the browser
          			res.send(doc);
        			}
      			});
    		}
  		});
	});
};