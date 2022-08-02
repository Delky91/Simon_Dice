var buttonsColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var level = 0;
var start = false;

//iniciar el juego
$(document).keydown(function (){
    if (!start){
        $("h1").text("Level " + level);
        start = true;
        nextSequence();
    }
})

//boton clickeado y comportamiento del mismo
$(".btn").click(function(){
    if(start){
        var userChosenColour = $(this).attr("id");
        userClickedPattern.push(userChosenColour);
        playSong(userChosenColour);
        animatePress(userChosenColour);
        checkAnswer(userClickedPattern.length - 1);
    }
})

//revisa el input ingresado contra el guardado
function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function(){ 
                nextSequence();
            }, 1000);
        }
    } else{
        playSong("wrong");
        $("body").addClass("game-over");
        $("h1").text("Game Over, Press Any Key to Restart");

        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);
        startOver();
    }
}

//seleciona el color
function nextSequence(){
    userClickedPattern = [];
    level++;
    var randomNumber = Math.floor(Math.random() * 4);
    var chosenNumber = buttonsColors[randomNumber];
    gamePattern.push(chosenNumber);

    $("#" + chosenNumber).fadeIn(100).fadeOut(100).fadeIn(100);
    playSong(chosenNumber);

    
    $("h1").text("Level " + level); 
}

//animaciones botones
function animatePress(currentColour){
    $("#" + currentColour).addClass("pressed");
    setTimeout(function(){
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}


function startOver(){
    level = 0;
    gamePattern = [];
    start = false;
}

// sonidos botones
function playSong(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}
