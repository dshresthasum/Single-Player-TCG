import * as helper from "./elements.js";
import * as urls from "./urls.js";
//import { createCardDeck } from "./deck.js";

const npcPlayer = helper.getID("npc-player");
let deck = [];

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
 * draw certain number of cards from a specified deck
 *******/
let drawCardsFromDeck = (deck, count) => {
  let drawnCards = [];
  for (let i = 0; i < count; i++) {
    drawnCards[i] = deck.pop();
  }
  return drawnCards;
};

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
 * Distribute the cards to the player
 * Allocate 6 prize cards
 *******/
let distributeCards = async (deckCards) => {
  //let deckCards = await createCardDeck();
  helper.getID("game-board").style.display = "block";
  helper.getID("makeDeck").style.display = "none";
  helper.getID("startGame").style.display = "none";

  loadBossCard();

  let shuffledDeck = shuffle(deckCards);
  createBenchStack();
  let playerHandCards = drawCardsFromDeck(shuffledDeck, 7);

  let playerHandDiv = document.createElement("div");
  playerHandDiv.className = "player-hand";

  playerHandCards.forEach((card) => {
    let handCardImg = document.createElement("img");
    handCardImg.id = card.id;
    handCardImg.src = card.images.small;
    handCardImg.alt = `${card.name} from ${card.set.name} set`;

    //draggable
    handCardImg.draggable = true;
    handCardImg.ondragstart = helper.drag;

    playerHandDiv.appendChild(handCardImg);
  });
  helper.getID("player-hand-container").append(playerHandDiv);

  //Start of prize pool
  let trainerCardsList = deckCards.filter(
    (item) => item.supertype.toLowerCase() === "trainer"
  );

  let shuffledTrainerCardList = shuffle(trainerCardsList);
  let prizeCardsList = drawCardsFromDeck(shuffledTrainerCardList, 6);

  let prizeDiv = document.createElement("div");
  prizeDiv.className = "prize";
  let top = 0;
  prizeCardsList.forEach((item, index) => {
    let prizeImg = document.createElement("img");
    prizeImg.id = item.id;
    prizeImg.src = item.images.small;
    prizeImg.alt = `${item.name} from ${item.set.name} set`;
    index === 0
      ? (prizeImg.style.marginTop = "0px")
      : (prizeImg.style.marginTop = "-150px");
    // prizeImg.style.top = top + "rem";
    // top += 3;

    //draggable
    prizeImg.draggable = true;
    prizeImg.ondragstart = helper.drag;

    prizeDiv.appendChild(prizeImg);
  });

  helper.getID("prize-cards").appendChild(prizeDiv);

  prizeCardsList.forEach((item) => {
    console.log(shuffledDeck.indexOf(item));
    shuffledDeck.splice(shuffledDeck.indexOf(item), 1);
  });
  //END OF prize pool

  console.log(shuffledDeck);

  //Set up discard pile
  helper.setDroppable("discard-pile");
  helper.setDroppable("main-card");
  helper.setDroppable("energy");
};

export { loadBossCard, distributeCards };
