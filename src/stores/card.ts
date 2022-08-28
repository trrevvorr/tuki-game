import { defineStore } from "pinia";
import { Deck } from "@/constants/deck";
import { connectionStore } from "./connection";
import type { CardWithSettings } from "@/types/card";

export const cardStore = defineStore({
  id: "card",
  state: () => ({
    deck: new Deck(),
    index: 0,
  }),
  getters: {
    card: (state): CardWithSettings | null => {
      if (connectionStore().isJoin) {
        const lastMessage = connectionStore().lastMessage;
        return lastMessage === null ? null : JSON.parse(lastMessage);
      } else {
        return state.deck.getCard(state.index);
      }
    },
    isLastCard: (state) => {
      if (connectionStore().isJoin) {
        return true;
      } else {
        return state.index + 1 === state.deck.cardCount();
      }
    },
    isFirstCard: (state) => {
      if (connectionStore().isJoin) {
        return true;
      } else {
        return state.index === 0;
      }
    },
  },
  actions: {
    nextCard() {
      if (this.index + 1 < this.deck.cardCount() && !connectionStore().isJoin) {
        this.index++;
        this.syncHostToPeers();
      }
    },
    prevCard() {
      if (this.index > 0 && !connectionStore().isJoin) {
        this.index--;
        this.syncHostToPeers();
      }
    },
    syncHostToPeers() {
      if (connectionStore().isHost) {
        connectionStore().sendMessage(JSON.stringify(this.deck.getCard(this.index)));
      }
    },
  },
});
