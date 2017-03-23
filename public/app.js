//-------Find articles from db and add them to the page -----

//Send a request to the server to get the articles in the db
var listArticle = function(){
	$.getJSON("/scrape", function(data) {
		//we then run through each article
  		for(i=0; i < data.length; i++){
  			//and add it to our html
    		listArticle(data[i]);
  		};
	});
};
//called on page load to make sure the user is getting an updated list
listArticle();

//adds the html to the page for each article
var listArticle = function(article){
  var articleRow = '<li class= "popout" data-link= "' + article.link;
  	  articleRow += '" data-id = "' + article._id + '">';
  	  articleRow += article.title + '</li>';
  $('.articleList').append(articleRow);
};

//--------------------------------------------------------------



//-------- Open and populate the comment section ---------------

//when a user clicks on an article, the link and pop out appears
$('.articleList').on("click", '.popout', function(){
	if ($('.comments').hasClass('hidden')){
		$('.comments').removeClass('hidden');
		$('.comments').addClass('show');
	};
	$('.commentTitle').html($(this)[0].textContent);
	var link = $(this).attr('data-link');
	$('.commentLink').attr('href', link);
	var articleId = $(this).attr('data-id');
	$('.submitButton').attr('data-id', articleId)
	findComment(articleId);
}); 

var findComment	= function(articleId){

	// $.ajax({
 //    	method: "GET",
 //    	url: "/articles/" + articleId
 //  	}).done(function(data) {
 //  		var limit = data.length;
 //  		for(i=0; i<limit; i++){
 //  			listComment(data[i]);
 //  		}
	// });
}

var listComment = function(comment){
	console.log(comment);
	var nextComment = '<li>' + comment.body + '</li>';
  $('.oldComments').append(nextComment);
};

var addComment = function(articleId, commentbody){
	$.ajax({
    method: "POST",
    url: "/articles/" + articleId,
    data: { 
      // Value taken from note textarea
      body: commentbody
    }
  })
};

$('.submitButton').on("click", function(){
	var commentbody = $('.newComment').val();
	var articleId = $(this).attr("data-id");
	addComment(articleId, commentbody);
});

//--------------------------------------------------------------