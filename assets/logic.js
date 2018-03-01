$(document).ready(function () {

    // Global Variables

    var emotionGifs = ["Happy", "Sad", "Hungover", "Tired", "LET'S GO!", "Excited", "Stoked" , "Sick", "Winning", "Frustrated"];

    var myAPI = "iiHxX5ZyrJst3sHz4lwHPzpO14Eot1nx";

    var stillURL;
    var gifURL;
    var apiResponse;
    // var newItem = $("#emotionInput").val().trim();
    var newItem;

    // Loops through the emotionGifs array and creates buttons
   function buttonPrint() {
       
        $("#emotionButtons").empty();
   
        for (var i =0; i < emotionGifs.length; i++) {
            var newEmotionButton = $("<button>" + emotionGifs[i] + "</button>");
            newEmotionButton.attr("id", "button_" + emotionGifs[i]);
            newEmotionButton.attr("data-value", emotionGifs[i]);
            $("#emotionButtons").append(newEmotionButton)
        }

    }

    // Creates buttons that link to the api 

    buttonPrint();

    // When submit button is pressed
    $("#addEmotion").on("click", function(){
        // event.preventDefault();  <------- make sure if you add this back in to put "event" into the function parameters above
        newItem = $("#emotionInput").val().trim();
        if (newItem.length === 0) {
            alert("Type a work in the textbox to add a button.");
        }
        else if (emotionGifs.includes(newItem)!== true) {
           emotionGifs.push(newItem);
            buttonPrint(); 
        } else {
            alert("You already have a button for that!");
        }
        $("#emotionInput").val("");

    });  

    //when emotion button is pressed

    $("#emotionButtons").on("click", "button", function(){
        
        $("#gifPanel").empty();

        var searchTerm = $(this).attr("data-value");
        
        var apiURLBase = "https://api.giphy.com/v1/gifs/search?api_key=iiHxX5ZyrJst3sHz4lwHPzpO14Eot1nx&q=" + searchTerm + "&limit=10&offset=0&&lang=en";


        // AJAX Call       

        $.ajax({
            url:apiURLBase,
            method: "GET"
        }) .then(function(response){

            apiResponse = response;

            for (var i = 0; i<apiResponse.data.length; i++) {
                
                stillURL = response.data[i].images.fixed_width_still.url;
                gifURL = response.data[i].images.fixed_width.url;

                var imageDiv = $("<div>");
                imageDiv.addClass("image-box");

                var gifImage = $("<img>");
                gifImage.attr("src", apiResponse.data[i].images.fixed_width_still.url);
                gifImage.attr("data-image_type", "still");
                gifImage.attr("data-image_number", i);
                gifImage.addClass("still");

                $(imageDiv).append("<p> GIF Parental Rating: " + apiResponse.data[i].rating + "</p>")
                $(imageDiv).append(gifImage);
                $("#gifPanel").append(imageDiv);
            }

        });

    });

 $("body").on("click", "img", function(){

                var imageFlag = $(this).attr("data-image_type");
                var imageNumber = $(this).attr("data-image_number");
                

                if (imageFlag === "still") {
                    $(this).attr("src", apiResponse.data[imageNumber].images.fixed_width.url);
                    $(this).attr("data-image_type", "gif");
                } else {
                    $(this).attr("src", apiResponse.data[imageNumber].images.fixed_width_still.url);
                    $(this).attr("data-image_type", "still");
                } 
                 
            });

});

