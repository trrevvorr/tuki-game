<template>
  <div class="game">
    <div class="card">
      <TheCard :pieces="card.pieces" :snow="snow" :rotate="rotate" />
    </div>

    <div class="spacer"></div>

    <div class="controls">
      <v-sheet class="card-modifiers" color="white" elevation="1" rounded="true">
        <v-checkbox
          v-model="snow"
          label="Snow"
          hide-details
          :disabled="!card.modifiers.includes(modifiers.SNOW)"
        ></v-checkbox>
        <span class="spacer"></span>
        <v-btn
          icon
          @click="rotate--"
          :disabled="!card.modifiers.includes(modifiers.ROTATE_LEFT) || rotate === -1"
        >
          <v-icon> mdi-rotate-left </v-icon>
        </v-btn>
        <v-btn
          icon
          @click="rotate++"
          :disabled="!card.modifiers.includes(modifiers.ROTATE_RIGHT) || rotate === 1"
        >
          <v-icon> mdi-rotate-right </v-icon>
        </v-btn>
        <span class="spacer"></span>
        <v-btn @click="randomizeModifiers"> Randomize </v-btn>
      </v-sheet>
      <div class="card-navigation">
        <v-btn @click="cardIndex--" :disabled="cardIndex === 0">
          <v-icon left> mdi-arrow-left </v-icon>
          Previous
        </v-btn>
        <span class="spacer"></span>
        <v-btn @click="cardIndex++" :disabled="cardIndex === cards.length - 1">
          Next
          <v-icon right> mdi-arrow-right </v-icon>
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script>
import TheCard from "@/components/TheCard.vue";
import cards from "@/constants/cards.json";
import modifiers from "@/constants/modifiers.json";

export default {
  components: {
    TheCard,
  },
  props: {},
  data() {
    return {
      cardIndex: 0,
      snow: false,
      rotate: 0,
      cards,
      modifiers,
    };
  },
  computed: {
    card() {
      return this.cards[this.cardIndex];
    },
  },
  methods: {
    randomizeModifiers() {
      this.snow = this.card.modifiers.includes(modifiers.SNOW) ? !!Math.round(Math.random()) : 0;
      const rotateRange = [
        this.card.modifiers.includes(modifiers.ROTATE_LEFT) ? -1 : 0,
        this.card.modifiers.includes(modifiers.ROTATE_RIGHT) ? 1 : 0,
      ];
      this.rotate =
        Math.floor(Math.random() * (rotateRange[1] - rotateRange[0] + 1)) + rotateRange[0];
    },
  },
};
</script>

<style scoped>
.game {
  height: 100%;
  display: grid;
  grid-template-rows: auto 1fr auto;

  max-width: 1280px;
  margin: auto;
}

.controls {
  display: grid;
  grid-template-rows: auto auto;
  row-gap: 1rem;
}

.card-modifiers {
  display: grid;
  grid-template-columns: auto 1fr auto auto 1fr auto;
  column-gap: 1rem;
  padding: 0.5rem;
  align-items: center;
}

.card-navigation {
  width: 100%;
  display: grid;
  grid-template-columns: auto 1fr auto;
}
</style>