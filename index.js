/**
 * Created by tushar.mathur on 31/03/16.
 */

'use strict'

const socket = require('./src/lib/SocketServer').messages

socket.subscribe((x) => console.log(x.event))
