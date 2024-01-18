import * as helper from "./elements.js";
import * as urls from "./urls.js";
// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function () {
  modal.style.display = "flex";
  modal.style.flexDirection = "row";
  createDeckManually();
};

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
// window.onclick = function (event) {
//   if (event.target == modal) {
//     modal.style.display = "none";
//   }
// };

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

        let btnClose = document.createElement("button");
        btnClose.textContent = "x";

        let attr = document.createAttribute("for");
        attr.value = element.id;
        btnClose.setAttributeNode(attr);

        btnClose.addEventListener("click", (event) => {
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

        selectedDiv.append(btnClose);

        displaySelectedPoke.append(selectedDiv);
      } else {
        alert("Limit Reached");
      }

      //console.log(element.id);
    });
  });
  console.log(data);
  return selectedPokes;
};

export { createDeckManually };
