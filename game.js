
var buttonColours = ["red","blue","green","yellow"];

var gamePattern = [];

var userClickedPattern = [];

var started = false;

var level = 0;

$(document).keypress(function() { // $(document).one("keypress", function)
  if (!started){
    $("#level-title").text("Level "+ level);
    nextSequence();
    started = true;
  }
});

$(".btn").on("click", function() {

  var userChosenColour = $(this).attr("id"); //this.id;
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1); // level-1
});

function checkAnswer(currentLevel) {

  if(gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

    console.log("Success");

  if(gamePattern.length === userClickedPattern.length){
    setTimeout(function () {
      nextSequence();
    }, 1000);
  }

} else {

    console.log("Wrong");

    playSound("Wrong");

    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    $("#level-title").text("Game Over, Press Any Key to Restart");

    startOver();
  }

}

function nextSequence() {

  userClickedPattern = [];
  level++;
  $("#level-title").text("Level "+level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {

  $("#"+currentColour).addClass("pressed").delay(100).queue(function(next){

    $("#"+currentColour).removeClass("pressed");
    next();
  });
}

function startOver() {
  
  level = 0;
  gamePattern = [];
  started = false;
}
