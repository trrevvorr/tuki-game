<template>
  <div class="game">
    <div class="card">
      <TheCard :pieces="card.pieces" :settings="card.settings" :modifiers="card.modifiers" />
    </div>

    <div class="controls">
      <v-btn @click="handlePrevCard" :disabled="isFirstCard">
        <v-icon left> mdi-arrow-left </v-icon>
        Previous
      </v-btn>

      <span class="spacer"></span>

      <v-btn @click="handleNextCard" :disabled="isLastCard">
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
import { connectionStore } from "@/stores/connection";
import { cardStore } from "@/stores/card";
import { mapActions, mapGetters } from "pinia";

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
    return {};
  },
  mounted() {
    this.syncHostToPeers();
  },
  computed: {
    ...mapGetters(connectionStore, ["isHost"]),
    ...mapGetters(cardStore, ["card", "isLastCard", "isFirstCard"]),
  },
  methods: {
    ...mapActions(cardStore, ["nextCard", "prevCard", "syncHostToPeers"]),
    handleNextCard() {
      if (!this.isLastCard) {
        this.nextCard();
      }
    },
    handlePrevCard() {
      if (!this.isFirstCard) {
        this.prevCard();
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