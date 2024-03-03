const grid = document.querySelector(".grid");
const scoreDisplay = document.querySelector("#score");
const start = document.getElementById("start");

let isTimeOut = false;
let isListener = false;

start.addEventListener("click", startGame);

function startGame() {
  isTimeOut = true;
  isListener = true;
  start.removeEventListener("click", startGame);
  timerId = setInterval(moveBall, 30);
  document.addEventListener("keydown", moveUser);
}

const blockWidth = 100;
const blockHeight = 20;
const ballDiameter = 20;
const boardWidth = 560;
const boardHeight = 300;
const userWidth = 100;
const userHeight = 20;

const userStartPosition = [230, 10];
let currentPosition = userStartPosition;
const ballStartPosition = [270, 40];
let ballCurrentPosition = ballStartPosition;
let timerId;
let xDirection = 2;
let yDirection = 2;
let score = 0;

class Block {
  constructor(xAxis, yAxis) {
    this.bottomLeft = [xAxis, yAxis];
    this.bottomRight = [xAxis + blockWidth, yAxis];
    this.topLeft = [xAxis, yAxis + blockHeight];
    this.topRight = [xAxis + blockWidth, yAxis + blockHeight];
  }
}

const blocks = [
  new Block(10, 270),
  new Block(120, 270),
  new Block(230, 270),
  new Block(340, 270),
  new Block(450, 270),
  new Block(10, 240),
  new Block(120, 240),
  // new Block(230, 240),
  // new Block(340, 240),
  new Block(450, 240),
  new Block(10, 210),
  new Block(120, 210),
  new Block(230, 150),
  // new Block(340, 210),
  new Block(450, 210),
];

function addBlocks() {
  for (let i = 0; i < blocks.length; i++) {
    const block = document.createElement("div");
    block.classList.add("block");
    block.style.left = blocks[i].bottomLeft[0] + "px";
    block.style.bottom = blocks[i].bottomLeft[1] + "px";
    grid.appendChild(block);
  }
}

addBlocks();

const user = document.createElement("div");
user.classList.add("user");
drawUser();
grid.appendChild(user);

const ball = document.createElement("div");
ball.classList.add("ball");
drawBall();
grid.appendChild(ball);

function drawUser() {
  user.style.left = currentPosition[0] + "px";
  user.style.bottom = currentPosition[1] + "px";
}
function drawBall() {
  ball.style.left = ballCurrentPosition[0] + "px";
  ball.style.bottom = ballCurrentPosition[1] + "px";
}

function moveUser(e) {
  switch (e.key) {
    case "ArrowLeft":
      if (isListener && currentPosition[0] > 0) {
        currentPosition[0] -= 10;
        drawUser();
      }
      break;
    case "ArrowRight":
      if (isListener && currentPosition[0] < boardWidth - blockWidth) {
        currentPosition[0] += 10;
        drawUser();
      }
      break;
    case " ":
      pauseOrPlay();
      break;
  }
}

function pauseOrPlay() {
  if (isTimeOut === true && isListener === true) {
    isListener = false;
    isTimeOut = false;
    clearInterval(timerId);
  } else {
    isListener = true;
    isTimeOut = true;
    timerId = setInterval(moveBall, 30);
  }
}

function moveBall() {
  ballCurrentPosition[0] += xDirection;
  ballCurrentPosition[1] += yDirection;
  drawBall();
  checkForCollision();
}

function checkForCollision() {
  //Check for block collisions
  for (let i = 0; i < blocks.length; i++) {
    if (
      ballCurrentPosition[0] + ballDiameter > blocks[i].bottomLeft[0] &&
      ballCurrentPosition[0] < blocks[i].bottomRight[0] &&
      ballCurrentPosition[1] + ballDiameter > blocks[i].bottomLeft[1] &&
      ballCurrentPosition[1] < blocks[i].topLeft[1]
    ) {
      changeDirection();
      const allBlocks = Array.from(document.querySelectorAll(".block"));
      allBlocks[i].classList.remove("block");
      blocks.splice(i, 1);
      score++;
      scoreDisplay.textContent = score;

      if (blocks.length === 0) {
        scoreDisplay.innerHTML = "You Win :)";
        isTimeOut = false;
        isListener = false;
        clearInterval(timerId);
        document.removeEventListener("keydown", moveUser);
      }
    }
  }

  //check for user collisions
  if (
    ballCurrentPosition[0] + ballDiameter > currentPosition[0] &&
    ballCurrentPosition[0] < currentPosition[0] + userWidth &&
    ballCurrentPosition[1] < currentPosition[1] + userHeight &&
    ballCurrentPosition[1] > currentPosition[1]
  ) {
    changeDirection();
  }
  if (
    ballCurrentPosition[0] >= boardWidth - ballDiameter ||
    ballCurrentPosition[1] >= boardHeight - ballDiameter ||
    ballCurrentPosition[0] < 0
  ) {
    //Check for outter box collisions
    changeDirection();
  }

  if (ballCurrentPosition[1] < 0) {
    clearInterval(timerId);
    scoreDisplay.innerHTML = "Game Over";
    document.removeEventListener("keydown", moveUser);
  }
}

function changeDirection() {
  //Check for outter box collisions
  if (xDirection === 2 && yDirection === 2) {
    yDirection = -2;
    return;
  }
  if (xDirection === 2 && yDirection === -2) {
    xDirection = -2;
    return;
  }
  if (xDirection === -2 && yDirection === -2) {
    yDirection = 2;
    return;
  }
  if (xDirection === -2 && yDirection === 2) {
    xDirection = 2;
    return;
  }
}
