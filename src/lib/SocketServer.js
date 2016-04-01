/**
 * Created by tushar.mathur on 01/04/16.
 */

'use strict'

const Rx = require('rx')
const e = exports
const Connection = new Rx.BehaviorSubject({event: 'init', params: []})
e.connect = Connection

Connection.subscribe(x => console.log(x.params[0]))
