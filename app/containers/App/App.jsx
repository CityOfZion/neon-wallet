// @flow
// $FlowFixMe
import React, { Component, useEffect } from 'react'

import { ROUTES } from '../../core/constants'
import Sidebar from './Sidebar'
import ModalRenderer from '../ModalRenderer'
import Notifications from '../Notifications'
import withThemeData from '../../hocs/withThemeData'
import { upgradeUserWalletNEP6 } from '../../modules/generateWallet'

import styles from './App.scss'
import themes from '../../themes'
import ErrorBoundary from '../../components/ErrorBoundaries/Main'
import FramelessNavigation from '../../components/FramelessNavigation'
import { useWalletConnect } from '../../context/WalletConnect/WalletConnectContext'

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

const App = ({
  children,
  address,
  theme,
  location,
  checkVersion,
  showErrorNotification,
  store,
}: Props) => {
  const walletConnectCtx = useWalletConnect()

  useEffect(() => {
    async function handleUpgrade() {
      checkVersion()

      try {
        await upgradeUserWalletNEP6()
      } catch (error) {
        showErrorNotification({
          message: `Error upgrading legacy wallet: ${error.message}`,
        })
      }
    }
    handleUpgrade()
    // walletConnectCtx.resetApp()
    console.log('App.jsx', { walletConnectCtx })
    // return () => {
    //   if (walletConnectCtx.pairings.length) {
    //     walletConnectCtx.disconnect()
    //   }
    // }
  }, [])

  return (
    <ErrorBoundary>
      <div style={themes[theme]} className={styles.container}>
        {address &&
          routesWithSideBar.includes(location.pathname) && (
            <Sidebar store={store} theme={theme} className={styles.sidebar} />
          )}
        <div className={styles.wrapper}>
          <FramelessNavigation />
          <div className={styles.content}>{children}</div>
          <Notifications />
          <ModalRenderer />
        </div>
      </div>
    </ErrorBoundary>
  )
}

export default withThemeData()(App)
