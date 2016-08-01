
var showRecipe = function(recipes) {
    // clone result template 
    var result = $('.search-results .summary').clone(); 
    // Set the recipe properties in result
    var recipesElem = result.find('.image .rtitle .category .subcategory .rating');
    recipesElem.img(image.photourl);
    recipesElem.text(rtitle.title);
    recipesElem.text(category.category);
    recipesElem.text(subcategory.subcategory);
    recipesElem.text(rating.starrating);

    return result;
}

// Send API request

function getRecipes(getresults) {
    var input = $('#submit').val();
    var apiKey = "08R1BCvJ6Ps0eMeMy969GZ19AYiYJXx1";
    var url = "http://api2.bigoven.com/recipe/" + PhotoUrl + Title + Category + SubCategory + StarRating + "?api_key="+apiKey;
    
    $.ajax({
        type: "GET",
        dataType: 'json',
        cache: false,
        url: url,
        success: function (data) {
            alert('success');
        }
    })
    .done(function(result){ 
        var searchResults = showRecipe(input, url);

        $('.search-results').html(searchResults);
        
        $.each(result.items, function(i, item) {
            var ritems = showRecipe(item);
            $('.results').append(ritems);
        });
    })
};

var showSearchResults = function(query, rresult) {
    var results = rresult + ' results for <strong>' + query + '</strong>';
    return results;
};

// Show results from API request

function showRecipes(results) {
    var input = results.items;

    $.each(input, function (index, value) {
        var image = value.PhotoUrl
        var title = value.Title
        var category = value.Category
        var subCategory = value.SubCategory
        var starRating = value.StarRating
        results += '<img src="' + image + '">';
        results += '<p>' + title + '</p>';
        results += '<p>' + category + '</p>';
        results += '<p>' + subcategory + '</p>';
        results += '<p>' + starRating + '</p>';

    }); 
    
    return results;
}

$('#submit').submit( function(e){
    e.preventDefault();
    $('.search-results').html('');
    var getresults = $(this).find("input[name='getresults']").val();
    getRecipes(getresults);
});

