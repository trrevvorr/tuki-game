<template>
  <div class="connection">
    <ol>
      <li>
        <v-btn
          @click="generateInvitation"
          :disabled="![steps.INITIAL, steps.INVITED].includes(step)"
        >
          Generate Invitation Token
        </v-btn>
        <canvas
          v-show="offerToken && [steps.INITIAL, steps.INVITED].includes(step)"
          ref="canvas"
        ></canvas>
      </li>
      <li>Peer scans QR code</li>
      <li>Scan peer's QR code</li>
      <li v-show="step == steps.INVITED || step == steps.SCAN">
        <v-btn @click="scan"> Scan QR Code </v-btn>
        <div v-show="step === steps.SCAN">
          <video ref="scanner"></video>
          <v-text-field
            label="paste response token here"
            hide-details="auto"
            v-model="answer"
            @change="acceptResponse"
            density="compact"
          ></v-text-field>
        </div>
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
import { initHost, hostAccept, sendMessage } from "@/utils/webRtcConnection";
import QRCode from "qrcode";
import QrScanner from "qr-scanner";

const steps = Object.freeze({
  INITIAL: "INITIAL",
  INVITED: "INVITED",
  SCAN: "SCAN",
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
      answer: "",
      message: "",
      step: steps.INITIAL,
      steps,
      offerToken: "",
      qrScanner: null,
    };
  },
  mounted() {
    this.qrScanner = new QrScanner(
      this.$refs.scanner,
      (result) => {
        console.log("decoded qr code:", result);
        if (typeof result.data === "string") {
          this.answer = result.data;
          this.acceptResponse();
        }
      },
      { highlightScanRegion: true, highlightCodeOutline: true, returnDetailedScanResult: true }
    );
  },
  watch: {
    offerToken() {
      console.log("offer token", this.offerToken);
      this.copy(this.offerToken);
      this.renderQrCode(this.offerToken);
    },
  },
  methods: {
    generateInvitation() {
      return initHost(
        (e) => this.onConnectionOpen(),
        (e) => this.displayMessage(e.data),
        (state) => this.$emit("connection", state),
        (e) => console.log("onIceConnectionStateChange", e),
        (offerToken) => (this.offerToken = offerToken)
      ).then((output) => {
        this.connection = output.connection;
        this.channel = output.channel;
        console.info("connection established as host");
        this.step = steps.INVITED;
      });
    },
    acceptResponse() {
      return hostAccept(this.connection, this.answer).then(() => {
        this.step = steps.ACCEPTED;
        this.qrScanner.stop();
      });
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
    renderQrCode(dataString) {
      QRCode.toCanvas(this.$refs.canvas, dataString).catch((err) => {
        console.error(err);
      });
    },
    scan() {
      this.step = steps.SCAN;
      this.qrScanner.start();
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