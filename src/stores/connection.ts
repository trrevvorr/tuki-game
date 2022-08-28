import { defineStore } from "pinia";

export interface PeerConnection {
  connection: RTCPeerConnection;
  channel: RTCDataChannel;
  host: boolean;
}

export enum ConnectionMode {
  NONE = "NONE",
  HOST = "HOST",
  JOIN = "JOIN",
}

export const connectionStore = defineStore({
  id: "connection",
  state: () => ({
    connections: [] as PeerConnection[],
    mode: ConnectionMode.NONE,
    lastMessage: null as string | null,
  }),
  getters: {
    connectedConnections: (state) =>
      state.connections.filter((conn) => conn.connection.connectionState === "connected"),
    isHost: (state) => state.mode === ConnectionMode.HOST,
    isJoin: (state) => state.mode === ConnectionMode.JOIN,
  },
  actions: {
    addConnection(connection: PeerConnection) {
      connection.channel.onmessage = (e) => {
        this.lastMessage = e.data;
        console.info("received message: " + e.data);
      };
      this.connections.push(connection);
    },
    sendMessage(message: string) {
      this.connections.forEach((conn) => conn.channel.send(message));
    },
    setMode(mode: ConnectionMode.HOST | ConnectionMode.JOIN) {
      this.mode = mode;
    },
  },
});
