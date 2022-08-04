var start = new Date().getTime(); //time when page loads
var beep = new Audio("sounds/beep.mp3");
const music = new Audio("sounds/free-music-for-video-games.mp3");
let isPaused = false; //if start btn pressed before restart btn, do not restart
let totalScore = 0;
//button that starts the game
//time starts (effectively) when START button is pushed
//variable start is updated
document.getElementById("startGame").onclick = function () {
  document.getElementById("shape").style.visibility = "visible";

  if (isPaused == true) {
    alert("Please click 'Reset Game'!");
    return; //if start btn pressed before restart btn, do not restart
  } else {
    start = new Date().getTime();
    //music.play();
    playMusic();
  }
};

function playMusic() {
  //detect browser support for loop -
  //if supported, will be 'false' (by default) or will be 'undefined'
  if (typeof music.loop == "boolean") {
    music.loop = true;
  }
  //if not supported by browser -
  //use custom code:
  else {
    music.addEventListener(
      "ended", //boolean value --> indicates whether the media element has ended playback
      function () {
        this.currentTime = 0; //specifies the current playbacck time in seconds
        this.play();
      },

      false //useCapture (optional here, default is false)
    );
  }
  music.play();
}

function getRandomColor() {
  var letters = "0123456789ABCDEF".split(""); //Split a string into an array of substrings

  var color = "#";

  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }

  return color;
}
var count = -1;
let scoreCount = 0;
var totalTime = 0;
var avgTime = 0;
var width = Math.random() * 200 + 100; //so shape will be at least 100px

function makeShapeAppear() {
 

  var top = Math.random() * 400;
  var left = Math.random() * 1800; //have shapes extend further to the right of screen
  //make circle 50% of time
  if (Math.random() > 0.5) {
    document.getElementById("shape").style.borderRadius = "50%";
  } else {
    document.getElementById("shape").style.borderRadius = "0";
  }
 
  document.getElementById("shape").style.top = top + "px"; //include "px"
  document.getElementById("shape").style.left = left + "px"; //include "px"
  document.getElementById("shape").style.backgroundColor = getRandomColor();
  document.getElementById("shape").style.height = width + "px";
  document.getElementById("shape").style.width = width + "px";

  document.getElementById("shape").style.display = "block";
  start = new Date().getTime(); //update the time
  count++;
  console.log("count is " + count);
} //end makeShapeAppear()

function appearAfterDelay() {
  setTimeout(makeShapeAppear, Math.random() * 2000);
}
function appearAfterDelay2() {
  setTimeout(makeShapeAppear, Math.random() * 500);
}

if (count <= 20) {
  appearAfterDelay();
} else {
  appearAfterDelay2();
}

if (count > 30) {
  width = Math.random() * 100 + 30; //so shape will be at least 100px
}

document.getElementById("shape").onclick = function () {
  document.getElementById("shape").style.display = "none";
  beep.play();
  var end = new Date().getTime();
  const standardTime = 1.0;
  var timeTaken = (end - start) / 1000;
  //display diff color time
  if (timeTaken >= standardTime) {
    document.getElementById("timeTaken").style.color = "red";
  } else {
    document.getElementById("timeTaken").style.color = "green";
  }

  document.getElementById("timeTaken").innerHTML = timeTaken + " seconds";

  totalTime += timeTaken;
  console.log("total time is: " + totalTime);
  if (count <= 0) {
    avgTime = 0;
  } else {
    avgTime = totalTime / count;

    console.log("average time is: " + avgTime);
  }

  //scoring
  let score = getScoreCount(timeTaken);

  totalScore += score;
  console.log("The score: ", totalScore);

  if (count <= 20) {
    appearAfterDelay();
  } else {
    appearAfterDelay2();
  }

  if (count > 30) {
    width = Math.random() * 100 + 30; //so shape will be at least 100px
  }
}; //end function

document.getElementById("displayAvg").onclick = function () {
  document.getElementById("showAvgTime").innerHTML =
    avgTime.toFixed(2) + " seconds";
  //move to END GAME function
  localStorage.setItem("avgTime", avgTime);
};

document.getElementById("resetGame").onclick = function () {
  document.getElementById("resetGame").style.display = "none";
  isPaused = false;
  window.location.reload();
};
//*************************************************** */
const endBTN = document.getElementById("endBTN");
function endTheGame() {
  document.getElementById("resetGame").style.display = "block";
  music.pause();
  document.getElementById("shape").style.display = "none";
  isPaused = true; //<-----isPaused
}

endBTN.addEventListener("click", endTheGame);
/************************************************** */
function getScoreCount(time) {
  if (time <= 0.5) {
    return 8;
  }
  if (time <= 0.6) {
    return 6;
  }
  if (time <= 0.7) {
    return 3;
  }
  if (time <= 0.8) {
    return 2;
  }
  if (time <= 1.0) {
    return 1;
  }
  if (time <= 1.5) {
    return 0;
  }
  return -1;
}
