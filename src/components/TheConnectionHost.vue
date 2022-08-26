<template>
  <div class="connection">
    <ol>
      <li><v-btn @click="generateInvitation"> Generate Invitation Token </v-btn></li>
      <li>Send invitation token to peer</li>
      <li>Ask peer for response token</li>
      <li>
        <v-text-field
          label="paste response token here"
          hide-details="auto"
          v-model="answer"
          @change="acceptResponse"
          density="compact"
        ></v-text-field>
      </li>
    </ol>
    <br />
    <br />
    <v-text-field label="message" hide-details="auto" v-model="message"></v-text-field>
    <br />
    <v-btn @click="sendMessage"> Send </v-btn>
    <v-snackbar v-model="snackbar">
      {{ snackbarMessage }}
    </v-snackbar>
  </div>
</template>

<script>
export default {
  props: {},
  emits: ["connection"],
  data() {
    return {
      snackbar: false,
      snackbarMessage: "",
      connection: null,
      channel: null,
      answer: "",
      message: "",
    };
  },
  created() {
    this.connection = new RTCPeerConnection({
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
    });

    this.connection.ondatachannel = (event) => {
      console.log("ondatachannel");
      this.channel = event.channel;
      // channel.onopen = event => console.log('onopen', event);
      // channel.onmessage = event => console.log('onmessage', event);
      this.channel.onmessage = (event) => this.displayMessage("Received: " + event.data);
    };

    this.connection.onconnectionstatechange = (event) => {
      console.log("onconnectionstatechange", this.connection.connectionState);
      this.$emit("connection", this.connection.connectionState);
    };
    this.connection.oniceconnectionstatechange = (event) =>
      console.log("oniceconnectionstatechange", this.connection.iceConnectionState);
  },
  methods: {
    async generateInvitation() {
      this.channel = this.connection.createDataChannel("data");
      // channel.onopen = event => console.log('onopen', event)
      // channel.onmessage = event => console.log('onmessage', event)
      this.channel.onmessage = (event) => this.displayMessage("Received: " + event.data);

      this.connection.onicecandidate = (event) => {
        console.log("onicecandidate", event);
        console.log(
          "connection.localDescription",
          JSON.stringify(this.connection.localDescription)
        );
        if (!event.candidate) {
          this.copy(JSON.stringify(this.connection.localDescription));
        }
      };

      const offer = await this.connection.createOffer();
      await this.connection.setLocalDescription(offer);
    },
    async acceptResponse() {
      const answer = JSON.parse(this.answer);
      await this.connection.setRemoteDescription(answer);
    },
    async sendMessage() {
      this.channel.send(this.message);
    },
    copy(text) {
      navigator.clipboard
        .writeText(text)
        .then(() => {
          this.displayMessage("copied to clipboard");
        })
        .catch((err) => {
          console.error(err);
          this.displayMessage("failed to copy to clipboard");
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