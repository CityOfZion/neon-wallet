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

const ConnectDapp = ({ showErrorNotification, history }: Props) => {
  const uri = history.location?.state?.uri
  const { connect, proposals } = useWalletConnectWallet()

  const [connectionStep, setConnectionStep] = useState()

  const proposal = useMemo(() => proposals[0], [proposals])

  const handleOnURI = useCallback(
    async uri => {
      setConnectionStep(CONNECTION_STEPS.LOADING)

      try {
        await connect(uri)
      } catch (error) {
        setConnectionStep(CONNECTION_STEPS.ENTER_URL)
        showErrorNotification({
          message: `An error occurred attempting to connect to a dapp: ${
            error.message
          }`,
        })
      }
    },
    [connect, showErrorNotification],
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

  useEffect(
    () => {
      if (!uri) return

      const decoded = atob(uri)
      handleOnURI(decoded)
    },
    [uri, handleOnURI],
  )

  if (connectionStep === CONNECTION_STEPS.LOADING) return <ConnectionLoader />

  return connectionStep === CONNECTION_STEPS.APPROVE_CONNECTION ? (
    <ApproveConnection proposal={proposal} />
  ) : (
    <ConnectionUrlForm onURI={handleOnURI} />
  )
}

export default ConnectDapp
