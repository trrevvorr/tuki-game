<template>
  <span class="wrapper">
    <div class="card-wrapper" :style="{ maxWidth: `calc(var(--vh, 1vh) * ${widthMultiplier}` }">
      <div class="card">
        <div v-for="(col, x) in matrix" :key="'x-' + x" class="column">
          <CardCell
            v-for="(cell, y) in col.slice().reverse()"
            :key="'y-' + y"
            class="cell"
            :value="cell"
          />
        </div>
      </div>
      <div class="snow" v-if="settings.snow"></div>
    </div>
    <span class="settings">
      <CardSettings
        :settings="settings"
        :modifiers="modifiers"
        @change="(newSettings) => $emit('change', newSettings)"
      />
    </span>
  </span>
</template>

<script>
import CardCell from "@/components/CardCell.vue";
import CardSettings from "@/components/CardSettings.vue";

export default {
  components: {
    CardCell,
    CardSettings,
  },
  emits: ["change"],
  props: {
    pieces: {
      required: true,
      type: Array,
    },
    settings: {
      required: true,
      type: Object,
    },
    modifiers: {
      required: true,
      type: Array,
    },
  },
  computed: {
    matrix() {
      const maxX = this.pieces.reduce((max, [start, end]) => Math.max(max, end[0]), 0);
      const maxY = this.pieces.reduce((max, [start, end]) => Math.max(max, end[1]), 0);
      const matrix = Array.from(Array(maxX + 1), () => Array.from(Array(maxY + 1), () => 0));

      this.pieces.forEach(([start, end], index) => {
        for (let x = start[0]; x <= end[0]; x++) {
          for (let y = start[1]; y <= end[1]; y++) {
            matrix[x][y] = index + 1;
          }
        }
      });

      if (this.settings.rotate === -1) {
        // rotate counter-clockwise
        return matrix[0].map((val, index) => matrix.map((row) => row[row.length - 1 - index]));
      } else if (this.settings.rotate === 1) {
        // rotate clockwise
        return matrix[0].map((val, index) => matrix.map((row) => row[index]).reverse());
      } else {
        return matrix;
      }
    },
    widthMultiplier() {
      if (this.matrix.length) {
        const colCount = this.matrix.length;
        const rowCount = this.matrix[0].length;
        const hightRangeModifier = 1.5; // variable to control relative max height

        const ratio = Math.round(100 * (colCount / rowCount / hightRangeModifier));

        return ratio;
      } else {
        return 100;
      }
    },
  },
};
</script>

<style scoped>
.wrapper {
  position: relative;
}

.card-wrapper {
  margin: auto;
}

.card {
  display: grid;
  grid-auto-columns: minmax(0, 1fr);
  grid-auto-flow: column;
}

.column {
  display: grid;
  grid-template-columns: 1rem;
  display: block;
}

.snow {
  display: block;
  height: 2rem;
  border-radius: 1rem;
  width: 100%;
  background-color: white;
  margin-top: 1rem;
  border: 1px solid #7a9852;
}

.settings {
  position: fixed;
  top: 1rem;
  right: 1rem;
}
</style>