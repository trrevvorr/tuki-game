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
      <v-icon v-else-if="['checking', 'connecting'].includes(connectionState)" large color="amber">
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
      tab: null,
      connectionState: "disconnected",
    };
  },
};
/*
let connection, channel;
        const displayMessage = (message, sent) => {
            messageEl = document.createElement("li");
            messageEl.className = sent ? "sent" : "received";
            messageEl.textContent = message;

            document.getElementById("messages").append(messageEl);
        }
        const onOpen = (event) => {
            console.log('onOpen', event)
            document.getElementById('message-input').removeAttribute("disabled");
            document.getElementById('send-message').removeAttribute("disabled");
        }
        const onMessage = (event) => {
            displayMessage(event.data, false);
        }
        const copyText = (text) => (navigator.clipboard.writeText(text)
            .then(() => console.info("copied text"))
            .catch(() => console.info("failed to copy text")))
        const onConnectionStateChange = (state) => document.getElementById("connection-status").className = state

        const hostConnection = () => {
            initHost(
                onOpen,
                onMessage,
                onConnectionStateChange,
                (event) => console.log('onIceConnectionStateChange', event),
                (offerToken) => copyText(offerToken)
            ).then(output => {
                connection = output.connection;
                channel = output.channel;
                console.info("connection established as host");
                document.getElementById('host-connection').setAttribute("disabled", true);
            });
            document.getElementById('join-input').setAttribute("disabled", true);
            document.getElementById('join-connection').setAttribute("disabled", true);
            document.getElementById('accept-input').removeAttribute("disabled");
            document.getElementById('accept-connection').removeAttribute("disabled");
        };
        document.getElementById("host-connection").addEventListener("click", hostConnection);

        const joinConnection = async () => {
            initJoin(
                document.getElementById('join-input').value,
                (event) => channel = event.channel,
                onOpen,
                onMessage,
                onConnectionStateChange,
                (event) => console.log('onIceConnectionStateChange', event),
                (answerToken) => copyText(answerToken)
            ).then(connectionOut => {
                connection = connectionOut;
                console.info("connection established as join");
                document.getElementById('host-connection').setAttribute("disabled", true);
                document.getElementById('join-input').setAttribute("disabled", true);
                document.getElementById('join-connection').setAttribute("disabled", true);
            });
        };
        document.getElementById("join-connection").addEventListener("click", joinConnection);

        const acceptConnection = () => {
            hostAccept(
                connection,
                document.getElementById('accept-input').value
            ).then(() => {
                document.getElementById('accept-input').setAttribute("disabled", true);
                document.getElementById('accept-connection').setAttribute("disabled", true);
            });
        };
        document.getElementById("accept-connection").addEventListener("click", acceptConnection);

        const sendMessage = () => {
            const el = document.getElementById('message-input');
            const message = el.value;
            el.value = "";
            send_text(channel, message);
            displayMessage(message, true);
        }
        document.getElementById("send-message").addEventListener("click", sendMessage);
*/
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