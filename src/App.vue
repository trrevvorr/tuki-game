<template>
  <RouterView />
  <div class="connection-status">
    <v-icon v-if="connectedConnections.length" large color="green darken-4">
      mdi-lan-connect
    </v-icon>
    <v-icon v-else-if="isHost || isJoin" large color="red darken-4"> mdi-lan-disconnect </v-icon>
  </div>
</template>

<script>
import { RouterView } from "vue-router";
import { connectionStore } from "@/stores/connection";
import { mapGetters } from "pinia";

export default {
  components: {
    RouterView,
  },
  computed: {
    ...mapGetters(connectionStore, ["connectedConnections", "isHost", "isJoin"]),
  },
};
</script>

<style scoped>
.connection-status {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
}
</style>