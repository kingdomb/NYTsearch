
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

      // Confirm that the specific JSON for the article isn't missing any details
      // If the article has a headline include the headline in the HTML
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
