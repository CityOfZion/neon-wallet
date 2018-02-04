// @flow
import React, { Component } from 'react'

import ModalRenderer from '../ModalRenderer'
import Notifications from '../Notifications'

import { upgradeUserWalletNEP6 } from '../../modules/generateWallet'

import Sidebar from './Sidebar'
import Footer from './Footer'

import styles from './App.scss'

type Props = {
  children: React$Node,
  address: string,
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
    const { children, address } = this.props

    return (
      <div className={styles.container}>
        {address && (
          <Sidebar className={styles.sidebar} />
        )}
        <div className={styles.wrapper}>
          <div className={styles.content}>{children}</div>
          <Notifications />
          <ModalRenderer />
          <Footer />
        </div>
      </div>
    )
  }
}

export default App
