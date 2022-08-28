<template>
  <div class="connection">
    <div class="options" v-if="!isHost && !isJoin">
      <h2>Connect</h2>
      <p>Connect devices to play together!</p>
      <v-btn @click="setMode('HOST')"> Host New Connection</v-btn>
      <v-btn @click="setMode('JOIN')"> Join A Connection</v-btn>
    </div>

    <div class="view" v-if="!complete">
      <TheConnectionHost v-if="isHost" @complete="complete = true" />
      <TheConnectionJoin v-if="isJoin" @complete="complete = true" />
    </div>

    <div v-else class="finished-step">
      <h2>You're Connected!</h2>
      <v-btn @click="$router.push('/')"> {{isHost ? 'Start Game' : 'Join Game' </v-btn>
      <v-btn v-if="isHost" @click="complete = false"> Add Another Connection </v-btn>
    </div>

    <v-btn icon class="nav-button" size="small" @click="$router.push('/')"
      ><v-icon> mdi-gamepad </v-icon></v-btn
    >
  </div>
</template>

<script>
import TheConnectionHost from "@/components/TheConnectionHost.vue";
import TheConnectionJoin from "@/components/TheConnectionJoin.vue";
import { connectionStore } from "@/stores/connection";
import { mapActions, mapGetters } from "pinia";

export default {
  components: {
    TheConnectionHost,
    TheConnectionJoin,
  },
  data() {
    return {
      complete: false,
    };
  },
  computed: {
    ...mapGetters(connectionStore, ["isHost", "isJoin"]),
  },
  methods: {
    ...mapActions(connectionStore, ["setMode"]),
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

.nav-button {
  position: fixed;
  top: 1rem;
  left: 1rem;
}

.finished-step {
  padding-top: 1rem;
  padding-bottom: 1rem;
  justify-items: center;
  display: grid;
  row-gap: 1rem;
}
</style>