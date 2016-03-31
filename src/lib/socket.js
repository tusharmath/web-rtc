/**
 * Created by tushar.mathur on 31/03/16.
 */

'use strict'

import * as Rx from 'rx'
import socket from 'socket.io-client'
export default Rx.Observable.create((observer) => {
  socket('https://localhost:8080')
    .on('connect', (params) => observer.onNext({event: 'connect', params}))
    .on('event', (params) => observer.onNext({event: 'event', params}))
    .on('disconnect', (params) => observer.onNext({event: 'disconnect', params}))
})
