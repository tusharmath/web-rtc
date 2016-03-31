/**
 * Created by tushar.mathur on 31/03/16.
 */

'use strict'

const Rx = require('rx')
const targ = require('argtoob')
const fs = require('fs')
const path = require('path')
const fsRead = Rx.Observable.fromNodeCallback(fs.readFile)
module.exports = Rx.Observable.combineLatest(
  fsRead(path.join(__dirname, './server.key')),
  fsRead(path.join(__dirname, './server.crt')),
  targ('key', 'cert')
)
