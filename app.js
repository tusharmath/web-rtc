/**
 * Created by tushar.mathur on 31/03/16.
 */

'use strict'
const Rx = require('rx')
const config = require('config')
const server = require('./src/server')

server
  .flatMap((x) => Rx.Observable.fromCallback(x.listen, x)(config.port))
  .subscribe((x) => console.log('STARTED:', config.port, process.env.NODE_ENV))
