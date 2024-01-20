import * as helper from "./elements.js";
import * as urls from "./urls.js";

function isSubsetWithColorless(mainArrayEnergyCards, subArrayEnergyCost) {
  if (
    mainArrayEnergyCards.length < subArrayEnergyCost.length ||
    subArrayEnergyCost.length === 0
  )
    return false;
  const energyCardCount = countColors(mainArrayEnergyCards);
  const energyCostCount = countColors(subArrayEnergyCost);

  for (const color in energyCostCount) {
    const countInCard = energyCardCount[color] || 0;
    const countInCost = energyCostCount[color];

    if (color === "Colorless") {
      if (countInCard > countInCost) {
        return false;
      }
    } else {
      //1<3
      if (countInCard < countInCost) {
        if (countInCard === 0) return false;
        energyCardCount["Colorless"] -= countInCost - countInCard;
        if (energyCardCount["Colorless"] < 0) return false;
      }
    }
  }

  return true;
}

function countColors(array) {
  const count = {};

  for (const color of array) {
    count[color] = (count[color] || 0) + 1;
  }

  return count;
}

helper.getID("attackBoss").addEventListener("click", () => {
  let activeStack = JSON.parse(sessionStorage.getItem("activeStack"));
  let baseEnergyCost = activeStack.attacks[0].convertedEnergyCost;
  let message = "";
  const result = isSubsetWithColorless(
    activeStack.energy,
    activeStack.attacks[0].cost
  );

  console.log(
    result
      ? alert("Damage Dealt: " + activeStack.attacks[0].damage)
      : alert("Attack Not allowed. Insufficient energy")
  );
});
