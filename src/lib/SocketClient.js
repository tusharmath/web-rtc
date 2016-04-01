/**
 * Created by tushar.mathur on 31/03/16.
 */

'use strict'

import * as Rx from 'rx'
import socket from 'socket.io-client'
import * as U from './Utils'

const ws = socket('https://localhost:8080')
export const messenger = new Rx.Subject()
export const messages = U.fromEvent(ws, 'connect', 'event', 'disconnect')
messenger.subscribe((x) => ws.emit('message', x))
