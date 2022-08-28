import { defineStore } from "pinia";

export interface PeerConnection {
  connection: RTCPeerConnection;
  channel: RTCDataChannel;
  host: boolean;
}

export const connectionStore = defineStore({
  id: "connection",
  state: () => ({
    connections: [] as PeerConnection[],
    mode: "NONE",
  }),
  getters: {
    connectedConnections: (state) =>
      state.connections.filter((conn) => conn.connection.connectionState === "connected"),
    isHost: (state) => state.mode === "HOST",
    isJoin: (state) => state.mode === "JOIN",
  },
  actions: {
    addConnection(connection: PeerConnection) {
      this.connections.push(connection);
    },
    setMessageHandler(callback: (event: string) => void) {
      this.connections.forEach((conn) => (conn.channel.onmessage = (e) => callback(e.data)));
    },
    sendMessage(message: string) {
      this.connections.forEach((conn) => conn.channel.send(message));
    },
    setMode(mode: "HOST" | "JOIN") {
      this.mode = mode;
    },
  },
});
