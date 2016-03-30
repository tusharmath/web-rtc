import React, {Component} from 'react'
import {connect} from 'react-announce-connect'
import * as U from '../utils'
import {renderIf, itHas} from 'react-render-if'

@connect({source: U.getUserMedia({video: true, audio: false})})
@renderIf(itHas('state.source'))
export default class Main extends Component {
  render () {
    const i = this.state
    return (
      <video
        autoPlay src={URL.createObjectURL(i.source)}
        style={{height: '100%', width: '100%'}}
      />
    )
  }
}
