const localPlayer = document.getElementById('local-player')
const remotePlayer = document.getElementById('remote-player')
navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia
const RTCPeerConnection = webkitRTCPeerConnection

const constraints = {audio: false, video: true}
navigator.getUserMedia(constraints, stream => {
  const url = URL.createObjectURL(stream)
  localPlayer.src = url
  localPlayer.play()
}, err => console.error(err))

const localPeerConnection = new RTCPeerConnection(null)
localPeerConnection.onicecandidate = (i) => console.log(i)
const remotePeerConnection = new RTCPeerConnection(null)
remotePeerConnection.onicecandidate = (i) => console.log(i)
