type RtcEventHandler = (event: Event) => void;
type StateChangeHandler = (newState: string) => void;

let isHost: boolean | null = null;

export async function initHost(
  onOpen: RtcEventHandler,
  onMessage: RtcEventHandler,
  onConnectionStateChange: StateChangeHandler,
  onIceConnectionStateChange: StateChangeHandler,
  onIceCandidate: StateChangeHandler
) {
  if (isHost === false) {
    // TODO: allow user to host or join multiple RTC connections
    console.warn("Host cannot join");
    return;
  }
  isHost = true;
  console.info("hosting...");

  const connection = init(onConnectionStateChange, onIceConnectionStateChange);
  const channel = await createHostOffer(connection, onOpen, onMessage, onIceCandidate);
  return { connection, channel };
}

export async function initJoin(
  offer: string,
  onDataChannel: RtcEventHandler,
  onOpen: RtcEventHandler,
  onMessage: RtcEventHandler,
  onConnectionStateChange: StateChangeHandler,
  onIceConnectionStateChange: StateChangeHandler,
  onIceCandidate: StateChangeHandler
) {
  if (isHost === true) {
    // TODO: allow user to host or join multiple RTC connections
    console.warn("Peer cannot host");
    return;
  }
  isHost = false;
  console.info("joining...");

  const connection = init(onConnectionStateChange, onIceConnectionStateChange);
  connection.ondatachannel = (event) => {
    onDataChannel(event);
    event.channel.onopen = (event) => onOpen(event);
    event.channel.onmessage = (event) => onMessage(event);
  };

  await acceptHostOffer(connection, offer);
  await createJoinAnswer(connection, onIceCandidate);
  return connection;
}

export async function hostAccept(connection: RTCPeerConnection, answer: string) {
  await acceptJoinAnswer(connection, answer);
}

function init(
  onConnectionStateChange: StateChangeHandler,
  onIceConnectionStateChange: StateChangeHandler
) {
  const connection = new RTCPeerConnection({
    iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
  });

  connection.onconnectionstatechange = (event) => {
    console.debug("connection.onconnectionstatechange", event);
    onConnectionStateChange(connection.connectionState);
  };
  connection.oniceconnectionstatechange = (event) => {
    console.debug("connection.oniceconnectionstatechange", event);
    onIceConnectionStateChange(connection.iceConnectionState);
  };

  return connection;
}

async function createHostOffer(
  connection: RTCPeerConnection,
  onOpen: RtcEventHandler,
  onMessage: RtcEventHandler,
  onIceCandidate: StateChangeHandler
) {
  const channel = connection.createDataChannel("data");
  channel.onopen = (event) => onOpen(event);
  channel.onmessage = (event) => onMessage(event);

  connection.onicecandidate = (event) => {
    console.debug("connection.onicecandidate", event);
    if (!event.candidate) {
      const target = event.target as any;
      onIceCandidate(btoa(target.localDescription.sdp));
    }
  };

  const offer = await connection.createOffer();
  await connection.setLocalDescription(offer);

  return channel;
}

async function acceptHostOffer(connection: RTCPeerConnection, offerString: string) {
  await connection.setRemoteDescription({ sdp: atob(offerString), type: "offer" });
}

async function createJoinAnswer(connection: RTCPeerConnection, onIceCandidate: StateChangeHandler) {
  connection.onicecandidate = (event) => {
    console.debug("connection.onicecandidate", event);
    if (!event.candidate) {
      const target = event.target as any;
      onIceCandidate(btoa(target.localDescription.sdp));
    }
  };

  const answer = await connection.createAnswer();
  await connection.setLocalDescription(answer);
}

async function acceptJoinAnswer(connection: RTCPeerConnection, answerString: string) {
  await connection.setRemoteDescription({ sdp: atob(answerString), type: "answer" });
}

export async function sendMessage(channel: RTCDataChannel, message: string) {
  channel.send(message);
}
