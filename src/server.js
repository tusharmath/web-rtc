/**
 * Created by tushar.mathur on 01/04/16.
 */

'use strict'

const Rx = require('rx')
const config = require('config')
const https = require('https')
const socketIO = require('socket.io')

const ssl = require('../ssl/index')
const U = require('./lib/Utils')
const app = require('./WebApp')

const connection = ssl
  .map((options) => https.createServer(options, app))
  .map((https) => ({https, ws: socketIO(https)}))
  .flatMap((x) => Rx.Observable.fromCallback(x.https.listen, x.https)(config.port).map(x.ws))
  .tap((x) => console.log('STARTED:', config.port, process.env.NODE_ENV))
  .flatMap((x) => U.fromEvent(x, 'connection'))
  .share()

const messages = connection.flatMap((x) => U.fromEvent(x.params[0], 'message'))

exports.messages = Rx.Observable.merge(connection, messages)
