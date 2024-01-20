const getID = (id) => document.getElementById(id);

const getData = (url) =>
  fetch(url)
    .then((response) => response.json())
    .then((response) => response.data);

const getRandom = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

let zIndexActiveSpot = 100;
function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");
  //cases 1. childelement 0 & supertype Pokemon
  //2. childelemnt !0
  let curTarget = ev.currentTarget;
  let elementToDrop = document.getElementById(data);
  let elementSuperType = elementToDrop.attributes.supertype.value;

  if (curTarget.childElementCount === 0 && elementSuperType === "Pokémon") {
    elementToDrop.style.marginTop = "0px";
    elementToDrop.style.zIndex = zIndexActiveSpot;
    curTarget.append(elementToDrop);
    if (curTarget.className === "activeSpot") {
      getID("attackBoss").style.display = "block";
      //store few pokemon stat in session storage
      let deckCards = JSON.parse(sessionStorage.getItem("deckCards"));
      let card = deckCards.filter((card) => card.id === elementToDrop.id);
      let result = (({ id, attacks, hp, weaknesses }) => ({
        id,
        attacks,
        hp,
        weaknesses,
      }))(card[0]);
      result.energy = [];

      sessionStorage.setItem("activeStack", JSON.stringify(result));
    }
  } else if (curTarget.childElementCount !== 0) {
    if (elementSuperType === "Pokémon" && curTarget.className !== "discard") {
      alert("Only one pokemon card allowed in the stack");
    } else {
      let lastChild = curTarget.lastChild;
      let style = window.getComputedStyle(lastChild);
      let topValue = style.getPropertyValue("margin-top");
      if (topValue === "auto") {
        topValue = 0;
      }
      if (curTarget.id === "discard-pile") {
        elementToDrop.style.marginTop = "-185px";
        elementToDrop.draggable = false;
      } else {
        elementToDrop.style.marginTop = "-170px";
      }

      if (
        curTarget.className === "activeSpot" &&
        elementSuperType !== "Pokémon"
      ) {
        let deckCards = JSON.parse(sessionStorage.getItem("deckCards"));
        let card = deckCards.filter((card) => card.id === elementToDrop.id);
        let activeStack = JSON.parse(sessionStorage.getItem("activeStack"));
        activeStack.energy.push(card[0].name.split(" ")[0]);
        sessionStorage.setItem("activeStack", JSON.stringify(activeStack));
        elementToDrop.style.marginTop = "-230px";
        elementToDrop.style.zIndex = --zIndexActiveSpot;
      }

      elementToDrop.style.boxShadow = "0px -10px 17px rgb(54 29 217 / 51%)";
      curTarget.append(elementToDrop);
    }
  } else {
    if (curTarget.className === "discard") {
      elementToDrop.style.marginTop = "0px";
      curTarget.append(elementToDrop);
    } else alert("Place Basic Pokemon Card First");
  }
}

let setDroppable = (id) => {
  let element = getID(id);
  element.ondrop = drop;
  element.ondragover = allowDrop;
};

export { getID, getData, getRandom, allowDrop, drag, drop, setDroppable };
