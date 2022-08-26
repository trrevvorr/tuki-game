let isHost = null;

async function initHost(
  onOpen,
  onMessage,
  onConnectionStateChange,
  onIceConnectionStateChange,
  onIceCandidate
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

async function initJoin(
  offer,
  onDataChannel,
  onOpen,
  onMessage,
  onConnectionStateChange,
  onIceConnectionStateChange,
  onIceCandidate
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

async function hostAccept(connection, answer) {
  await acceptJoinAnswer(connection, answer);
}

function init(onConnectionStateChange, onIceConnectionStateChange) {
  const connection = new RTCPeerConnection({
    iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
  });

  connection.onconnectionstatechange = (event) => {
    console.debug("connection.onconnectionstatechange", event);
    onConnectionStateChange(event.target.connectionState);
  };
  connection.oniceconnectionstatechange = (event) => {
    console.debug("connection.oniceconnectionstatechange", event);
    onIceConnectionStateChange(event.target.iceConnectionState);
  };

  return connection;
}

async function createHostOffer(connection, onOpen, onMessage, onIceCandidate) {
  const channel = connection.createDataChannel("data");
  channel.onopen = (event) => onOpen(event);
  channel.onmessage = (event) => onMessage(event);

  connection.onicecandidate = (event) => {
    console.debug("connection.onicecandidate", event);
    if (!event.candidate) {
      onIceCandidate(btoa(event.target.localDescription.sdp));
    }
  };

  const offer = await connection.createOffer();
  await connection.setLocalDescription(offer);

  return channel;
}

async function acceptHostOffer(connection, offerString) {
  const offer = { sdp: atob(offerString), type: 'offer'};
  await connection.setRemoteDescription(offer);
}

async function createJoinAnswer(connection, onIceCandidate) {
  connection.onicecandidate = (event) => {
    console.debug("connection.onicecandidate", event);
    if (!event.candidate) {
      onIceCandidate(btoa(event.target.localDescription.sdp));
    }
  };

  const answer = await connection.createAnswer();
  await connection.setLocalDescription(answer);
}

async function acceptJoinAnswer(connection, answerString) {
  const answer = { sdp: atob(answerString), type: "answer" };
  await connection.setRemoteDescription(answer);
}

async function send_text(channel, text) {
  channel.send(text);
}
