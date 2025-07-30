export class DeckManager {
  constructor() {
    this.deckId = null;
  }

  async generateDeck() {
    const url = "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1";

    try {
      const response = await fetch(url);

      if (!response.ok)
        throw new Error("Failed to geneate the deck: ", response);

      const data = await response.json();

      this.deckId = data.deck_id;

      return data;
    } catch (error) {
      throw new Error("Failed to geneate the deck: ", error);
    }
  }

  async drawCards(count) {
    const url = `https://deckofcardsapi.com/api/deck/${this.deckId}/draw/?count=${count}`;

    if (!this.deckId) throw new Error("Generate a deck before drawing cards");

    try {
      const response = await fetch(url);

      if (!response.ok) throw new Error("Failed to draw cards: ", response);

      const data = await response.json();

      return data;
    } catch (error) {
      throw new Error("Failed to draw cards: ", error);
    }
  }
}
