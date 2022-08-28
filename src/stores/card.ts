import { defineStore } from "pinia";
import { Deck } from "@/constants/deck";

export const cardStore = defineStore({
  id: "card",
  state: () => ({
    deck: new Deck(),
    index: 0,
  }),
  getters: {
    card: (state) => state.deck.getCard(state.index),
    isLastCard: (state) => state.index + 1 === state.deck.cardCount(),
    isFirstCard: (state) => state.index === 0,
  },
  actions: {
    nextCard() {
      if (this.index + 1 < this.deck.cardCount()) {
        this.index++;
      }
    },
    prevCard() {
      if (this.index > 0) {
        this.index--;
      }
    },
  },
});
