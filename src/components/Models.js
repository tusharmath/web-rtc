/**
 * Created by tushar.mathur on 31/03/16.
 */

'use strict'

import * as U from '../lib/WebRTC'

/**
 * Connections
 */
export const LocalConnection = U.getRTCPeerConnection(null)
export const RemoteConnection = U.getRTCPeerConnection(null)

/**
 * Media Streams
 */
export const LocalMediaStream = U.getUserMedia({video: true, audio: false}).share()
export const RemoteMediaStream = RemoteConnection.filter((x) => x.event === 'STREAM').pluck('params', 'stream')

/**
 * ICE Candidates
 */

export const LocalDescriptor = U.createLocalDescriptor(LocalMediaStream, LocalConnection)
export const RemoteDescriptor = U.createRemoteDescriptor(LocalDescriptor, LocalConnection, RemoteConnection)

U.linkConnection(RemoteDescriptor, LocalConnection, RemoteConnection)
