const squares = document.querySelectorAll(".square");
const mole = document.querySelector(".mole");
const timeLeft = document.querySelector("#time-left");
const score = document.querySelector("#score");
const start = document.getElementById("start");

let result = 0;
let hitPosition;
let currentTime = 60;
let conutDownTimeId = null;
let timerId = null;
timeLeft.textContent = currentTime;
let startHandler = start.addEventListener("click", () => {
  moveMole();
  score.textContent = 0;
  conutDownTimeId = setInterval(countDowm, 1000);
});

squares.forEach((square) => {
  square.addEventListener("mousedown", () => {
    if (square.id === hitPosition) {
      result++;
      score.innerHTML = result;
      hitPosition = null;
    }
    console.log(square.id);
    console.log(hitPosition);
  });
});

function moveMole() {
  timerId = setInterval(randomSquare, 500);
}

function randomSquare() {
  squares.forEach((square) => {
    square.classList.remove("mole");
  });

  let moleSquare = squares[Math.floor(Math.random() * 9)];
  moleSquare.classList.add("mole");
  hitPosition = moleSquare.id;
}

function countDowm() {
  currentTime--;
  timeLeft.textContent = currentTime;
  if (currentTime <= 0) {
    alert(`Game is over you scored ${result} points`);
    result = 0;
    currentTime = 5;
    score.innerHTML = result;
    timeLeft.innerHTML = currentTime;
    hitPosition = null;
    clearInterval(timerId);
    clearInterval(conutDownTimeId);
  }
}
