<template>
  <RouterView />
  <div class="connection-status">
    <v-badge
      v-if="activeConnectionsCount"
      :content="isHost ? activeConnectionsCount : ''"
      color="transparent"
      text-color="green darken-4"
    >
      <v-icon large color="green darken-4"> mdi-lan-connect </v-icon>
    </v-badge>
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
    ...mapGetters(connectionStore, [
      "lastConnectionChangeAt",
      "allConnections",
      "isHost",
      "isJoin",
    ]),
  },
  data() {
    return {
      activeConnectionsCount: 0,
    };
  },
  watch: {
    lastConnectionChangeAt() {
      this.activeConnectionsCount = this.allConnections.filter(
        (conn) => conn.connection.connectionState === "connected"
      ).length;
    },
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