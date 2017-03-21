//this checks to see if there is data in the database
//it should always at least have some data, so I'm commenting out this function
// $.getJSON('/scrape', function(data) {
// 	if (data){
// 		listArticle();
// 	}
// });

//Send a request to the server to get the articles in the db
var listArticle = function(){
	$.getJSON("/scrape", function(data) {
		//we then run through each article
  		for(i=0; i < data.length; i++){
  			//and add it to our html
    		addArticle(data[i]);
  		};
	});
};
//called on page load to make sure the user is getting an updated list
listArticle();

//adds the html to the page for each article
var addArticle = function(article){
  var articleRow = '<li class= "popout" data-link= ' + article.link + '>' + article.title + '</li>';
  $('.articleList').append(articleRow);
};

//when a user clicks on an article, the link and pop out appears
$('.articleList').on("click", '.popout', function(){
	if ($('.comments').hasClass('hidden')){
		$('.comments').removeClass('hidden');
		$('.comments').addClass('show');
	};
	$('.commentTitle').html($(this)[0].textContent);
	//$('.commentLink').src($(this)[0])
	var link = $(this);
	console.log(link)
	addComment();
});

var addComment = function(){
	// $.getJSON("/findArticle:id", function(data) {

	// });
};