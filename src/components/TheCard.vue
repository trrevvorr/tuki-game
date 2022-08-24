<template>
  <div class="card-wrapper">
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

      return matrix;
    },
  },
};
</script>

<style scoped>
.card {
  display: grid;
  grid-auto-columns: minmax(0, 1fr);
  grid-auto-flow: column;
}
.card-wrapper {
  background-color: #e7f3d5;
  opacity: 1;
  background-image: radial-gradient(#7a9852 0.5px, #f1f8e7 0.5px);
  background-size: 10px 10px;
  background-repeat: repeat;

  padding: 1rem;
  border-radius: 1rem;
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