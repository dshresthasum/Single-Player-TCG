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

function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");
  let elementToDrop = document.getElementById(data);
  if (
    ev.currentTarget.childElementCount === 0 &&
    elementToDrop.attributes.supertype.value === "Pokémon"
  ) {
    elementToDrop.style.marginTop = "0px";

    ev.currentTarget.append(elementToDrop);
  } else if (ev.currentTarget.childElementCount !== 0) {
    let lastChild = ev.currentTarget.lastChild;
    let style = window.getComputedStyle(lastChild);
    let topValue = style.getPropertyValue("margin-top");
    if (topValue === "auto") {
      topValue = 0;
    }
    if (ev.currentTarget.id === "discard-pile") {
      elementToDrop.style.marginTop = "-185px";
      elementToDrop.draggable = false;
    } else {
      elementToDrop.style.marginTop = "-150px";
    }

    elementToDrop.style.boxShadow = "0px -10px 17px rgb(54 29 217 / 51%)";
    ev.currentTarget.append(elementToDrop);
  } else {
    alert("Place Basic Pokemon Card First");
    ev.preventDefault();
  }
}

let setDroppable = (id) => {
  let element = getID(id);
  element.ondrop = drop;
  element.ondragover = allowDrop;
};

export { getID, getData, getRandom, allowDrop, drag, drop, setDroppable };
