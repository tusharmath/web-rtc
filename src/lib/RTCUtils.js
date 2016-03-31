'use strict';
import * as Rx from 'rx'
export const RTCPeerConnection = webkitRTCPeerConnection
export const ObservableFromWeb = (funct) => (...args) => Rx
  .Observable
  .create((observer) => {
    funct.apply(null, args.concat([
      (x) => {
        observer.onNext(x)
        observer.onCompleted()
      },
      (x) => observer.onError(x)
    ]))
  })

export const getUserMedia = (constraints) => ObservableFromWeb(
  (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia).bind(navigator)
)(constraints)

export const getRTCPeerConnection = (server) => Rx.Observable
  .create((observer) => {
    const conn = new RTCPeerConnection(server)
    setImmediate(() => observer.onNext({event: 'CREATE', params: conn}))
    conn.onicecandidate = (params) => observer.onNext({event: 'ICE', params})
    conn.onaddstream = (params) => observer.onNext({event: 'STREAM', params})
  }).share()

export const createOffer = (connection) => ObservableFromWeb(connection.createOffer.bind(connection))()
export const createAnswer = (connection) => ObservableFromWeb(connection.createAnswer.bind(connection))()
