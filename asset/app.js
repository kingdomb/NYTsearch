<<<<<<< HEAD
$("button").on("click", function() {
    var animal = $(this).attr("data-animal");
    var queryURL = "https://newsapi.org/v2/everything?q=bitcoin&apiKey=a357e4dc6ed94eccab93584c834596db" +
      animal + "&api_key=dc6zaTOxFJmzC&limit=10";

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      // Step 1: Run this file, click a button, and see what the response object looks like in the browser's console.
      // Open up the data key, then open up the 0th, element. Study the keys and how the JSON is structured.

      console.log(response);

      // Step 2: since the image information is inside of the data key,
      // make a variable named results and set it equal to response.data

      // =============== put step 2 in between these dashes ==================

      // ========================

      // for (var i = 0; i < results.length; i++) {

      // Step 3: uncomment the for loop above and the closing curly bracket below.
      // Make a div with jQuery and store it in a variable named animalDiv.
      // Make a paragraph tag with jQuery and store it in a variable named p.
      // Set the inner text of the paragraph to the rating of the image in results[i].
      // Make an image tag with jQuery and store it in a variable named animalImage.
      // Set the image's src to results[i]'s fixed_height.url.
      // Append the p variable to the animalDiv variable.
      // Append the animalImage variable to the animalDiv variable.
      // Prepend the animalDiv variable to the element with an id of gifs-appear-here.

      // ============= put step 3 in between these dashes ======================

      // ==================================
      // }

    });
  });
=======
var authKey = "047188d5d9414650937e0da9619698e5";

var searchTerm = "";
var numResults = 0;
var startYear = 0;
var endYear = 0;

var queryURLBase = "" +
  authKey + "&q=";

var articleCounter = 0;

function runQuery(numArticles, queryURL) {

  $.ajax({
    url: queryURL,
    method: "GET"
  }).done(function(NYTData) {

    console.log("------------------------------------");
    console.log("URL: " + queryURL);
    console.log("------------------------------------");

    console.log(NYTData);
    console.log("------------------------------------");

    for (var i = 0; i < numArticles; i++) {

      articleCounter++;

      var wellSection = $("<div>");
      wellSection.addClass("well");
      wellSection.attr("id", "article-well-" + articleCounter);
      $("#well-section").append(wellSection);

      if (NYTData.response.docs[i].headline !== "null") {
        $("#article-well-" + articleCounter)
          .append(
            "<h3 class='articleHeadline'><span class='label label-primary'>" +
            articleCounter + "</span><strong> " +
            NYTData.response.docs[i].headline.main + "</strong></h3>"
          );

        console.log(NYTData.response.docs[i].headline.main);
      }

      if (NYTData.response.docs[i].byline && NYTData.response.docs[i].byline.original) {
        $("#article-well-" + articleCounter)
          .append("<h5>" + NYTData.response.docs[i].byline.original + "</h5>");

        console.log(NYTData.response.docs[i].byline.original);
      }

      $("#articleWell-" + articleCounter)
        .append("<h5>Section: " + NYTData.response.docs[i].section_name + "</h5>");
      $("#articleWell-" + articleCounter)
        .append("<h5>" + NYTData.response.docs[i].pub_date + "</h5>");
      $("#articleWell-" + articleCounter)
        .append(
          "<a href='" + NYTData.response.docs[i].web_url + "'>" +
          NYTData.response.docs[i].web_url + "</a>"
        );

      console.log(NYTData.response.docs[i].pub_date);
      console.log(NYTData.response.docs[i].section_name);
      console.log(NYTData.response.docs[i].web_url);
    }
  });

}

$("#run-search").on("click", function(event) {
  event.preventDefault();
  articleCounter = 0;

  $("#well-section").empty();

  searchTerm = $("#search-term").val().trim();
  var queryURL = queryURLBase + searchTerm;

  numResults = $("#num-records-select").val();

  startYear = $("#start-year").val().trim();

  endYear = $("#end-year").val().trim();

  if (parseInt(startYear)) {
    queryURL = queryURL + "&begin_date=" + startYear + "0101";
  }

  if (parseInt(endYear)) {
    queryURL = queryURL + "&end_date=" + endYear + "0101";
  }

  runQuery(numResults, queryURL);
});

$("#clear-all").on("click", function() {
  articleCounter = 0;
  $("#well-section").empty();
});
>>>>>>> 3e7d7443fe9769852b318d9c635b99a414ababf9
