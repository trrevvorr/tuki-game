<template>
  <div class="connection">
    <h2>Join Connection</h2>

    <div class="scan step" v-show="step == steps.INITIAL || step == steps.SCAN">
      <v-btn @click="scan" v-if="step == steps.INITIAL"> Scan Host's QR Code </v-btn>
      <div class="step" v-show="step === steps.SCAN">
        <video ref="scanner" :style="{ maxWidth: '100%' }"></video>
        <v-text-field
          label="or paste invitation token here"
          class="input-field"
          hide-details="auto"
          v-model="remoteOffer"
          @change="acceptInvitation"
          variant="outlined"
          density="compact"
        ></v-text-field>
      </div>
    </div>
    <div class="qrcode step" v-show="[steps.ACCEPTED, steps.QR].includes(step)">
      <v-btn @click="generateResponse" v-if="step === steps.ACCEPTED">
        Generate Response Token
      </v-btn>
      <div class="step" v-show="step === steps.QR">
        <canvas ref="canvas"></canvas>
        <v-text-field
          hide-details="auto"
          v-model="answerToken"
          readonly
          density="compact"
          class="input-field"
          variant="outlined"
        ></v-text-field>
        <div>Ask host to scan QR code.</div>
      </div>
    </div>
    <div class="message step" v-if="step === steps.CONNECTED">
      <v-text-field
        label="message"
        hide-details="auto"
        v-model="message"
        :disabled="step !== steps.CONNECTED"
        class="input-field"
      ></v-text-field>
      <br />
      <v-btn @click="sendMessage" :disabled="step !== steps.CONNECTED"> Send </v-btn>
    </div>
    <v-snackbar v-model="snackbar">
      {{ snackbarMessage }}
    </v-snackbar>
  </div>
</template>

<script>
import { initJoin, sendMessage } from "@/utils/webRtcConnection";
import QRCode from "qrcode";
import QrScanner from "qr-scanner";

const steps = Object.freeze({
  INITIAL: "INITIAL",
  SCAN: "SCAN",
  ACCEPTED: "ACCEPTED",
  QR: "QR",
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
      qrScanner: null,
    };
  },
  mounted() {
    this.qrScanner = new QrScanner(
      this.$refs.scanner,
      (result) => {
        console.log("decoded qr code:", result);
        if (typeof result.data === "string") {
          this.remoteOffer = result.data;
          this.acceptInvitation();
        }
      },
      { highlightScanRegion: true, highlightCodeOutline: true, returnDetailedScanResult: true }
    );
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
        this.qrScanner.stop();
      });
    },
    async generateResponse() {
      console.log("answer token", this.answerToken);
      this.renderQrCode(this.answerToken);
      this.step = steps.QR;
    },
    async sendMessage() {
      sendMessage(this.channel, this.message);
      this.message = "";
    },
    onConnectionOpen() {
      this.step = steps.CONNECTED;
    },
    displayMessage(text) {
      this.snackbarMessage = text;
      this.snackbar = true;
    },
    renderQrCode(dataString) {
      QRCode.toCanvas(this.$refs.canvas, dataString, { errorCorrectionLevel: "L" }).catch((err) => {
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
  max-width: 1280px;
  margin: auto;
  text-align: center;
}

h2 {
  margin-bottom: 1rem;
}

li {
  margin-bottom: 0.5rem;
}

.step {
  justify-items: center;
  display: grid;
}

.input-field {
  max-width: 20rem;
  margin-top: 1rem;
  width: 100%;
}

.qrcode canvas {
  max-width: calc(100vw - 6rem);
  max-height: calc(100vw - 6rem);
}
</style>