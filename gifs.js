$(document).ready(function() {

 // Initial array of gifs
 var gifChoices = ["cats", "elephants", "sloths", "pigs", "goats", "pandas", "otters"];
 
// Creates AJAX call for the animal button being clicked
 
 // displayGifs function re-renders the HTML to display the appropriate content
function displayGifs() {
   var gif = $(this).attr("data-name");
   var apikey = "&api_key=XbZX4OQK9xwpKzmheb9b2bF2LQIlZbR8&limit=10";
   var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gif + apikey;
  
// Creates AJAX call for the animal button being clicked
   $.ajax({
     url: queryURL,
     method: "GET"
   }).then(function(response) {
// Creates a div to hold the gif
     var gifDiv = $("<div>");
// Retrieves the rating
    for (var i = 0; i < response.data.length; i++) {
     var rating = response.data[i].rating;
     // Filters by rating
        if (rating === "g" || rating === "pg") {
        // Retrieves the gif sources
            var gifStill = response.data[i].images.downsized_still.url;
            var animate = response.data[i].images.downsized_large.url;
            var still = response.data[i].images.downsized_still.url;
        // Adds a data state
            $("img").attr("data-state", "still"); 
            $("img").addClass("animals");      
        // Appends the gifs
            var displayGifs = $("<img>").attr("src", gifStill);
        // Puts the new gifs above the previous
            gifDiv.append(displayGifs);
            $("#gif-view").prepend(gifDiv);
        // Creates an element to have the rating displayed
            var displayRating = $("<p style='text-transform: uppercase;'>").text(rating);
        // Displays the rating
            gifDiv.append(displayRating);
        };
     };  

     $(".animals").on("click", function() {
        var gif = $(this).attr("data-name");
        var apikey = "&api_key=XbZX4OQK9xwpKzmheb9b2bF2LQIlZbR8&limit=10";
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gif + apikey;
        var state = $(this).attr("data-state");
        // var gifStill = response.data[i].images.downsized_still.url;
        // var gifAnimate = response.data[i].images.downsized_large.url;

        if (state === "still") {
        state = "animate";
        $(this).attr("src", animate);
        $(this).attr("data-state", state);
        }

        else if (state === "animate") {
        state = "still";
        $(this).attr("src", still);
        $(this).attr("data-state", state);
        };
    });
    });
 };

// This function handles events where the add gif button is clicked
$("#add-gif-type").on("click", function(event) {
    event.preventDefault();
 // This line of code will grab the input from the textbox
    var animal = $("#gif-input").val().trim();
 // The animal from the textbox is then added to our array
    gifChoices.push(animal);
 // Calling the function
    renderButtons();
  }); 

// Function for creating buttons
 function renderButtons() {
   $("#buttons-view").empty();
// Loops through the array of animals
   for (var i = 0; i < gifChoices.length; i++) {
// Then dynamicaly generates buttons for each animal
     var a = $("<button>");
// Adds a class to our button
     a.addClass("gif-button");
// Adds a data-attribute
     a.attr("data-name", gifChoices[i]);
// Provides the initial button text
     a.text(gifChoices[i]);
// Adds the button to the buttons-view div
     $("#buttons-view").append(a);
   };
 };

// Adding click event listeners to all elements with a class of "gif"
 $(document).on("click", ".gif-button", displayGifs);

// Calling the renderButtons function to display the intial buttons
 renderButtons();   

});    