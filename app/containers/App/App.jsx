// @flow
import React, { Component } from 'react'

import { ROUTES } from '../../core/constants'
import Sidebar from './Sidebar'
import Footer from './Footer'
import ModalRenderer from '../ModalRenderer'
import Notifications from '../Notifications'
import { upgradeUserWalletNEP6 } from '../../modules/generateWallet'

import styles from './App.scss'

type Props = {
  children: React$Node,
  address: string,
  checkVersion: Function,
  showErrorNotification: Function,
  location: Object
}

const routesWithSideBar = [
  ROUTES.DASHBOARD,
  ROUTES.TRANSACTION_HISTORY,
  ROUTES.RECEIVE,
  ROUTES.CONTACTS,
  ROUTES.SETTINGS
]

class App extends Component<Props> {
  async componentDidMount() {
    this.props.checkVersion()

    try {
      await upgradeUserWalletNEP6()
    } catch (error) {
      this.props.showErrorNotification({
        message: `Error upgrading legacy wallet: ${error.message}`
      })
    }
  }

  render() {
    const { children, address, location } = this.props

    return (
      <div className={styles.container}>
        {address &&
          routesWithSideBar.includes(location.pathname) && (
            <Sidebar className={styles.sidebar} />
          )}
        <div className={styles.wrapper}>
          <div className={styles.content}>{children}</div>
          <Notifications />
          <ModalRenderer />
        </div>
        {/* {address && <Footer className={styles.footer} />} */}
      </div>
    )
  }
}

export default App
