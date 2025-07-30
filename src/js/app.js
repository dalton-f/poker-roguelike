import { DeckManager } from "./components/deckManager";

const gameState = {
  totalHandsPerBlind: 4,
  remainingHands: 4,
  totalDiscardsPerBlind: 3,
  remainingDiscards: 3,
  totalAntes: 8,
  currentAnte: 1,
  currentRound: 1,
  targetScore: 300,
  currentScore: 0,
  currentMoney: 4,
  selectedCards: [],
};

const drawnCardsDisplay = document.getElementById("drawnCardsDisplay");

document.addEventListener("DOMContentLoaded", async () => {
  const deckManager = new DeckManager();

  const deckData = await deckManager.generateDeck();

  const { cards: drawnCards } = await deckManager.drawCards(8);

  displayCards(drawnCards);
});

const displayCards = (drawnCards) => {
  for (let i = 0; i < drawnCards.length; i++) {
    const drawnCard = drawnCards[i];

    const container = document.createElement("div");
    container.classList.add("group");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = i;
    checkbox.classList.add("sr-only");

    const label = document.createElement("label");
    label.htmlFor = i;
    label.classList.add("cursor-pointer");

    const image = document.createElement("img");
    image.src = drawnCard.image;
    image.classList.add(
      "max-w-30",
      "object-cover",
      "transition-transform",
      "duration-150",
      "ease-linear",
      "group-has-[input:checked]:translate-y-[-2rem]",
    );

    label.appendChild(image);

    container.appendChild(checkbox);
    container.appendChild(label);

    drawnCardsDisplay.appendChild(container);
  }
};
