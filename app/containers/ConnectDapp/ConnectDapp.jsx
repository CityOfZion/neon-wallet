/* eslint-disable no-nested-ternary */
// @flow
import React, { useCallback, useEffect, useState, useMemo } from 'react'

import { useWalletConnectWallet } from '@cityofzion/wallet-connect-sdk-wallet-react'
import ConnectionLoader from '../../components/ConnectDapp/ConnectionLoader'
import ApproveConnection from '../../components/ConnectDapp/ApproveConnection'
import ConnectionUrlForm from '../../components/ConnectDapp/ConnectionUrlForm'

type Props = {
  history: any,
  showErrorNotification: ({ message: string }) => void,
}

const CONNECTION_STEPS = {
  ENTER_URL: 'ENTER_URL',
  APPROVE_CONNECTION: 'APPROVE_CONNECTION',
  LOADING: 'LOADING',
}

const ConnectDapp = ({ history, showErrorNotification }: Props) => {
  const { connect, proposals } = useWalletConnectWallet()

  const [connectionStep, setConnectionStep] = useState(
    CONNECTION_STEPS.ENTER_URL,
  )

  const proposal = useMemo(() => proposals[0], [proposals])

  const handleOnURI = useCallback(
    async uri => {
      setConnectionStep(true)
      try {
        await connect(uri)
      } catch (error) {
        showErrorNotification({
          message: `An error occurred attempting to connect to a dapp: ${
            error.message
          }`,
        })
      }
    },
    [connect, showErrorNotification],
  )

  // Effect for handling passing URI as query param to component
  useEffect(
    () => {
      if (
        !history.location ||
        !history.location.state ||
        !history.location.state.uri
      )
        return

      const decoded = atob(history.location.state.uri)
      handleOnURI(decoded)
    },
    [history, handleOnURI],
  )

  useEffect(
    () => {
      if (!proposal) {
        setConnectionStep(CONNECTION_STEPS.ENTER_URL)
        return
      }

      setConnectionStep(CONNECTION_STEPS.APPROVE_CONNECTION)
    },
    [proposal],
  )

  return connectionStep === CONNECTION_STEPS.LOADING ? (
    <ConnectionLoader />
  ) : connectionStep === CONNECTION_STEPS.APPROVE_CONNECTION ? (
    <ApproveConnection proposal={proposal} />
  ) : (
    <ConnectionUrlForm onURI={handleOnURI} />
  )
}

export default ConnectDapp
