'use strict'

import targ from 'argtoob'
import * as Rx from 'rx'
import * as U from './Utils'
import G from './Browser'
/**
 * Globals
 */
console.log(G.RTCPeerConnection)
export const ofType = (src, event) => src.filter((x) => x.event === event).pluck('params')
export const getUserMedia = (constraints) => U.fromRTCCallback(G.getUserMedia)(constraints)
export const getRTCPeerConnection = (server) => Rx.Observable
  .create((observer) => {
    const conn = new G.RTCPeerConnection(server)
    setImmediate(() => observer.onNext({event: 'CREATE', params: conn}))
    conn.onicecandidate = (params) => observer.onNext({event: 'ICE', params})
    conn.onaddstream = (params) => observer.onNext({event: 'STREAM', params})
  }).share()

export const createLocalDescriptor = (mediaStream, connection) => mediaStream
  .withLatestFrom(ofType(connection, 'CREATE'), targ('stream', 'connection'))
  .tap((x) => x.connection.addStream(x.stream))
  .pluck('connection')
  .flatMap((x) => U.fromRTCCallback(x.createOffer, x)())

export const createRemoteDescriptor = (localDesc, localConn, remoteConn) => localDesc
  .withLatestFrom(ofType(localConn, 'CREATE'), ofType(remoteConn, 'CREATE'), targ('desc', 'localConn', 'remoteConn'))
  .tap((x) => {
    x.localConn.setLocalDescription(x.desc)
    x.remoteConn.setRemoteDescription(x.desc)
  })
  .pluck('remoteConn')
  .flatMap((x) => U.fromRTCCallback(x.createAnswer, x)())

export const linkConnection = (remoteDesc, localConn, remoteConn) => {

  const LocalICE = ofType(localConn, 'ICE')
  const RemoteICE = ofType(remoteConn, 'ICE')
  const localConnVal = ofType(localConn, 'CREATE')
  const remoteConnVal = ofType(remoteConn, 'CREATE')

  Rx.Observable.merge(
    LocalICE.zip(remoteConnVal, targ('ice', 'conn')),
    RemoteICE.zip(localConnVal, targ('ice', 'conn'))
  ).subscribe((x) => x.conn.addIceCandidate(new G.RTCIceCandidate(x.ice.candidate)))

  remoteDesc
    .withLatestFrom(localConnVal, remoteConnVal, targ('desc', 'localConn', 'remoteConn'))
    .subscribe((x) => {
      x.localConn.setRemoteDescription(x.desc)
      x.remoteConn.setLocalDescription(x.desc)
    })
}
