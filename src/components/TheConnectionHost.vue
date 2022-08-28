<template>
  <div class="connection">
    <h2>Host Connection</h2>
    <div class="qrcode step" v-show="offerToken && [steps.INITIAL, steps.INVITED].includes(step)">
      <h3>Invite User</h3>
      <div>Ask user to join your connection by having them scan the QR code below.</div>
      <canvas ref="canvas"></canvas>
      <v-text-field
        hide-details="auto"
        v-model="offerToken"
        readonly
        density="compact"
        class="input-field"
        variant="outlined"
      ></v-text-field>
    </div>
    <div class="qrcode-scanner step" v-show="[steps.SCAN, steps.PEER_ACCEPTED].includes(step)">
      <h3>Accept User Response</h3>
      <div>Ask user to to generate a reponse QR code for you to scan.</div>
      <v-btn v-if="step === steps.PEER_ACCEPTED" @click="scan"> Scan QR Code </v-btn>
      <div class="step" v-show="step === steps.SCAN">
        <video ref="scanner" :style="{ maxWidth: '100%' }"></video>
        <br />
        <v-text-field
          label="or paste response token here"
          hide-details="auto"
          v-model="answer"
          @change="acceptResponse"
          class="input-field"
          variant="outlined"
          density="compact"
        ></v-text-field>
      </div>
    </div>
  </div>
</template>

<script>
import { initHost, hostAccept, sendMessage } from "@/utils/webRtcConnection";
import QRCode from "qrcode";
import QrScanner from "qr-scanner";
import { connectionStore } from "@/stores/connection";
import { mapActions } from "pinia";

const steps = Object.freeze({
  INITIAL: "INITIAL",
  INVITED: "INVITED",
  PEER_ACCEPTED: "PEER_ACCEPTED",
  SCAN: "SCAN",
  ACCEPTED: "ACCEPTED",
});

export default {
  props: {},
  emits: ["complete"],
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
    this.generateInvitation();
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
  unmounted() {
    this.qrScanner.stop();
  },
  watch: {
    offerToken() {
      this.renderQrCode(this.offerToken);
    },
  },
  methods: {
    ...mapActions(connectionStore, ["addConnection"]),
    generateInvitation() {
      return initHost(
        (e) => this.onConnectionOpen(),
        (e) => this.displayMessage(e.data),
        (state) => {
          console.log("onConnectionStateChange", state);
          if (state === "connecting") {
            this.step = steps.PEER_ACCEPTED;
          }
        },
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
    onConnectionOpen() {
      this.addConnection({
        connection: this.connection,
        channel: this.channel,
        host: true,
      });
      this.$emit("complete");
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
  width: 20rem;
  max-width: calc(100vw - 6rem);
  margin-top: 1rem;
}

.qrcode canvas {
  max-width: calc(100vw - 6rem);
  max-height: calc(100vw - 6rem);
}
</style>