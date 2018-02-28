$(document).ready(function () {
    
    // Global Variables

    var emotionGifs = ["Happy", "Sad", "Hungover", "Tired", "LET'S GO!", "Excited", "Stoked" , "Sick", "Winning", "Frustrated"];

    var myAPI = "iiHxX5ZyrJst3sHz4lwHPzpO14Eot1nx";

    var stillURL;
    var gifURL;
    var apiResponse;
    // var newItem = $("#emotionInput").val().trim();
    var newItem;

    // Working API URLs
    // https://api.giphy.com/v1/gifs/search?api_key=iiHxX5ZyrJst3sHz4lwHPzpO14Eot1nx&q=happy&limit=10&offset=0&&lang=en 

    // var searchTerm;
    // var apiURLBase = "https://api.giphy.com/v1/gifs/search?api_key=iiHxX5ZyrJst3sHz4lwHPzpO14Eot1nx&q=random&limit=10&offset=0&&lang=en";

    // Loops through the emotionGifs array and creates buttons
   function buttonPrint() {
       
        $("#emotionButtons").empty();
   
        console.log(emotionGifs);
        
        for (var i =0; i < emotionGifs.length; i++) {
            var newEmotionButton = $("<button>" + emotionGifs[i] + "</button>");
            newEmotionButton.attr("id", "button_" + emotionGifs[i]);
            newEmotionButton.attr("data-value", emotionGifs[i]);
            $("#emotionButtons").append(newEmotionButton)
            console.log(newEmotionButton.attr("data-value", emotionGifs[i]));
            console.log(newEmotionButton);
        }

    }

    // Creates buttons that link to the api 

    buttonPrint();

    // When submit button is pressed
    $("#addEmotion").on("click", function(){
        newItem = $("#emotionInput").val().trim();
        if (emotionGifs.includes(newItem)!== true) {
           emotionGifs.push(newItem);
            console.log(emotionGifs);
            buttonPrint(); 
        } else {
            alert("You already have a button for that!");
        }
        $("#emotionInput").val("");

    });

    // $("#removeEmotion").on("click", function () {
        
    //     if (emotionGifs.includes(newItem)) {
    //         var newItemIndex = emotionGifs.indexOf(newItem);
    //         if (newItemIndex > -1) {
    //             emotionGifs.splice(newItemIndex, 1);
    //         }
    //         console.log(emotionGifs);
    //         buttonPrint();
    //     } else {
    //         alert("You don't have a button for that!");
    //     }

    // });
    

    //when emotion button is pressed

    $("#emotionButtons").on("click", "button", function(){

        $("#gifPanel").empty();

        var searchTerm = $(this).attr("data-value");
        
        var apiURLBase = "https://api.giphy.com/v1/gifs/search?api_key=iiHxX5ZyrJst3sHz4lwHPzpO14Eot1nx&q=" + searchTerm + "&limit=10&offset=0&&lang=en";


        // AJAX Call
        console.log(this);
        
        console.log(searchTerm);
        console.log(apiURLBase);
        

        $.ajax({
            url:apiURLBase,
            method: "GET"
        }) .then(function(response){

            apiResponse = response;

            console.log(apiURLBase);
            console.log(response);
            console.log(apiResponse);
            



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
                
                console.log(this);
                console.log(imageFlag);
                console.log($(this).attr("src"));
                 
            });
  

});

