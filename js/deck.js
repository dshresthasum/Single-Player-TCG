import * as helper from "./elements.js";
import * as urls from "./urls.js";
import { distributeCards, loadBossCard } from "./board.js";
// Get the modal
var modal = document.getElementById("myModal");
let closeBtn = helper.getID("cancel");
// Get the button that opens the modal
var btn = document.getElementById("makeDeck");

// Get the <span> element that closes the modal
var span = helper.getID("submitPoke");

// When the user clicks on the button, open the modal
btn.onclick = function () {
  modal.style.display = "flex";
  modal.style.flexDirection = "row";
  createDeckManually();
};

helper.getID("startGame").onclick = function () {
  createCardDeck(false);
};
// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
};

closeBtn.onclick = function () {
  modal.style.display = "none";
};
// When the user clicks anywhere outside of the modal, close it
// window.onclick = function (event) {
//   if (event.target == modal) {
//     modal.style.display = "none";
//   }
// };

/*******
 * Generate a deck of 60 cards
 * 20 Pokemon Cards
 * 20 Energy Cards
 * 20 Trainer Cards => 7 Item, 7 Stadium and 6 Supporter Cards
 *******/
let createCardDeck = async (manual = false) => {
  let deckCards = [];
  await Promise.all([
    fetch(urls.CARDS + "?q=supertype:pokemon%20subtypes:basic"),
    fetch(urls.CARDS + "?q=supertype:energy%20subtypes:basic"),
    fetch(urls.CARDS + "?q=supertype:trainer%20subtypes:item"),
    fetch(urls.CARDS + "?q=supertype:trainer%20subtypes:stadium"),
    fetch(urls.CARDS + "?q=supertype:trainer%20subtypes:supporter"),
  ]).then(
    async ([
      basicPokemons,
      basicEnergy,
      basicTrainerItem,
      basicTrainerStadium,
      basicTrainerSupporter,
    ]) => {
      let basicPokeList = [];
      if (manual) {
        basicPokeList = JSON.parse(sessionStorage.getItem("manualpoke"));
      } else {
        let basicP = await basicPokemons.json();
        basicPokeList = basicP.data.slice(0, 20);
      }
      let basicE = await basicEnergy.json();
      let basicEnergyList = basicE.data.slice(0, 20);

      let basicTI = await basicTrainerItem.json();
      let basicTIList = basicTI.data.slice(0, 7);

      let basicTSt = await basicTrainerStadium.json();
      let basicTStList = basicTSt.data.slice(0, 7);

      let basicTSu = await basicTrainerSupporter.json();
      let basicTSuist = basicTSu.data.slice(0, 6);
      //console.log(basicPokeList);
      deckCards = [
        ...basicPokeList,
        ...basicEnergyList,
        ...basicTIList,
        ...basicTStList,
        ...basicTSuist,
      ];
    }
  );
  console.log(deckCards);
  distributeCards(deckCards);
  //return deckCards;
};

let createDeckManually = async () => {
  let displaySelectedPoke = helper.getID("selected-pokes");
  let selectedPokes = [];
  let data = await fetch(urls.CARDS + "?q=supertype:pokemon%20subtypes:basic")
    .then((res) => res.json())
    .then((res) => res.data);

  let modalContent = helper.getID("modal-content");
  data.forEach((element) => {
    let divEl = document.createElement("div");
    divEl.id = element.id;
    divEl.className = "card";

    let imgCard = document.createElement("img");
    imgCard.src = element.images.small;
    imgCard.alt = element.name;

    divEl.append(imgCard);
    modalContent.appendChild(divEl);

    divEl.addEventListener("click", () => {
      if (selectedPokes.length < 20) {
        selectedPokes.push(element);
        divEl.classList.add("disable");

        let selectedDiv = document.createElement("div");
        selectedDiv.className = "selected";
        selectedDiv.innerHTML = `<span>${element.name}</span>`;

        let btnItemClose = document.createElement("button");
        btnItemClose.textContent = "x";

        let attr = document.createAttribute("for");
        attr.value = element.id;
        btnItemClose.setAttributeNode(attr);

        btnItemClose.addEventListener("click", (event) => {
          event.currentTarget.parentNode.remove();
          let attrFor = event.currentTarget.getAttributeNode("for");
          //console.log(attrFor.value);
          let unSelectCard = helper.getID(attrFor.value);
          unSelectCard.classList.remove("disable");

          let index = selectedPokes
            .map((item) => item.id)
            .indexOf(attrFor.value);
          selectedPokes.splice(index, 1);
          console.log(index);
        });

        selectedDiv.append(btnItemClose);

        displaySelectedPoke.append(selectedDiv);
      } else {
        //span.classList.add("close");
        sessionStorage.setItem("manualpoke", JSON.stringify(selectedPokes));
        alert("Limit Reached");
      }

      //console.log(element.id);
    });
  });
  console.log(data);
  span.addEventListener("click", () => {
    if (selectedPokes.length < 20) {
      alert("You must select exactly 20 cards");
      modal.style.display = "flex";
      modal.style.flexDirection = "row";
    } else {
      createCardDeck(true);
    }
  });
  //return selectedPokes;
};

export { createCardDeck, createDeckManually };
