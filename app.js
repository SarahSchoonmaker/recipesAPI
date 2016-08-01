
var showRecipe = function(recipes) {
    // clone result template 
    var result = $('.search-results .summary').clone(); 
    // Set the recipe properties in result
    var image = result.find('.image');
    recipesElem.img(image.photourl);

    var title = result.find('.rtitle')
    recipesElem.text(rtitle.title);

    var category = result.find('.category')
    recipesElem.text(category.category);

    var subcategory = result.find('.subcategory')
    recipesElem.text(subcategory.subcategory);

    var rating = result.find('.rating')
    recipesElem.text(rating.starrating);

    return result;
}

// Send API request

function getRecipes(getresults) {
    var request = {
    submit: getresults
    };
    var apiKey = "08R1BCvJ6Ps0eMeMy969GZ19AYiYJXx1";
    var url = "http://api2.bigoven.com/recipe/" + PhotoUrl + Title + Category + SubCategory + StarRating + "?api_key="+apiKey;
    $.ajax({
        type: "GET",
        data: request,
        dataType: 'json',
        cache: false,
        url: url,
        success: function (data) {
            alert('success');
        }
    })
    .done(function(result){ 
        var searchResults = showRecipe(request.submit, result.items.length);

        $('.search-results').html(searchResults);
        
        $.each(result.items, function(i, item) {
            var ritems = showRecipe(item);
            $('.summary').append(ritems);
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

