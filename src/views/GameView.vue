<template>
  <main>
    <TheCard :pieces="card.pieces" :snow="true" />
  </main>
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