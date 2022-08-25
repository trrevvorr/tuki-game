<template>
  <div class="card-wrapper" :style="{ maxWidth: maxWidth }">
    <div class="card">
      <div v-for="(row, x) in matrix" :key="'x-' + x" class="column">
        <CardCell
          v-for="(cell, y) in row.slice().reverse()"
          :key="'y-' + y"
          class="cell"
          :value="cell"
        />
      </div>
    </div>
    <div class="snow" v-if="snow"></div>
  </div>
</template>

<script>
import CardCell from "@/components/CardCell.vue";

export default {
  components: {
    CardCell,
  },
  props: {
    pieces: {
      required: true,
      type: Array,
    },
    snow: {
      required: true,
      type: Boolean,
    },
    rotate: {
      required: true,
      type: Number,
      validator: (val) => [-1, 0, 1].includes(val),
    },
  },
  computed: {
    matrix() {
      const matrix = [];

      this.pieces.forEach((piece, index) => {
        const [start, end] = piece;
        const maxX = Math.max(start[0], end[0]);
        const maxY = Math.max(start[1], end[1]);

        for (let x = 0; x <= maxX; x++) {
          if (!matrix[x]) {
            matrix.push([]);
          }
          while (matrix[x].length <= maxY) {
            matrix[x].push(0);
          }
        }

        for (let x = start[0]; x <= end[0]; x++) {
          for (let y = start[1]; y <= end[1]; y++) {
            matrix[x][y] = index + 1;
          }
        }
      });

      if (this.rotate === -1) {
        // rotate counter-clockwise
        return matrix[0].map((val, index) => matrix.map((row) => row[row.length - 1 - index]));
      } else if (this.rotate === 1) {
        // rotate clockwise
        return matrix[0].map((val, index) => matrix.map((row) => row[index]).reverse());
      } else {
        return matrix;
      }
    },
    maxWidth() {
      if (this.matrix.length) {
        const colCount = this.matrix.length;
        const rowCount = this.matrix[0].length;

        const ratio = Math.round(100 * (colCount / rowCount / 2));
        // cols = 6, rows = 12, ratio = 0.5 * 100 = 50

        return `${ratio}vh`;
      } else {
        return "100vh";
      }
    },
  },
};
</script>

<style scoped>
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
</style>