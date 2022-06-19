const shape = document.getElementById("shape");
shape.addEventListener("click", function () {
  this.style.display = "none";
  var end = new Date().getTime();
  var timeTaken = (end - start) / 1000;
  document.getElementById("timeTaken").innerHTML = `${timeTaken}s`;
  appearAfterDelay();
});

function getTime() {
  var end = new Date().getTime();
  var timeTaken = (end - start) / 1000;
  setInnerHTML(timeTaken);
  //document.getElementById("timeTaken").innerHTML = `${timeTaken}s`;
  return timeTaken;
}

function setInnerHTML(value) {
  const standardTime = 1.0;
  if (value >= standardTime) {
    document.getElementById("timeTaken").style.color = "red";
  } else {
    document.getElementById("timeTaken").style.color = "green";
  }
  document.getElementById("timeTaken").innerHTML = `${value}s`;
}

function makeShapeVanish() {
  this.style.display = "none";
  beep.play();
  count++;
  let timeTakenResult = getTime();
  appearAfterDelay();
  return timeTakenResult;
}

shape.addEventListener("click", function () {
  let timeResponse = makeShapeVanish();
  updateTotalTime(timeResponse);
});

function updateTotalTime(value) {
  let totalTime = 0;
  totalTime += value;
  console.log(`Total Time is: ${totalTime}`);
  if (count <= 0) {
    avgTime = 0;
  } else {
    avgTime = totalTime / count;
    console.log("average time is: " + avgTime);
  }
}
