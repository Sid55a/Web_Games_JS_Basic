const computerChoice = document.getElementById("computer-choice");
const userChoice = document.getElementById("user-choice");
const result = document.getElementById("result");

const possibleChoices = document.querySelectorAll("button");
let userChoose;
let compChoose;
let resultDisplay;
possibleChoices.forEach((choice) =>
  choice.addEventListener("click", (e) => {
    userChoose = e.target.id;
    userChoice.innerHTML = userChoose;
    generateComputerChoice();
    computerChoice.innerHTML = compChoose;
    getResult();
    result.innerHTML = resultDisplay;
  })
);

const generateComputerChoice = () => {
  const randomNumber = Math.floor(Math.random() * possibleChoices.length) + 1;
  console.log(randomNumber);
  if (randomNumber === 1) {
    compChoose = "rock";
  } else if (randomNumber === 2) {
    compChoose = "paper";
  } else {
    compChoose = "scissors";
  }
};

const getResult = () => {
  if (compChoose === userChoose) {
    resultDisplay = "It's a draw";
  } else if (compChoose === "rock" && userChoose === "paper") {
    resultDisplay = "you Win :)";
  } else if (compChoose === "rock" && userChoose === "scissors") {
    resultDisplay = "you lost!";
  } else if (compChoose === "paper" && userChoose === "rock") {
    resultDisplay = "you lost!";
  } else if (compChoose === "paper" && userChoose === "scissors") {
    resultDisplay = "you win :)";
  } else if (compChoose === "scissors" && userChoose === "paper") {
    resultDisplay = "you lost!";
  } else if (compChoose === "scissors" && userChoose === "rock") {
    resultDisplay = "you win :)";
  }
};
