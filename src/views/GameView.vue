<template>
  <div class="game">
    <div class="card">
      <TheCard
        :pieces="card.pieces"
        :settings="cardSettings[cardIndex]"
        :modifiers="card.modifiers"
        @change="(newSettings) => (cardSettings[cardIndex] = Object.assign({}, newSettings))"
      />
    </div>

    <div class="controls">
      <v-btn @click="() => prevCard(true)" :disabled="cardIndex === 0">
        <v-icon left> mdi-arrow-left </v-icon>
        Previous
      </v-btn>

      <span class="spacer"></span>

      <v-btn @click="() => nextCard(true)" :disabled="cardIndex === cards.length - 1">
        Next
        <v-icon right> mdi-arrow-right </v-icon>
      </v-btn>
    </div>
  </div>
  <v-btn icon class="nav-button" size="small" @click="$router.push('/connect')"
    ><v-icon> mdi-lan-connect </v-icon></v-btn
  >
</template>

<script>
import TheCard from "@/components/TheCard.vue";
import cards from "@/constants/cards.json";
import modifiers from "@/constants/modifiers.json";
import { connectionStore } from "@/stores/connection";
import { mapActions } from "pinia";

const MessageEvents = Object.freeze({
  NEXT: "NEXT",
  PREV: "PREV",
});

export default {
  components: {
    TheCard,
  },
  props: {},
  data() {
    return {
      cardIndex: 0,
      cards,
      modifiers,
      cardSettings: [{ snow: false, rotate: 0 }],
    };
  },
  created() {
    this.shuffleCards();
    this.randomizeModifiers();
  },
  mounted() {
    this.setMessageHandler((message) => {
      console.info("message", message);
      if (message === MessageEvents.NEXT) {
        this.nextCard(false);
      } else if (message === MessageEvents.PREV) {
        this.prevCard(false);
      }
    });
  },
  computed: {
    card() {
      return this.cards[this.cardIndex];
    },
  },
  methods: {
    ...mapActions(connectionStore, ["setMessageHandler", "sendMessage"]),
    randomizeModifiers() {
      this.cardSettings[this.cardIndex].snow = this.card.modifiers.includes(modifiers.SNOW)
        ? !!Math.round(Math.random())
        : 0;
      const rotateRange = [
        this.card.modifiers.includes(modifiers.ROTATE_LEFT) ? -1 : 0,
        this.card.modifiers.includes(modifiers.ROTATE_RIGHT) ? 1 : 0,
      ];
      this.cardSettings[this.cardIndex].rotate =
        Math.floor(Math.random() * (rotateRange[1] - rotateRange[0] + 1)) + rotateRange[0];
    },
    nextCard(forwardToPeers) {
      if (this.cardIndex + 1 >= this.cards.length) {
        return;
      }

      if (this.cardIndex + 1 === this.cardSettings.length) {
        this.cardSettings.push([{ snow: false, rotate: 0 }]);
        this.cardIndex++;
        this.randomizeModifiers();
      } else {
        this.cardIndex++;
      }
      if (forwardToPeers) {
        this.sendMessage(MessageEvents.NEXT);
      }
    },
    prevCard(forwardToPeers) {
      if (this.cardIndex - 1 < 0) {
        return;
      }

      this.cardIndex--;
      if (forwardToPeers) {
        this.sendMessage(MessageEvents.PREV);
      }
    },
    shuffleCards() {
      for (let i = this.cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
      }
    },
  },
};
</script>

<style scoped>
.game {
  padding: 2rem;
  max-width: 1280px;
  margin: auto;
}

.controls {
  position: absolute;
  bottom: 2rem;
  width: calc(100% - 4rem);
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
}
.nav-button {
  position: fixed;
  top: 1rem;
  left: 1rem;
}
</style>