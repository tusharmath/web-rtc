/**
 * Created by tushar.mathur on 01/04/16.
 */

'use strict'

const config = require('config')
const path = require('path')
const express = require('express')
const webpack = require('webpack')
const webpackMiddleware = require('webpack-dev-middleware')
const https = require('https')

const ssl = require('../ssl/index')
const webpackConfig = require('../webpack.config.js')

const app = express()
if (config.useWebpackDevMiddleware) {
  app.use(webpackMiddleware(webpack(webpackConfig)))
}
app.use(webpackMiddleware(webpack(webpackConfig)))
app.use('/', express.static(path.resolve(__dirname, '../', 'public')))

module.exports = ssl.map((options) => https.createServer(options, app))
