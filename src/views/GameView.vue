<template>
  <main>
    <TheCard :pieces="card.pieces" :snow="snow" />
  </main>

  <v-checkbox v-model="snow" label="Snow" hide-details></v-checkbox>
</template>

<script>
import TheCard from "@/components/TheCard.vue";
import cards from "@/constants/cards.json";

export default {
  components: {
    TheCard,
  },
  props: {},
  data() {
    return {
      cardIndex: 0,
      snow: false,
      cards: cards,
    };
  },
  computed: {
    card() {
      return this.cards[this.cardIndex];
    },
  },
};
</script>