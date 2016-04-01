/**
 * Created by tushar.mathur on 01/04/16.
 */

'use strict'

const config = require('config')
const https = require('https')
const socketIO = require('socket.io')
const path = require('path')
const express = require('express')
const webpack = require('webpack')
const webpackMiddleware = require('webpack-dev-middleware')

const ssl = require('./ssl/index')
const webpackConfig = require('./webpack.config.js')
const U = require('./src/lib/Utils')
const socketServer = require('./src/lib/SocketServer')

const app = express()
if (config.useWebpackDevMiddleware) {
  app.use(webpackMiddleware(webpack(webpackConfig)))
}
app.use(webpackMiddleware(webpack(webpackConfig)))
app.use('/', express.static(path.resolve(__dirname, 'public')))

ssl.subscribe((options) => {
  const server = https.createServer(options, app)
  const ws = socketIO(server)
  U.fromEvent(ws, 'connection')
    .map((x) => ({event: 'connection', params: [x]}))
    .subscribe(socketServer.connect)
  server.listen(config.port, () => console.log('STARTED:', config.port, process.env.NODE_ENV))
})
