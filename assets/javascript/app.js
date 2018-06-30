//setting array to draw food items from
var foods = ["TACOS", "HAMBURGER", "CHEESE", "PIZZA"];

//function that creates and renders buttons
function renderButtons () {
    
    $("#foodButt").empty();
    //loops through the array to append buttons 
    for (var i = 0; i < foods.length; i++){
        //creates said button and adds class, data-name attribute, and the text thereof
        var a = $("<button>");
        a.addClass ("foodType");
        a.attr("data-name", foods[i]);
        a.text(foods[i]);
        $("#foodButt").append(a); //does the actual appending 
    }
}


function displayInfo (){
    var foodData = $(this).attr("data-name"); //pulls the attribute name onClick event 
    console.log(foodData);//test debug

        // Constructing a URL to search Giphy for the name of the person who said the quote
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + foodData + "&api_key=TH4zT9tVAOgWiAd85OJNUkA07q38Hfy4&limit=10";
        $('#foods').empty();
    
    $.ajax({
        url: queryURL,
        method: "GET"
     }).then(function (response){
         console.log(response);
         var gifDiv = $("<div>");
         gifDiv.append(foodData);
         var data = response.data;
         var newGifDiv =$('<div>');
         newGifDiv.append(data);
         gifDiv.append(newGifDiv);

         for (var i = 0; i < data.length; i++) {

            var imgURL = response.data[i].images.downsized_still.url;
      
            var imgURL2 = response.data[i].images.downsized.url;
      
            var img = $("<img>").attr("src", imgURL);
            img.addClass("gify");
            img.attr("data-state", "still");
            img.attr("data-still", imgURL);
            img.attr("data-animate", imgURL2);
      
      
      
            var rating = response.data[i].rating;
      
            var myElem = $("<h3>");
            myElem.append(rating);
            img.append(myElem);
            gifDiv.append(myElem, img);
         }

         $("#foods").append(gifDiv);
        })
}

$("#addFood").on("click", function(event){
    event.preventDefault();
    var food = $("#foodInput").val().trim();
    foods.push(food);
    renderButtons();
});


$(document).on("click", ".gify", function () {
    event.preventDefault();
    if ($(this).attr("data-state") === "still") {
      $(this).attr("data-state", "animate");
      $(this).attr("src", $(this).attr("data-animate"));
    } else {
      $(this).attr("data-state", "still");
      $(this).attr("src", $(this).attr("data-still"));
    };
});
  
$(document).on('click', ".foodType", displayInfo);
  
renderButtons();

