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
    lastConnectionChangeAt: new Date(),
  }),
  getters: {
    allConnections: (state) => state.connections,
    isHost: (state) => state.mode === ConnectionMode.HOST,
    isJoin: (state) => state.mode === ConnectionMode.JOIN,
  },
  actions: {
    addConnection(connection: PeerConnection) {
      connection.channel.onmessage = (e) => {
        this.lastMessage = e.data;
        console.info("received message: " + e.data);
      };
      connection.connection.onconnectionstatechange = (newState) => {
        this.lastConnectionChangeAt = new Date();
        console.info("onconnectionstatechange: " + newState);
      };

      this.connections.push(connection);
      this.lastConnectionChangeAt = new Date();
    },
    sendMessage(message: string) {
      this.connections
        .filter((conn) => conn.channel.readyState === 'open')
        .forEach((conn) => conn.channel.send(message));
    },
    setMode(mode: ConnectionMode.HOST | ConnectionMode.JOIN) {
      this.mode = mode;
    },
  },
});
