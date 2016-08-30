var userInput

var showRecipe = function(recipe) {
    // clone result template 
    var result = $('.templates .recipe-summary').clone(); 
    result.attr("data-id", recipe.RecipeID);
    // Set the recipe properties in result
    var photo = result.find('.photo');
    photo.attr("src", recipe.PhotoUrl);

    var title = result.find('.rtitle')
    title.text(recipe.Title);

    var category = result.find('.category')
    
    if (recipe.Category==='') {
        category.text("Not Listed");
    } else {
      category.text(recipe.Category);
  }

  var subcategory = result.find('.subcategory')
  if (recipe.Subcategory==='') {
    subcategory.text("Not Listed");
} else {
  subcategory.text(recipe.Subcategory);
}

var rating = result.find('.rating')
rating.text(recipe.StarRating.toFixed(2));

return result;
}

function showDetails(details, detailElement){
    detailElement.find('.instructions').text(details.Instructions)
    for(var i=0; i < details.Ingredients.length; i++) {
        detailElement.find('.ingredients').append("<li> " + " " + details.Ingredients[i].MetricDisplayQuantity + " " + details.Ingredients[i].MetricUnit + " " + details.Ingredients[i].Name + " </li>")
    }
}


// Send API request
var currentPage = 1;
function getRecipes(foodTerm, page) {
    var apiKey = "08R1BCvJ6Ps0eMeMy969GZ19AYiYJXx1";
    var request = {
        any_kw: foodTerm,
        is_private: false,
        pg: page,
        rpp: 10,
        api_key: apiKey

    any_kw: foodTerm,
    is_private: false,
    pg: page,
    rpp: 10,
    api_key: apiKey

    };
    var url = "https://api2.bigoven.com/recipes";
    $.ajax({
        type: "GET",
        data: request,
        dataType: 'json',
        cache: false,
        url: url,
    })
    .done(function(recipes){

        $('.loading').hide();
        if(recipes.Results.length==0) {
            $('.recipe-error').text("No recipe results")
        }else {
            for(var i=0; i < recipes.Results.length; i++) {
                var recipeHtml = showRecipe(recipes.Results[i]);
                $('.recipe-list').append(recipeHtml)
            }
            console.log(recipes);
            if (recipes.ResultCount/10 <= page) {
                $('#next').hide();  
            }
            else {
                $('#next').show(); 
            }

        $('.loading').hide();  
        for(var i=0; i < recipes.Results.length; i++) {
            var recipeHtml = showRecipe(recipes.Results[i]);
            $('.recipe-list').append(recipeHtml)
        }
        console.log(recipes);
        if (recipes.ResultCount/10 <= page) {
        $('#next').hide();  
        }
        else {
        $('#next').show(); 

        }
    }
};

function getInstructions(recipeID, detailElement) {

    var request = {

       api_key: "08R1BCvJ6Ps0eMeMy969GZ19AYiYJXx1"
   }
   var url = "https://api2.bigoven.com/recipe/" + recipeID;
   $.ajax({
    type: "GET",
    data: request,
    dataType: 'json',
    cache: true,
    url: url
})
   .done(function(recipeDetails) {
    detailElement.find('.load-ingredients').hide();
    detailElement.find('.detail-wrap').show();
    showDetails(recipeDetails, detailElement);
    console.log(recipeDetails);
})
   .fail(function(a) {
    detailElement.find('.load-ingredients').hide();
    detailElement.find('.error').text(a.responseJSON.Message);

});

     
    }
    var url = "https://api2.bigoven.com/recipe/" + recipeID;
    $.ajax({
        type: "GET",
        data: request,
        dataType: 'json',
        cache: true,
        url: url
    })
    .done(function(recipeDetails) {
        detailElement.find('.load-ingredients').hide();
        detailElement.find('.detail-wrap').show();
        showDetails(recipeDetails, detailElement);
        console.log(recipeDetails);
    })
    .fail(function(a) {
        detailElement.find('.load-ingredients').hide();
        detailElement.find('.error').text(a.responseJSON.Message);
    });

}

$('#search').submit(function(e){
    e.preventDefault();
    $('.loading').show();
    $('#next').hide();
    $('.recipe-list').html('')
    userInput = $(this).find("input[name='food']").val();
    getRecipes(userInput, currentPage);
    $('.search-results').show();
    $('#query').val('');
    
});


// The on function allows us to assign events to elements that
// are not yet on the page. Add on function to parent and the click
// function to the child element. 

$('.search-results').on("click", ".instructions-link", function (event){
    event.preventDefault();
    var parent = $(this).parent().parent().parent()
    parent.find(".details").toggleClass("hidden");
    var id = parent.attr("data-id");
    getInstructions(id,parent.find(".details"));
})

$('#next').click(function(event) {
    event.preventDefault();
    getRecipes(userInput,++currentPage)
})

