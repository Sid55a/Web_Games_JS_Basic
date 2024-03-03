const timeLeft = document.querySelector("#time-left");
const result = document.querySelector("#result");
const startPauseButton = document.querySelector("#start-pause-button");
const squares = document.querySelectorAll(".grid div");
const logLeft = document.querySelectorAll(`.log-left`);
const logRight = document.querySelectorAll(`.log-right`);
const carLeft = document.querySelectorAll(".car-left");
const carRight = document.querySelectorAll(".car-right");
let timerId;
let currentTime;

let time = 10;

let currentIndex = 76;
let width = 9;

let CheckTimeOut;

function moveFrog(e) {
  switch (e.key) {
    case "ArrowLeft":
      if (currentIndex % width != 0) {
        squares[currentIndex].classList.remove("frog");
        currentIndex -= 1;
      }
      break;
    case "ArrowRight":
      if (currentIndex % width != width - 1) {
        squares[currentIndex].classList.remove("frog");
        currentIndex += 1;
      }
      break;
    case "ArrowUp":
      if (currentIndex >= width) {
        squares[currentIndex].classList.remove("frog");
        currentIndex -= width;
      }
      break;
    case "ArrowDown":
      if (currentIndex < width * (width - 1)) {
        squares[currentIndex].classList.remove("frog");
        currentIndex += width;
      }
      break;
  }
  squares[currentIndex].classList.add("frog");
}

function autoMoveElements() {
  logLeft.forEach((log) => moveLogLeft(log));
  logRight.forEach((log) => moveLogRight(log));
  carLeft.forEach((car) => moveCarLeft(car));
  carRight.forEach((car) => moveCarRight(car));
}

function moveCarRight(carRight) {
  switch (true) {
    case carRight.classList.contains("c1"): {
      carRight.classList.remove("c1");
      carRight.classList.add("c2");
      break;
    }
    case carRight.classList.contains("c2"): {
      carRight.classList.remove("c2");
      carRight.classList.add("c3");
      break;
    }
    case carRight.classList.contains("c3"): {
      carRight.classList.remove("c3");
      carRight.classList.add("c1");
      break;
    }
  }
}
function moveCarLeft(carLeft) {
  switch (true) {
    case carLeft.classList.contains("c1"): {
      carLeft.classList.remove("c1");
      carLeft.classList.add("c3");
      break;
    }
    case carLeft.classList.contains("c2"): {
      carLeft.classList.remove("c2");
      carLeft.classList.add("c1");
      break;
    }
    case carLeft.classList.contains("c3"): {
      carLeft.classList.remove("c3");
      carLeft.classList.add("c2");
      break;
    }
  }
}

function moveLogLeft(logLeft) {
  switch (true) {
    case logLeft.classList.contains("l1"): {
      logLeft.classList.remove("l1");
      logLeft.classList.add("l2");
      break;
    }
    case logLeft.classList.contains("l2"): {
      logLeft.classList.remove("l2");
      logLeft.classList.add("l3");
      break;
    }
    case logLeft.classList.contains("l3"): {
      logLeft.classList.remove("l3");
      logLeft.classList.add("l4");
      break;
    }
    case logLeft.classList.contains("l4"): {
      logLeft.classList.remove("l4");
      logLeft.classList.add("l5");
      break;
    }
    case logLeft.classList.contains("l5"): {
      logLeft.classList.remove("l5");
      logLeft.classList.add("l1");
      break;
    }
  }
}

function moveLogRight(logRight) {
  switch (true) {
    case logRight.classList.contains("l1"): {
      logRight.classList.remove("l1");
      logRight.classList.add("l5");
      break;
    }
    case logRight.classList.contains("l2"): {
      logRight.classList.remove("l2");
      logRight.classList.add("l1");
      break;
    }
    case logRight.classList.contains("l3"): {
      logRight.classList.remove("l3");
      logRight.classList.add("l2");
      break;
    }
    case logRight.classList.contains("l4"): {
      logRight.classList.remove("l4");
      logRight.classList.add("l3");
      break;
    }
    case logRight.classList.contains("l5"): {
      logRight.classList.remove("l5");
      logRight.classList.add("l4");
      break;
    }
  }
}

function lose() {
  if (time <= 0) {
    clearTimeout(currentTime);
    result.textContent = "Times Up... You Lose!";
    clearInterval(timerId);
    squares[currentIndex].classList.remove("frog");
    document.removeEventListener("keydown", moveFrog);
    clearInterval(CheckTimeOut);
  }
  if (
    squares[currentIndex].classList.contains("c1") ||
    squares[currentIndex].classList.contains("l4") ||
    squares[currentIndex].classList.contains("l5")
  ) {
    clearTimeout(currentTime);
    clearInterval(CheckTimeOut);
    result.textContent = "You Lose!";
    clearInterval(timerId);
    squares[currentIndex].classList.remove("frog");
    document.removeEventListener("keydown", moveFrog);
  }
}

function win() {
  if (squares[currentIndex].classList.contains("ending-block")) {
    clearTimeout(currentTime);
    result.textContent = "You Win :)";
    clearInterval(timerId);
    timerId = null;
    clearInterval(CheckTimeOut);

    // squares[currentIndex].classList.remove("frog");
    document.removeEventListener("keydown", moveFrog);
  }
}

startPauseButton.addEventListener("click", () => {
  if (timerId) {
    clearInterval(timerId);
    timerId = null;
    document.removeEventListener("keydown", moveFrog);
    clearTimeout(currentTime);
    clearInterval(CheckTimeOut);
  } else {
    document.addEventListener("keydown", moveFrog);
    timerId = setInterval(autoMoveElements, 1000);
    currentTime = setInterval(() => {
      time -= 1;
      timeLeft.textContent = time;
    }, 1000);
    CheckTimeOut = setInterval(() => {
      lose();
      win();
    }, 50);
  }
});
