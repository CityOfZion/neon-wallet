// @flow
import React, { Component } from 'react'

import ModalRenderer from '../ModalRenderer'
import Notifications from '../Notifications'

type Props = {
  children: React$Node,
  checkVersion: Function,
  initSettings: Function
}

class App extends Component<Props> {
  componentDidMount () {
    const { checkVersion, initSettings } = this.props

    checkVersion()
    initSettings()
  }

  render () {
    const { children } = this.props
    return (
      <div>
        <div>{children}</div>
        <Notifications />
        <ModalRenderer />
      </div>
    )
  }
}

export default App
