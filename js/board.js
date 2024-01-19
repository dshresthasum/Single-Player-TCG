import * as helper from "./elements.js";
import * as urls from "./urls.js";

const npcPlayer = helper.getID("npc-player");

/*******
 * Shuffling an array
 * https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
 *******/
function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex > 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

/*******
 * Get all the Cards with HP > 320
 * Pick a random from the list
 *******/
let loadBossCard = async () => {
  let results = await helper.getData(urls.CARDS + "?q=hp:[320 TO *]");
  let boss = results[helper.getRandom(0, results.length)];

  let bossDiv = document.createElement("div");
  bossDiv.className = "boss";

  let bossImg = document.createElement("img");
  bossImg.src = boss.images.large;
  bossImg.alt = `${boss.name} designed by ${boss.artist}`;

  bossDiv.append(bossImg);
  npcPlayer.append(bossDiv);
};

/*******
 * draw 6 cards from the deck
 * place the cards on the Prize Cards Slot
 *******/
let loadPrizeCards = (deck) => {
  let prizeCardsList = drawCardsFromDeck(deck, 6);

  let prizeDiv = document.createElement("div");
  prizeDiv.className = "prize";
  let top = 0;
  prizeCardsList.forEach((item, index) => {
    let prizeImg = document.createElement("img");
    prizeImg.id = item.id;
    prizeImg.src = item.images.small;
    prizeImg.alt = `${item.name} from ${item.set.name} set`;
    prizeImg.setAttribute("supertype", item.supertype);

    index === 0
      ? (prizeImg.style.marginTop = "0px")
      : (prizeImg.style.marginTop = "-150px");

    //draggable
    prizeImg.draggable = true;
    prizeImg.ondragstart = helper.drag;

    prizeDiv.appendChild(prizeImg);
  });

  helper.getID("prize-cards").appendChild(prizeDiv);
};

/*******
 * draw certain number of cards from a specified deck
 *******/
let drawCardsFromDeck = (deck, count) => {
  let drawnCards = [];
  for (let i = 0; i < count; i++) {
    drawnCards[i] = deck.pop();
    if (deck.length === 0) {
      helper.getID("game-deck").innerHTML = "";
    }
  }
  return drawnCards;
};

/*******
 * set up bench for the player
 * consists of 5 bench spots for player to place cards
 * each bench can be stacked with multiple cards
 *******/
let createBenchStack = () => {
  for (let i = 0; i < 5; i++) {
    let benchDiv = document.createElement("div");
    benchDiv.className = "bench";
    benchDiv.id = "bench" + (i + 1);

    //droppable
    benchDiv.ondrop = helper.drop;
    benchDiv.ondragover = helper.allowDrop;

    helper.getID("benches").append(benchDiv);
  }
};

/*******
 * draw 7 cards from top of the deck
 * place the cards on the Player's Hand Slot
 *******/
let loadPlayerHandCards = (shuffledDeck, noOfCards) => {
  let playerHandCards = drawCardsFromDeck(shuffledDeck, noOfCards);

  let playerHandDiv = document.querySelector(".player-hand");

  playerHandCards.forEach((card) => {
    let handCardImg = document.createElement("img");
    handCardImg.id = card.id;
    handCardImg.src = card.images.small;
    handCardImg.alt = `${card.name} from ${card.set.name} set`;
    handCardImg.setAttribute("supertype", card.supertype);
    //draggable
    handCardImg.draggable = true;
    handCardImg.ondragstart = helper.drag;

    playerHandDiv.appendChild(handCardImg);
    //helper.getID("player-hand-container").append(handCardImg);
  });
};
/*******
 * Distribute the cards to the player
 * Allocate 6 prize cards
 *******/
let distributeCards = async (deckCards) => {
  helper.getID("game-board").style.display = "block";
  helper.getID("makeDeck").style.display = "none";
  helper.getID("startGame").style.display = "none";

  let shuffledDeck = shuffle(deckCards);

  loadBossCard();
  loadPrizeCards(shuffledDeck);
  createBenchStack();
  loadPlayerHandCards(shuffledDeck, 7);

  helper.getID("game-deck").addEventListener("click", () => {
    loadPlayerHandCards(shuffledDeck, 1);
  });

  //Set up discard pile
  helper.setDroppable("discard-pile");
  helper.setDroppable("main-card");
  //helper.setDroppable("energy");
};

export { loadBossCard, distributeCards };
