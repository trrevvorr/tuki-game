<template>
  <span
    :style="{
      // background: `linear-gradient(315deg, ${colorMap[value]} 0%, ${colorMap[value]}90 100%`,
      background: colorMap[value],
    }"
    :class="{ cell: true, piece: !!value }"
  ></span>
</template>

<script>
import colorMap from "@/constants/colorMap.json";

export default {
  props: {
    value: {
      required: true,
      type: Number,
    },
  },
  data() {
    return {
      colorMap: colorMap,
    };
  },
};
</script>

<style scoped>
.cell {
  display: block;
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 100%;
}

.cell.piece {
  box-shadow: inset 0px 0px 0px 2px #0000003d;
}
</style>