// @flow
import React, { useEffect } from 'react'

import { useWalletConnectWallet } from '@cityofzion/wallet-connect-sdk-wallet-react'
import { ROUTES } from '../../core/constants'
import Sidebar from './Sidebar'
import ModalRenderer from '../ModalRenderer'
import Notifications from '../Notifications'
import { upgradeUserWalletNEP6 } from '../../modules/generateWallet'

import styles from './App.scss'
import themes from '../../themes'
import ErrorBoundary from '../../components/ErrorBoundaries/Main'
import FramelessNavigation from '../../components/FramelessNavigation'
import { parseQuery } from '../../core/formatters'
import withSettingsContext from '../../hocs/withSettingsContext'

const ipc = require('electron').ipcRenderer

type Props = {
  children: React$Node,
  address: string,
  checkVersion: Function,
  showErrorNotification: Function,
  showInfoNotification: Function,
  location: Object,
  theme: string,
  store: any,
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
  history,
  showInfoNotification,
}: Props) => {
  const { requests, sessions, disconnect } = useWalletConnectWallet()
  const [queuedWcReroute, setQueuedWcReroute] = React.useState(null)

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
      const handle = (event, url) => {
        const { uri } = parseQuery(decodeURI(url))
        if (uri) {
          if (address) {
            history[
              history.location.pathname === ROUTES.CONNECT_DAPP
                ? 'replace'
                : 'push'
            ]({
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
      }

      ipc.on('link', handle)

      return () => {
        ipc.off('link', handle)
      }
    },
    [address, showInfoNotification, history],
  )

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
      const request = requests[0]
      if (!request) return

      const session = sessions.find(session => session.topic === request.topic)
      if (!session) return

      history[
        history.location.pathname === ROUTES.DAPP_REQUEST ? 'replace' : 'push'
      ]({
        pathname: ROUTES.DAPP_REQUEST,
        state: { request, session },
      })
    },
    [requests, history, sessions],
  )

  useEffect(
    () => {
      const disconnectAllDaps = async () => {
        await Promise.all(sessions.map(session => disconnect(session)))
        ipc.send('closed')
      }

      ipc.on('quit', disconnectAllDaps)

      return () => {
        ipc.off('quit', disconnectAllDaps)
      }
    },
    [sessions, disconnect],
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
