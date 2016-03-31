import React, {Component} from 'react'
import {connect} from 'react-announce-connect'
import * as M from './Models'
import {renderIf, itHas} from 'react-render-if'

@renderIf(itHas('state.local'), itHas('state.remote'))
@connect({local: M.LocalMediaStream, remote: M.RemoteMediaStream})
export default class Main extends Component {
  render () {
    const i = this.state
    return (
      <div>
        <video
          autoPlay src={URL.createObjectURL(i.local)}
          style={{height: '100%', width: '100%'}}
        />
        <video
          autoPlay src={URL.createObjectURL(i.remote)}
          style={{position: 'fixed', top: 0, left: 0, maxHeight: 100}}
        />
      </div>
    )
  }
}
