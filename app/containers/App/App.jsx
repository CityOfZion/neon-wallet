// @flow
import React, { Component } from 'react'

import { ROUTES } from '../../core/constants'
import Sidebar from './Sidebar'
import ModalRenderer from '../ModalRenderer'
import Notifications from '../Notifications'
import withThemeData from '../../hocs/withThemeData'
import { upgradeUserWalletNEP6 } from '../../modules/generateWallet'

import styles from './App.scss'
import themes from '../../themes'
import ErrorBoundary from '../../components/ErrorBoundaries/Main'

type Props = {
  children: React$Node,
  address: string,
  checkVersion: Function,
  showErrorNotification: Function,
  location: Object,
  theme: string,
  store: any,
}

const routesWithSideBar = [
  ROUTES.DASHBOARD,
  ROUTES.TRANSACTION_HISTORY,
  ROUTES.RECEIVE,
  ROUTES.CONTACTS,
  ROUTES.SETTINGS,
  ROUTES.SEND,
  ROUTES.TOKEN_SALE,
  ROUTES.NEWS,
  ROUTES.MOBILE,
  ROUTES.MIGRATION,
]

class App extends Component<Props> {
  async componentDidMount() {
    this.props.checkVersion()

    try {
      await upgradeUserWalletNEP6()
    } catch (error) {
      this.props.showErrorNotification({
        message: `Error upgrading legacy wallet: ${error.message}`,
      })
    }
  }

  render() {
    const { children, address, theme, location } = this.props

    return (
      <ErrorBoundary>
        <div style={themes[theme]} className={styles.container}>
          {address &&
            routesWithSideBar.includes(location.pathname) && (
              <Sidebar
                store={this.props.store}
                theme={theme}
                className={styles.sidebar}
              />
            )}
          <div className={styles.wrapper}>
            <div className={styles.content}>{children}</div>
            <Notifications />
            <ModalRenderer />
          </div>
        </div>
      </ErrorBoundary>
    )
  }
}

export default withThemeData()(App)
