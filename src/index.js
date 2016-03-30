import * as U from './utils'
const localPlayer = U.findById('local-player')
const remotePlayer = U.findById('remote-player')

U
  .getUserMedia({audio: false, video: true})
  .map(URL.createObjectURL)
  .subscribe(x => localPlayer.src = x)
