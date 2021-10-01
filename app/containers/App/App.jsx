// @flow
// $FlowFixMe
import React, { useEffect } from 'react'
import { wallet } from '@cityofzion/neon-js-next'

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
import { N3Helper } from '../../context/WalletConnect/helpers'

type Props = {
  children: React$Node,
  address: string,
  checkVersion: Function,
  showErrorNotification: Function,
  location: Object,
  theme: string,
  store: any,
  wif: string,
  history: any,
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
  wif,
  history,
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
  }, [])

  useEffect(
    () => {
      const account = new wallet.Account(wif)

      // if the request method is 'testInvoke' we auto-accept it
      walletConnectCtx.autoAcceptIntercept(
        (acc, chain, req) => req.method === 'testInvoke',
      )

      walletConnectCtx.onRequestListener(async (acc, chain, req) =>
        // TODO: this url needs to come from storage
        new N3Helper('https://testnet1.neo.coz.io:443').rpcCall(account, req),
      )
    },
    [wif],
  )

  useEffect(
    () => {
      if (walletConnectCtx.sessionProposals[0]) {
        history.push(ROUTES.CONNECT_DAPP)
      }
    },
    [walletConnectCtx.sessionProposals],
  )

  useEffect(
    () => {
      if (walletConnectCtx.requests[0]) {
        history.push(ROUTES.CONNECT_DAPP)
      }
    },
    [walletConnectCtx.requests],
  )

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
