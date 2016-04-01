/**
 * Created by tushar.mathur on 01/04/16.
 */

'use strict'

const Rx = require('rx')
const _ = require('lodash')
const e = exports
e.fromEvent = _.rest((obj, events) => Rx.Observable
  .create((observer) => events.forEach((event) => obj.on(event, _.rest((params) => observer.onNext({event, params}))))))

