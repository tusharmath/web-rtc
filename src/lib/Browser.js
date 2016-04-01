/**
 * Created by tushar.mathur on 02/04/16.
 */

'use strict'
export default {
  RTCIceCandidate: window.RTCIceCandidate || window.webkitRTCIceCandidate || window.mozRTCIceCandidate,
  RTCPeerConnection: window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection || window.msRTCPeerConnection,
  getUserMedia: (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia).bind(navigator)
}
