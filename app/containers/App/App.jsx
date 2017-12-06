// @flow
import React, { Component } from 'react'

import ModalRenderer from '../ModalRenderer'
import Notifications from '../Notifications'

import Header from './Header'
import Footer from './Footer'

import styles from './App.scss'

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
      <div className={styles.container}>
        <Header />
        <div className={styles.content}>{children}</div>
        <Notifications />
        <ModalRenderer />
        <Footer />
      </div>
    )
  }
}

export default App
