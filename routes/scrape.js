var cheerio = require('cheerio');
var request = require('request');

var Article = require("../models/Article.js");

module.exports = function(app) {

	//on page load, we call scrape to see if there are any new entries.
	app.get('/scrape', function(req, res){

		//save the current database titles to check against any new files
		var currentStorage = [];

	  	//find all articles on our db and store them
	 	Article.find({}, function(error, data){
	    	if (error) {
	      		console.log(error)
	    	}
	    	else {
	    		//loop through each article and store the title in an array
	    		for (i=0; i < data.length; i++){
	    			currentStorage.push(data[i].title);
	    		}
	    		//log our current articles
	    		console.log('Returned current articles');
	    	}
	  	});


		//Scrape NPR for all current articles
		request("http://www.npr.org/sections/us/", function(error, response, html) {
			var $ = cheerio.load(html);

			//hit the .title class on npr
			$('.title').each(function(i, element){

				//this will hold info on the current .title class
				var items = {};
				//this tells our server to add it to the db, we'll switch this to false for duplicates
				var add = true;

				//pulls the title
				items.title = $(this).children('a').text();
				//and the link source
				items.link = $(this).children('a').attr('href');

				//create a new log with the Article constructor
				var log = new Article(items);

				//loop through our current articles, make sure we don't have this title already
				for (i=0; i< currentStorage.length; i++){
					//if the title is a duplicate,
					if (currentStorage[i] === items.title){
						//we don't want to add it
						add = false;
						//and don't need to keep checking, so we break the loop
						break;
					};
				};

				//if the title was not a duplicate, we upload it to our db
				if (add){
					log.save(function(err, doc){
						if (err) {
							console.log(err);
						} else {
							console.log('Added new entries.');
						};
					});
				};
			});
			console.log('Scrape complete');

			//return the current db list
			setTimeout(function(){
				Article.find({}).sort({'_id':-1}).exec(function(error, data){
					if(error){
						res.send(error);
					} else {
						res.send(data);
					};
				});
			}, 0);
		});
	});
};