$.getJSON('/scrape', function(data) {
	console.log(data);
	if (data){
		listArticle();
	}
});

var listArticle = function(){
	$.getJSON("/findArticles", function(data) {
  		for(i=0; i < data.length; i++){
    		addArticle(data[i]);
  		};
	});
};


var addArticle = function(article){
  var articleRow = '<li data-link= ' + article.link + '>' + article.title + '</li>';
  $('.articleList').append(articleRow);
};