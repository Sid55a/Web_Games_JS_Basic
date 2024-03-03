const cardArray = [
  { name: "fries", img: "images/fries.png" },
  { name: "cheeseburger", img: "images/cheeseburger.png" },
  { name: "hotdog", img: "images/hotdog.png" },
  { name: "ice-cream", img: "images/ice-cream.png" },
  { name: "milkshake", img: "images/milkshake.png" },
  { name: "pizza", img: "images/pizza.png" },
  { name: "fries", img: "images/fries.png" },
  { name: "cheeseburger", img: "images/cheeseburger.png" },
  { name: "hotdog", img: "images/hotdog.png" },
  { name: "ice-cream", img: "images/ice-cream.png" },
  { name: "milkshake", img: "images/milkshake.png" },
  { name: "pizza", img: "images/pizza.png" },
];

cardArray.sort(() => 0.5 - Math.random());

const gridDisplay = document.querySelector("#grid");
const result = document.querySelector("#result");
const outOf = document.querySelector("#outOf");
outOf.innerHTML = cardArray.length / 2;
result.innerHTML = 0;
let cardChosen = [];
let cardChosenIds = [];
let cardsWon = [];
createBoard();

function createBoard() {
  for (let i = 0; i < cardArray.length; i++) {
    const card = document.createElement("img");
    card.setAttribute("src", "images/blank.png");
    card.setAttribute("data-id", i);
    card.addEventListener("click", flipCard);
    gridDisplay.append(card);
  }
}

function flipCard() {
  const cardId = this.getAttribute("data-id");
  console.log("clicked", cardId);
  console.log(cardArray[cardId].name);
  cardChosen.push(cardArray[cardId].name);
  cardChosenIds.push(cardId);
  this.setAttribute("src", cardArray[cardId].img);
  if (cardChosen.length === 2) {
    setTimeout(checkForMatch, 500);
  }
}

//checks to see if the two cards
function checkForMatch() {
  const cards = document.querySelectorAll("#grid img");
  if (cardChosen[0] === cardChosen[1]) {
    cards[cardChosenIds[0]].setAttribute("src", "images/white.png");
    cards[cardChosenIds[1]].setAttribute("src", "images/white.png");
    cards[cardChosenIds[0]].removeEventListener("click", flipCard);
    cards[cardChosenIds[1]].removeEventListener("click", flipCard);

    cardsWon.push(cards[cardChosenIds[0]]);
    result.innerHTML = cardsWon.length;
    if (cardsWon.length === cards.length / 2) {
      alert("Congratulations! You've won!");
      resetGame();
    }
    cardChosenIds = [];
    cardChosen = [];
  } else {
    cards[cardChosenIds[0]].setAttribute("src", "images/blank.png");
    cards[cardChosenIds[1]].setAttribute("src", "images/blank.png");
    cardChosenIds = [];
    cardChosen = [];
  }
}

function resetGame() {
  cardArray.sort(() => 0.5 - Math.random());

  gridDisplay.innerHTML = null;
  result.innerHTML = 0;
  cardsWon = [];
  createBoard();
}
