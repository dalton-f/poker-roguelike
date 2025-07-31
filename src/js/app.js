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

const cardValueSortingOrder = {
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
  10: 10,
  JACK: 11,
  QUEEN: 12,
  KING: 13,
  ACE: 14,
};
const cardSuitSortingOrder = {
  SPADES: 4,
  HEARTS: 3,
  CLUBS: 2,
  DIAMONDS: 1,
};

const drawnCardsDisplay = document.getElementById("drawnCardsDisplay");
const sortByRankButton = document.getElementById("sortByRankButton");
const sortBySuitButton = document.getElementById("sortBySuitButton");

document.addEventListener("DOMContentLoaded", async () => {
  const deckManager = new DeckManager();

  const deckData = await deckManager.generateDeck();

  let { cards: drawnCards } = await deckManager.drawCards(8);

  drawnCards = sortCardsByValue(drawnCards);

  displayCards(drawnCards);

  const checkboxes = Array.from(
    document.querySelectorAll("input[type='checkbox']"),
  );
  let selectedCheckboxes = [];

  // Allow right click to unselect all cards
  document.addEventListener("contextmenu", (e) => {
    e.preventDefault();
    for (const checkbox of checkboxes) checkbox.checked = false;
  });

  for (const checkbox of checkboxes) {
    checkbox.addEventListener("change", () => {
      selectedCheckboxes = checkboxes.filter((cb) => cb.checked);

      // Grab the ids from the checkbox input to store the cards directly
      gameState.selectedCards = selectedCheckboxes.map(
        (cb) => drawnCards[cb.id],
      );

      // Prevent the user from selecting more than 5 cards
      if (gameState.selectedCards.length >= 6) checkbox.checked = false;

      console.log(gameState.selectedCards);
    });
  }

  sortByRankButton.addEventListener("click", () => {
    drawnCards = sortCardsByValue(drawnCards);

    displayCards(drawnCards);
  });

  sortBySuitButton.addEventListener("click", () => {
    drawnCards = sortCardsBySuit(drawnCards);

    displayCards(drawnCards);
  });
});

const sortCardsByValue = (drawnCards) =>
  drawnCards.sort(
    (a, b) => cardValueSortingOrder[b.value] - cardValueSortingOrder[a.value],
  );

const sortCardsBySuit = (drawnCards) =>
  drawnCards.sort(
    (a, b) => cardSuitSortingOrder[b.suit] - cardSuitSortingOrder[a.suit],
  );

const displayCards = (drawnCards) => {
  drawnCardsDisplay.innerHTML = "";

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
