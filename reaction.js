let count = -1;
let start = new Date().getTime();
const music = new Audio("sounds/free-music-for-video-games.mp3");
const beep = new Audio("sounds/beep.mp3");
const shape = document.getElementById("shape");
let isPaused = false;

class GameUI {
  constructor() {
    this.shapeUI = new ShapeUI();
    this.gameMusic = new GameMusic();
    this.startGame = document.getElementById("startGame");
    this.startGame.addEventListener("click", () => {
      this.gameMusic.playMusic();
      this.shapeUI.appearAfterDelay();
    });

    this.resetGame = document.getElementById("resetGame");
    this.endGame = document.getElementById("endBTN");
    this.timeTakenDiv = document.getElementById("timeTaken");
    this.scoreCount = document.getElementById("scoreCount");
    this.scoreCount.innerHTML = 0;
    this.totalScore = 0;
    this.standardTime = 1;
    shape.addEventListener("click", this.makeShapeDisappear.bind(this));
    this.endGame.addEventListener("click", this.endTheGame.bind(this));
    this.resetGame.addEventListener("click", this.resetTheGame.bind(this));
    this.modeBtn = document.getElementById("modeBtn");
    this.modeBtn.addEventListener("click", this.changeMode.bind(this));
    this.pointerBlack = document.getElementById("pointer");
    this.pointerWhite = document.getElementById("pointer-white");
  }

  changeMode() {
    this.currentBody = document.body;
    this.currentBody.classList.toggle("dark-mode");
    if (this.currentBody.classList.contains("dark-mode")) {
      this.modeBtn.innerHTML = "TURN DARK MODE <b>OFF</b>";
      this.startGame.style.backgroundColor = "blue";
      this.resetGame.style.backgroundColor = "blue";
      this.pointerBlack.style.display = "none";
      this.pointerWhite.style.display = "block";
    } else {
      this.modeBtn.innerHTML = "TURN DARK MODE <b>ON</b>";
      this.startGame.style.backgroundColor = "black";
      this.resetGame.style.backgroundColor = "black";
      this.pointerBlack.style.display = "block";
      this.pointerWhite.style.display = "none";
    }
  }

  showTimeTaken(time) {
    let timeToDisplay = time;
    if (timeToDisplay >= this.standardTime) {
      this.timeTakenDiv.style.color = "red";
    } else {
      this.timeTakenDiv.style.color = "green";
    }
    this.timeTakenDiv.innerHTML = `${timeToDisplay}s`;
  }

  makeShapeDisappear() {
    beep.play();
    shape.style.display = "none";
    this.calculateTimeTaken();
    this.shapeUI.appearAfterDelay();
  }

  calculateTimeTaken() {
    let end = new Date().getTime();
    let timeTaken = (end - start) / 1000;
    this.showTimeTaken(timeTaken);
    let calculatedScore = this.calculateTheScore(timeTaken);
    this.totalScore += calculatedScore;
    this.scoreCount.innerHTML = `${this.totalScore}`;
  }

  calculateTheScore(time) {
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

  endTheGame() {
    this.resetGame.style.display = "block";
    music.pause();
    shape.style.display = "none";
    isPaused = true;
    clearTimeout(this.shapeUI.timeOutId);
  }

  resetTheGame() {
    this.totalScore = 0;
    this.scoreCount.innerHTML = `${this.totalScore}`;
    this.timeTakenDiv.innerHTML = "";
    isPaused = false;
    this.resetGame.style.display = "none";
  }
}

class ShapeUI {
  constructor() {
    this.timeOutId = undefined;
  }
  getRandomColor() {
    let letters = "0123456789ABCDEF".split(""); //Split a string into an array of substrings
    let color = "#";
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  makeShapeAppear = () => {
    let top = Math.random() * 400;
    let left = Math.random() * 1800; //have shapes extend further to the right of screen
    let width = Math.random() * 200 + 100; //so shape will be at least 100px
    //make circle 50% of time
    if (Math.random() > 0.5) {
      shape.style.borderRadius = "50%";
    } else {
      shape.style.borderRadius = "0";
    }

    shape.style.top = top + "px"; //include "px"
    shape.style.left = left + "px"; //include "px"
    shape.style.backgroundColor = this.getRandomColor();

    shape.style.height = width + "px";
    shape.style.width = width + "px";

    shape.style.display = "block";
    start = new Date().getTime(); //update the time
    count++;
    console.log(`count is ${count}`);
  };

  //call makeShapeAppear method
  appearAfterDelay = () => {
    if (isPaused) {
      alert("Please click 'Reset Game Button");
      return;
    } else {
      this.timeOutId = setTimeout(this.makeShapeAppear, Math.random() * 2000);
    }
  };
}

class GameMusic {
  constructor() {}
  playMusic() {
    //detect browser support for loop -
    //if supported, will be 'false' (by default) or will be 'undefined'
    if (isPaused) {
      return; //do not play music if "End Game" button has been clicked
    } else if (typeof music.loop == "boolean") {
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
}

new GameUI();
