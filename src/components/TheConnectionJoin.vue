<template>
  <div class="connection">
    <ol>
      <li>Ask host for invitation token</li>
      <li>
        <v-text-field
          label="paste invitation token here"
          hide-details="auto"
          v-model="remoteOffer"
          @change="acceptInvitation"
          density="compact"
          :disabled="step !== steps.INITIAL"
        ></v-text-field>
      </li>
      <li>
        <v-btn @click="generateResponse" :disabled="step !== steps.ACCEPTED">
          Generate Response Token
        </v-btn>
      </li>
    </ol>
    <br />
    <br />
    <v-text-field
      label="message"
      hide-details="auto"
      v-model="message"
      :disabled="step !== steps.CONNECTED"
    ></v-text-field>
    <br />
    <v-btn @click="sendMessage" :disabled="step !== steps.CONNECTED"> Send </v-btn>
    <v-snackbar v-model="snackbar">
      {{ snackbarMessage }}
    </v-snackbar>
  </div>
</template>

<script>
import { initJoin, sendMessage } from "@/utils/webRtcConnection";

const steps = Object.freeze({
  INITIAL: "INITIAL",
  ACCEPTED: "ACCEPTED",
  CONNECTED: "CONNECTED",
});

export default {
  props: {},
  emits: ["connection"],
  data() {
    return {
      snackbar: false,
      snackbarMessage: "",
      connection: null,
      channel: null,
      remoteOffer: "",
      answer: "",
      message: "",
      answerToken: "",
      step: steps.INITIAL,
      steps,
    };
  },
  methods: {
    async acceptInvitation() {
      initJoin(
        this.remoteOffer,
        (event) => (this.channel = event.channel),
        (e) => this.onConnectionOpen(),
        (e) => this.displayMessage(e.data),
        (state) => this.$emit("connection", state),
        (event) => console.log("onIceConnectionStateChange", event),
        (answerToken) => (this.answerToken = answerToken)
      ).then((connectionOut) => {
        this.connection = connectionOut;
        console.info("connection established as join");
        this.step = steps.ACCEPTED;
      });

      const offer = JSON.parse(this.remoteOffer);
      await this.connection.setRemoteDescription(offer);
    },
    async generateResponse() {
      this.copy(this.answerToken);
    },
    async sendMessage() {
      sendMessage(this.channel, this.message);
      this.message = "";
    },
    onConnectionOpen() {
      this.step = steps.CONNECTED;
    },
    copy(text) {
      navigator.clipboard.writeText(text).then(() => {
        this.displayMessage("copied to clipboard");
      });
    },
    displayMessage(text) {
      this.snackbarMessage = text;
      this.snackbar = true;
    },
  },
};
</script>

<style scoped>
.connection {
  padding: 2rem;
  max-width: 1280px;
  margin: auto;
}

li {
  margin-bottom: 0.5rem;
}
</style>