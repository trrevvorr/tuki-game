<template>
  <div class="connection">
    <div class="options" v-if="mode === 'NONE'">
      <h2>Connect</h2>
      <p>Connect devices to play together!</p>
      <v-btn @click="mode = 'HOST'"> Host New Connection</v-btn>
      <v-btn @click="mode = 'JOIN'"> Join A Connection</v-btn>
    </div>

    <div class="view">
      <TheConnectionHost v-if="mode === 'HOST'" @connection="(val) => (connectionState = val)" />
      <TheConnectionJoin v-if="mode === 'JOIN'" @connection="(val) => (connectionState = val)" />
    </div>

    <v-btn icon class="nav-button" size="small" @click="$router.push('/')"
      ><v-icon> mdi-gamepad </v-icon></v-btn
    >
    <div class="connection-status">
      <v-icon v-if="connectionState == 'connected'" large color="green darken-3">
        mdi-lan-connect
      </v-icon>
      <v-icon v-else-if="connectionState === 'connecting'" large color="amber">
        mdi-lan-pending
      </v-icon>
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
      connectionState: "disconnected",
      mode: "NONE",
    };
  },
};
</script>

<style scoped>
.connection {
  margin: auto;
  /* padding: 0.5rem 1rem; */
  padding-bottom: 1rem;
  max-width: 50rem;
  background-color: white;
  position: relative;
  text-align: center;
}

.options {
  padding: 2rem;
  max-width: 20rem;
  margin: auto;
  display: grid;
  row-gap: 1rem;
}

.view {
  padding: 2rem;
}

.connection-status {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
}

.nav-button {
  position: fixed;
  top: 1rem;
  left: 1rem;
}
</style>