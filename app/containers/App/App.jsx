// @flow
import React, { Component } from 'react'

import ModalRenderer from '../ModalRenderer'
import Notifications from '../Notifications'

import { upgradeUserWalletNEP6 } from '../../modules/generateWallet'

import Header from './Header'
import Footer from './Footer'

import styles from './App.scss'

type Props = {
  children: React$Node,
  checkVersion: Function,
  showErrorNotification: Function
}

class App extends Component<Props> {
  componentDidMount () {
    const { checkVersion, showErrorNotification } = this.props

    checkVersion()
    upgradeUserWalletNEP6()
      .catch((e) => {
        showErrorNotification({ message: `Error upgrading legacy wallet: ${e.message}` })
      })
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
