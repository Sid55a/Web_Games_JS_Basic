const grid = document.querySelector(".grid");
const results = document.querySelector(".results");
const score = document.querySelector(".score");
const laserCount = document.querySelector(".laserCount");

let currentShooterIndex = 202;
let width = 15;
let direction = 1;
let invaderId;
let goingRight = true;
let alientRemovedArr = [];
let usedLaser = 0;

for (let i = 0; i < 255; i++) {
  const square = document.createElement("div");
  grid.appendChild(square);
}

const alientInvaders = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 30, 31,
  32, 33, 34, 35, 36, 37, 38, 39,
];

const squares = Array.from(document.querySelectorAll(".grid div"));

draw();
document.addEventListener("keydown", moveShoter);

squares[currentShooterIndex].classList.add("shooter");

function draw() {
  for (let i = 0; i < alientInvaders.length; i++) {
    if (!alientRemovedArr.includes(i)) {
      squares[alientInvaders[i]].classList.add("invader");
    }
  }
}
function remove() {
  for (let i = 0; i < alientInvaders.length; i++) {
    squares[alientInvaders[i]].classList.remove("invader");
  }
}

function moveInvaders() {
  let leftSide = alientInvaders[0] % width === 0;
  let rightSide =
    alientInvaders[alientInvaders.length - 1] % width === width - 1;
  remove();
  if (rightSide && goingRight) {
    for (let i = 0; i < alientInvaders.length; i++) {
      alientInvaders[i] += width + 1;
      direction = -1;
      goingRight = false;
    }
  }
  if (leftSide && !goingRight) {
    for (let i = 0; i < alientInvaders.length; i++) {
      alientInvaders[i] += width - 1;
      direction = 1;
      goingRight = true;
    }
  }
  for (let i = 0; i < alientInvaders.length; i++) {
    alientInvaders[i] += direction;
  }
  draw();

  if (squares[currentShooterIndex].classList.contains("invader")) {
    results.innerHTML = `Game Over!`;
    clearInterval(invaderId);
    document.removeEventListener("keydown", moveShoter);
  }

  for (let i = 0; i < alientInvaders.length; i++) {
    if (alientInvaders[i] > squares.length - width) {
      results.innerHTML = `Game Over!`;
      clearInterval(invaderId);
      document.removeEventListener("keydown", moveShoter);
      document.removeEventListener("keydown", shoot);
    }
  }

  if (alientRemovedArr.length === alientInvaders.length) {
    results.innerHTML = "You Win!";
    clearInterval(invaderId);
    document.removeEventListener("keydown", moveShoter);
    document.removeEventListener("keydown", shoot);
    clearInterval(invaderId);
  }
}

invaderId = setInterval(moveInvaders, 200);

function moveShoter(e) {
  switch (e.key) {
    case "ArrowLeft":
      {
        if (currentShooterIndex % width !== 0) {
          squares[currentShooterIndex].classList.remove("shooter");
          currentShooterIndex -= 1;
          squares[currentShooterIndex].classList.add("shooter");
        }
      }
      break;
    case "ArrowRight":
      {
        if (currentShooterIndex % width !== width - 1) {
          squares[currentShooterIndex].classList.remove("shooter");
          currentShooterIndex += 1;
          squares[currentShooterIndex].classList.add("shooter");
        }
      }
      break;
  }
}
function shoot(e) {
  let laserId;
  let currentLaserIndex = currentShooterIndex;

  function moveLaser() {
    if (currentLaserIndex > width - 1) {
      squares[currentLaserIndex].classList.remove("laser");
      currentLaserIndex -= width;
      squares[currentLaserIndex].classList.add("laser");
    } else {
      squares[currentLaserIndex].classList.remove("laser");
    }

    if (squares[currentLaserIndex].classList.contains("invader")) {
      squares[currentLaserIndex].classList.remove("laser");
      squares[currentLaserIndex].classList.remove("invader");
      squares[currentLaserIndex].classList.add("boom");

      setTimeout(
        () => squares[currentLaserIndex].classList.remove("boom"),
        300
      );

      clearInterval(laserId);
      const alienRemoval = alientInvaders.indexOf(currentLaserIndex);

      alientRemovedArr.push(alienRemoval);
      score.innerHTML = alientRemovedArr.length;
    }
  }

  if (e.key === "ArrowUp") {
    laserId = setInterval(moveLaser, 100);
    usedLaser += 1;
    laserCount.innerHTML = usedLaser;
  }
}

document.addEventListener("keydown", shoot);
