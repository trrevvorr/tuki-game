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
      <v-btn @click="prevCard" :disabled="cardIndex === 0">
        <v-icon left> mdi-arrow-left </v-icon>
        Previous
      </v-btn>

      <span class="spacer"></span>

      <v-btn @click="nextCard" :disabled="cardIndex === cards.length - 1">
        Next
        <v-icon right> mdi-arrow-right </v-icon>
      </v-btn>
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
      cards,
      modifiers,
      cardSettings: [{ snow: false, rotate: 0 }],
    };
  },
  created() {
    this.randomizeModifiers();
  },
  computed: {
    card() {
      return this.cards[this.cardIndex];
    },
  },
  methods: {
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
    nextCard() {
      if (this.cardIndex + 1 === this.cardSettings.length) {
        this.cardSettings.push([{ snow: false, rotate: 0 }]);
        this.cardIndex++;
        this.randomizeModifiers();
      } else {
        this.cardIndex++;
      }
    },
    prevCard() {
      this.cardIndex--;
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
</style>
