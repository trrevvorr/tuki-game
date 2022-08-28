<template>
  <div class="connection">
    <h2>Join Connection</h2>

    <div class="scan step" v-show="step == steps.SCAN">
      <h3>Accept Invitation</h3>
      <div>Ask your host to generate an invitation QR code for your to scan.</div>
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
      <h3>Respond To Host</h3>
      <div>Ask your host to accept your connection by having them scan the QR code below.</div>
      <v-btn @click="generateResponse" v-if="step === steps.ACCEPTED">
        Generate Response QR Code
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
      </div>
    </div>
  </div>
</template>

<script>
import { initJoin } from "@/utils/webRtcConnection";
import QRCode from "qrcode";
import QrScanner from "qr-scanner";
import { connectionStore } from "@/stores/connection";
import { mapActions, mapGetters } from "pinia";

const steps = Object.freeze({
  INITIAL: "INITIAL",
  SCAN: "SCAN",
  ACCEPTED: "ACCEPTED",
  QR: "QR",
});

export default {
  props: {},
  emits: ["complete"],
  data() {
    return {
      connection: null,
      channel: null,
      remoteOffer: "",
      answer: "",
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

    if (this.connected) {
      this.step = steps.CONNECTED;
    } else {
      this.step = steps.SCAN;
      this.qrScanner.start();
    }
  },
  unmounted() {
    this.qrScanner.stop();
  },
  computed: {
    ...mapGetters(connectionStore, ["allConnections"]),
    connected() {
      return this.allConnections.filter((conn) => conn.connection.connectionState === "connected")
        .length;
    },
  },
  methods: {
    ...mapActions(connectionStore, ["addConnection"]),
    async acceptInvitation() {
      initJoin(
        this.remoteOffer,
        (event) => (this.channel = event.channel),
        (e) => this.onConnectionOpen(),
        (e) => console.info("onmessage", e.data),
        (event) => console.info("onConnectionStateChange", event),
        (event) => console.info("onIceConnectionStateChange", event),
        (answerToken) => (this.answerToken = answerToken)
      ).then((connectionOut) => {
        this.connection = connectionOut;
        console.info("connection established as join");
        this.step = steps.ACCEPTED;
        this.qrScanner.stop();
      });
    },
    async generateResponse() {
      this.renderQrCode(this.answerToken);
      this.step = steps.QR;
    },
    onConnectionOpen() {
      this.addConnection({
        connection: this.connection,
        channel: this.channel,
        host: false,
      });
      this.$emit("complete");
    },
    renderQrCode(dataString) {
      QRCode.toCanvas(this.$refs.canvas, dataString, { errorCorrectionLevel: "L" }).catch((err) => {
        console.error(err);
      });
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