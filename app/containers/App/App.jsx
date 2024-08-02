// @flow
import React, { useCallback, useEffect, useState } from 'react'

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
import withSettingsContext from '../../hocs/withSettingsContext'
import { getInformationFromSession } from '../../util/walletConnect'

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

function isWalletConnectUri(uri) {
  return /^wc:.+@\d.*$/g.test(uri)
}

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
  const [decodedDeeplinkUri, setDecodedDeeplinkUri] = useState(null)

  const handleDeeplink = useCallback(async (uri: string) => {
    await ipc.invoke('restore')

    if (uri === 'neon2://open') {
      history.push(ROUTES.MIGRATION_NOTICE)
      return
    }

    const realUri = uri.split('uri=').pop()
    if (!realUri) return

    const decodedUri = decodeURIComponent(realUri)
    if (isWalletConnectUri(decodedUri)) {
      setDecodedDeeplinkUri(decodedUri)
      return
    }

    const decodedBase64Uri = atob(decodedUri)
    if (isWalletConnectUri(decodedBase64Uri)) {
      setDecodedDeeplinkUri(decodedBase64Uri)
    }
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

  useEffect(
    () => {
      ipc.invoke('getInitialDeepLinkUri').then(handleDeeplink)

      const listener = async (_event, uri: string) => {
        handleDeeplink(uri)
      }

      ipc.on('link', listener)

      return () => {
        ipc.off('link', listener)
      }
    },
    [handleDeeplink],
  )

  useEffect(
    () => {
      if (!decodedDeeplinkUri) return

      if (!address) {
        showInfoNotification({
          message: 'Please login before connecting to a dApp.',
        })
        return
      }

      history.push({
        pathname: ROUTES.CONNECT_DAPP,
        state: { uri: decodedDeeplinkUri },
      })
      setDecodedDeeplinkUri(null)
    },
    [address, decodedDeeplinkUri, history, showInfoNotification],
  )

  useEffect(
    () => {
      async function handle() {
        // It is necessary to wait for the request result page to be rendered
        await new Promise(resolve => setTimeout(resolve, 1000))

        if (history.location.pathname === ROUTES.DAPP_REQUEST) {
          if (
            !requests.some(
              request => request.id === history.location?.state?.request.id,
            )
          ) {
            history.push(ROUTES.DASHBOARD)
          }
          return
        }

        const request = requests[0]
        if (!request) return

        const session = sessions.find(
          session => session.topic === request.topic,
        )
        if (!session) return

        ipc.invoke('restore')

        history.push({
          pathname: ROUTES.DAPP_REQUEST,
          state: { request, session },
        })
      }

      handle()
    },
    [requests, history, sessions],
  )

  useEffect(
    () => {
      if (!address || !sessions.length) return

      const [{ address: connectedAddress }] = getInformationFromSession(
        sessions[0],
      )

      if (connectedAddress !== address) {
        Promise.all(sessions.map(session => disconnect(session)))
      }
    },
    [address],
  )

  useEffect(() => {
    const listener = () => ipc.send('closed')

    ipc.on('quit', listener)

    return () => {
      ipc.off('quit', listener)
    }
  }, [])

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
