<template>
  <div class="game">
    <div class="card">
      <TheCard
        :pieces="card.pieces"
        :snow="cardSettings[cardIndex].snow"
        :rotate="cardSettings[cardIndex].rotate"
      />
    </div>

    <div class="spacer"></div>

    <div class="controls">
      <v-sheet class="card-modifiers" color="white" elevation="1" rounded="true">
        <v-checkbox
          v-model="cardSettings[cardIndex].snow"
          label="Snow"
          hide-details
          :disabled="!card.modifiers.includes(modifiers.SNOW)"
        ></v-checkbox>
        <span class="spacer"></span>
        <v-btn
          icon
          @click="cardSettings[cardIndex].rotate--"
          :disabled="
            !card.modifiers.includes(modifiers.ROTATE_LEFT) || cardSettings[cardIndex].rotate === -1
          "
        >
          <v-icon> mdi-rotate-left </v-icon>
        </v-btn>
        <v-btn
          icon
          @click="cardSettings[cardIndex].rotate++"
          :disabled="
            !card.modifiers.includes(modifiers.ROTATE_RIGHT) || cardSettings[cardIndex].rotate === 1
          "
        >
          <v-icon> mdi-rotate-right </v-icon>
        </v-btn>
        <span class="spacer"></span>
        <v-btn @click="randomizeModifiers"> Re-Randomize </v-btn>
      </v-sheet>
      <div class="card-navigation">
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