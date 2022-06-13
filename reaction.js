var start = new Date().getTime(); //time when page loads
var beep = new Audio("sounds/beep.mp3");
const music = new Audio("sounds/free-music-for-video-games.mp3");

//button that starts the game
//time starts (effectively) when START button is pushed
//variable start is updated
document.getElementById("startGame").onclick = function () {
  document.getElementById("shape").style.visibility = "visible";
  start = new Date().getTime();
  //music.play();
  playMusic();
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
var totalTime = 0;
var avgTime = 0;
var width = Math.random() * 200 + 100; //so shape will be at least 100px

function makeShapeAppear() {
  //var height = Math.random() * 500;

  var top = Math.random() * 400;
  var left = Math.random() * 800;
  //make circle 50% of time
  if (Math.random() > 0.5) {
    document.getElementById("shape").style.borderRadius = "50%";
  } else {
    document.getElementById("shape").style.borderRadius = "0";
  }
  //var color = ["red", "blue", "green", "yellow", "black"];
  //console.log(color);
  // var colorNum = Math.floor(Math.random() * 5);
  //console.log(colorNum);
  //var colorStyle = color[colorNum];
  //console.log(colorStyle);
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
  var timeTaken = (end - start) / 1000;
  //alert(timeTaken);
  document.getElementById("timeTaken").innerHTML = timeTaken + " seconds";

  totalTime += timeTaken;
  console.log("total time is: " + totalTime);
  if (count <= 0) {
    avgTime = 0;
  } else {
    avgTime = totalTime / count;

    console.log("average time is: " + avgTime);
  }

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
    "Your average time was " + avgTime.toFixed(3) + " seconds";
  document.getElementById("resetGame").style.display = "block";
  localStorage.setItem("avgTime", avgTime);
};

document.getElementById("resetGame").onclick = function () {
  document.getElementById("resetGame").style.display = "none";
  window.location.reload();
};
