// @flow
import React, { useCallback, useEffect } from 'react'
import { wallet } from '@cityofzion/neon-js-next'

import { ROUTES, DEFAULT_AUTOACCEPT_METHODS } from '../../core/constants'
import Sidebar from './Sidebar'
import ModalRenderer from '../ModalRenderer'
import Notifications from '../Notifications'
import withThemeData from '../../hocs/withThemeData'
import { upgradeUserWalletNEP6 } from '../../modules/generateWallet'

import styles from './App.scss'
import themes from '../../themes'
import ErrorBoundary from '../../components/ErrorBoundaries/Main'
import FramelessNavigation from '../../components/FramelessNavigation'
import {
  useWalletConnect,
  type SessionRequest,
} from '../../context/WalletConnect/WalletConnectContext'
import N3Helper from '../../context/WalletConnect/helpers'
import { getNode, getRPCEndpoint } from '../../actions/nodeStorageActions'
import { parseQuery } from '../../core/formatters'
import withSettingsContext from '../../hocs/withSettingsContext'

const ipc = require('electron').ipcRenderer

type Props = {
  children: React$Node,
  address: string,
  checkVersion: Function,
  showErrorNotification: Function,
  showInfoNotification: Function,
  hideNotification: Function,
  location: Object,
  theme: string,
  store: any,
  wif: string,
  history: any,
  net: string,
  isHardwareLogin: boolean,
  signingFunction: () => void,
  publicKey: any,
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
  ROUTES.NFT,
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
  net,
  isHardwareLogin,
  signingFunction,
  publicKey,
  showInfoNotification,
  hideNotification,
}: Props) => {
  const walletConnectCtx = useWalletConnect()
  const [queuedWcReroute, setQueuedWcReroute] = React.useState(null)

  useEffect(() => {
    // Listen for the 'quit' message and reset the wallet connect context
    // once complete relay the 'closed' message to programmatically close electron
    ipc.on('quit', async () => {
      await walletConnectCtx.resetApp()
      ipc.send('closed')
    })
    return () => null
  }, [])

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

  useEffect(() => {
    ipc.on('link', (event, url) => {
      const { uri } = parseQuery(decodeURI(url))
      if (uri) {
        if (store.getState()?.spunky?.auth?.data?.address) {
          history.push({
            pathname: ROUTES.CONNECT_DAPP,
            state: { uri },
          })
        } else {
          showInfoNotification({
            message: 'Please login before connecting to a dApp.',
          })
          setQueuedWcReroute(uri)
        }
      }
    })
  }, [])

  useEffect(
    () => {
      if (queuedWcReroute && address) {
        setTimeout(() => {
          // Add a timeout so that the dashboard still loads
          // before redirecting to the connect dapp screen
          setQueuedWcReroute(null)
          history.push({
            pathname: ROUTES.CONNECT_DAPP,
            state: { uri: queuedWcReroute },
          })
        }, 1000)
      }
    },
    [address, queuedWcReroute, history],
  )

  useEffect(
    () => {
      const account = new wallet.Account(isHardwareLogin ? publicKey : wif)
      // if the request method is 'testInvoke' or 'multiTestInvoke' we auto-accept it
      walletConnectCtx.autoAcceptIntercept((acc, chain, req: SessionRequest) =>
        DEFAULT_AUTOACCEPT_METHODS.includes(req.params.request.method),
      )

      walletConnectCtx.onRequestListener(
        async (acc, chain, req: SessionRequest) => {
          let endpoint = await getNode(net)
          if (!endpoint) {
            endpoint = await getRPCEndpoint(net)
          }
          const N3 = await N3Helper.init(endpoint)
          return N3.rpcCall(
            account,
            req,
            isHardwareLogin,
            signingFunction,
            showInfoNotification,
            hideNotification,
          )
        },
      )
    },
    [wif, net, isHardwareLogin, signingFunction, address, publicKey],
  )

  useEffect(
    () => {
      if (walletConnectCtx.sessionProposals[0]) {
        history.push(ROUTES.CONNECT_DAPP)
      }
    },
    [walletConnectCtx.sessionProposals, history],
  )

  useEffect(
    () => {
      if (walletConnectCtx.requests[0]) {
        history.push(ROUTES.CONNECT_DAPP)
      }
    },
    [walletConnectCtx.requests, history],
  )

  return (
    <ErrorBoundary>
      <div style={themes[theme]} className={styles.container}>
        <Notifications />
        {address &&
          routesWithSideBar.includes(location.pathname) && (
            <Sidebar store={store} theme={theme} className={styles.sidebar} />
          )}
        <div className={styles.wrapper}>
          <FramelessNavigation />
          <div className={styles.content}>{children}</div>

          <ModalRenderer />
        </div>
      </div>
    </ErrorBoundary>
  )
}

export default withSettingsContext(App)
