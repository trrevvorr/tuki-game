<template>
  <div class="connection">
    <v-tabs v-model="tab" background-color="primary">
      <v-tab value="host">Host</v-tab>
      <v-tab value="join">Join</v-tab>
    </v-tabs>

    <v-window v-model="tab">
      <v-window-item value="host">
        <TheConnectionHost @connection="(val) => (connectionState = val)" />
      </v-window-item>

      <v-window-item value="join">
        <TheConnectionJoin @connection="(val) => (connectionState = val)" />
      </v-window-item>
    </v-window>
    <v-btn @click="$router.push('/')">Play</v-btn>

    <div class="connection-status">
      <v-icon v-if="connectionState == 'connected'" large color="green darken-3">
        mdi-lan-connect
      </v-icon>
      <v-icon v-else-if="connectionState === 'connecting'" large color="amber"> mdi-lan-pending </v-icon>
      <v-icon v-else large color="red darken-4"> mdi-lan-disconnect </v-icon>
    </div>
  </div>
</template>

<script>
import TheConnectionHost from "@/components/TheConnectionHost.vue";
import TheConnectionJoin from "@/components/TheConnectionJoin.vue";

export default {
  components: {
    TheConnectionHost,
    TheConnectionJoin,
  },
  data() {
    return {
      tab: null,
      connectionState: "disconnected",
    };
  },
};
</script>

<style scoped>
.connection {
  margin: 1rem auto;
  padding: 0.5rem 1rem;
  padding-bottom: 1rem;
  max-width: 30rem;
  background-color: white;
  position: relative;
}

.connection-status {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
}
</style>