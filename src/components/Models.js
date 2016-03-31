/**
 * Created by tushar.mathur on 31/03/16.
 */

'use strict'

import * as U from '../lib/utils'
import targ from 'argtoob'
import * as Rx from 'rx'

/**
 * Connections
 */
export const LocalConnection = U.getRTCPeerConnection(null)
export const RemoteConnection = U.getRTCPeerConnection(null)
export const LocalConnectionValue = LocalConnection.filter((x) => x.event === 'CREATE').pluck('params')
export const RemoteConnectionValue = RemoteConnection.filter((x) => x.event === 'CREATE').pluck('params')

/**
 * Media Streams
 */
export const LocalMediaStream = U.getUserMedia({video: true, audio: false}).share()
export const RemoteMediaStream = RemoteConnection.filter((x) => x.event === 'STREAM').pluck('params', 'stream')

/**
 * ICE Candidates
 */
const LocalICE = LocalConnection.filter((x) => x.event === 'ICE').pluck('params')
const RemoteICE = RemoteConnection.filter((x) => x.event === 'ICE').pluck('params')
Rx.Observable.merge(
  LocalICE.zip(RemoteConnectionValue, targ('ice', 'conn')),
  RemoteICE.zip(LocalConnectionValue, targ('ice', 'conn'))
  )
  .subscribe((x) => x.conn.addIceCandidate(new RTCIceCandidate(x.ice.candidate)))

/**
 * Create Offer
 */
export const LocalDescriptor = LocalMediaStream
  .withLatestFrom(LocalConnectionValue, targ('stream', 'connection'))

  .tap((x) => x.connection.addStream(x.stream))
  .flatMap((x) => U.createOffer(x.connection))
/**
 * Create Answer
 */
export const RemoteDescriptor = LocalDescriptor
  .withLatestFrom(LocalConnectionValue, RemoteConnectionValue, targ('desc', 'localConn', 'remoteConn'))
  .tap((x) => {
    x.localConn.setLocalDescription(x.desc)
    x.remoteConn.setRemoteDescription(x.desc)
  })
  .flatMap((x) => U.createAnswer(x.remoteConn))

RemoteDescriptor
  .withLatestFrom(LocalConnectionValue, RemoteConnectionValue, targ('desc', 'localConn', 'remoteConn'))
  .subscribe((x) => {
    x.localConn.setRemoteDescription(x.desc)
    x.remoteConn.setLocalDescription(x.desc)
  })
