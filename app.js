$(function(){
    $('#submit').submit(function (event) {
        event.preventDefault();
        getRecipes(search);
        $('#previous').css("display", "inline");
        $('#next').css("display", "inline");
    });
});

function getRecipes(search) {
    var apiKey = "08R1BCvJ6Ps0eMeMy969GZ19AYiYJXx1";
    var TitleKeyword = "lasagna";
    var url = "http://api2.bigoven.com/Recipes?pg=1&rpp=25&title_kw="
      + TitleKeyword 
      + "&api_key="+apiKey;
    $.ajax({
        type: "GET",
        dataType: 'json',
        cache: false,
        url: url,
        success: function (data) {
        alert('success');
        //console.log(data);
        }
    });
}

function showRecipes(results) {
        var results = "";
        var input = results.items;

  $.each(input, function (index, value) {
        var title = value.
        var thumbnail = value.
        results += '<p>' + title + '</p>';
        results += '<img src="' + thumbnail + '">';

      
    }); 
    
    $('#search-results').html(results);

  
  }

