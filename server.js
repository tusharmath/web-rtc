/**
 * Created by tushar.mathur on 31/03/16.
 */

'use strict'
const https = require('https')
const config = require('config')
const path = require('path')
const express = require('express')
const webpack = require('webpack')
const webpackMiddleware = require('webpack-dev-middleware')

const webpackConfig = require('./webpack.config')

const app = express()
if (config.useWebpackDevMiddleware) {
  app.use(webpackMiddleware(webpack(webpackConfig)))
}
app.use(webpackMiddleware(webpack(webpackConfig)))
app.use('/', express.static(path.resolve(__dirname, 'public')))
https.createServer(app).listen(config.port, () => console.log('STARTED:', config.port, process.env.NODE_ENV))
