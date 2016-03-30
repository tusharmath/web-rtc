import * as Rx from 'rx'

export const getUserMedia = (constraints) => {
  const _getUserMedia = ((navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia).bind(navigator))
  return Rx.Observable.create(observer => {
    _getUserMedia(
      constraints,
      (i) => observer.onNext(i),
      err => observer.onError(err)
    )
  })

}
export const getRTCPeerConnection = (server, cb) => {
  const conn = new webkitRTCPeerConnection(server)
  return Rx.Observable.create(observer => {
    conn.onicecandidate = (...args) => observer.onNext({event: 'ICE_CANDIDATE', args})
    conn.onaddstream = (...args) => observer.onNext({event: 'ADD_STREAM', args})
  })
}
export const findById = (i) => document.getElementById(i)
export const playUserMedia = (vElem, constraints, cb) => getUserMedia(
  constraints,
  stream => {
    const url = URL.createObjectURL(stream)
    vElem.src = url
  }, err => console.error(err))
