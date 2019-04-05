var search;

// click search button
$("#search-button").on("click", function(event) {
  event.preventDefault();

  // grab search term and store in variable search
  search = $("#search-input").val();

  if (search === "") {
    return false;
  };

  // create queryURL
  var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + search + "&api-key=Gz0Pu2OAu38AROOprwfMS99YurNcnC7F"

  console.log(queryURL)
  
  // ajax call for articles based on search term
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(articles) {

    var $articles = articles.response.docs;

    for (var i = 0; i < $articles.length; i++) {
      $articleInfo = $("<div>").addClass("article");

      // grab headline
      var $headline = $("<h4>").text((i + 1) + ") " + $articles[i].headline.main);
      
      // grab first name and last name, concatinate to make full name
      var $firstName = $articles[i].byline.person[0].firstname;
      var $lastName = $articles[i].byline.person[0].lastname;
      
      var $fullName = $("<h5>").text(`By: ${$firstName} ${$lastName}`)

      // grab section_name
      console.log($articles.section_name)
      var $section = $("<p>").text(`Section: ${$articles[i].section_name}`);

      // grab date of publication
      var $date = $("<p>").text($articles[i].pub_date);

      // grab weburl
      var $url = $("<a>").attr("href", $articles[i].web_url).text($articles[i].web_url)
      
      // append each piece of info to $articleInfo
      $articleInfo.append($headline, $fullName, $section, $date, $url)

      // append $articleInfo to #top-articles on page
      $("#top-articles").append($articleInfo)
    };

  });

});

$("#clear-button").on("click", function(event) {
  event.preventDefault();

  $("#top-articles").empty();
  search = "";

  $("#search-input").val("");

})


