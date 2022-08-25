<template>
  <v-menu :close-on-content-click="false" location="start">
    <template v-slot:activator="{ props }">
      <v-btn v-bind="props" icon class="settings-button" size="small"
        ><v-icon> mdi-cog </v-icon></v-btn
      >
    </template>
    <v-list>
      <v-list-item
        @click="$emit('change', { ...settings, snow: !settings.snow })"
        :disabled="!modifiers.includes(mods.SNOW)"
      >
        <template v-slot:prepend>
          <v-icon v-if="settings.snow"> mdi-snowflake-off</v-icon>
          <v-icon v-else> mdi-snowflake</v-icon>
        </template>
        <v-list-item-title>{{ settings.snow ? "Remove" : "Add" }} Snow</v-list-item-title>
      </v-list-item>
      <v-list-item
        @click="$emit('change', { ...settings, rotate: settings.rotate - 1 })"
        :disabled="!modifiers.includes(mods.ROTATE_LEFT) || settings.rotate === -1"
      >
        <template v-slot:prepend>
          <v-icon> mdi-rotate-left </v-icon>
        </template>
        <v-list-item-title>Rotate Left</v-list-item-title>
      </v-list-item>
      <v-list-item
        @click="$emit('change', { ...settings, rotate: settings.rotate + 1 })"
        :disabled="!modifiers.includes(mods.ROTATE_RIGHT) || settings.rotate === 1"
      >
        <template v-slot:prepend>
          <v-icon> mdi-rotate-right </v-icon>
        </template>
        <v-list-item-title>Rotate Right</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
import mods from "@/constants/modifiers.json";

export default {
  props: {
    settings: {
      required: true,
      type: Object,
    },
    modifiers: {
      required: true,
      type: Array,
    },
  },
  emits: ["change"],
  data() {
    return {
      mods,
    };
  },
};
</script>

<style scoped></style>