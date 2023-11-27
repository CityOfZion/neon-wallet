// @flow
import React, { useCallback, useEffect, useMemo } from 'react'
import { useWalletConnectWallet } from '@cityofzion/wallet-connect-sdk-wallet-react'

import { ROUTES } from '../../core/constants'
import InvokeFunction from '../../components/DappRequest/InvokeFunction'
import VerifyMessage from '../../components/DappRequest/VerifyMessage'
import SignMessage from '../../components/DappRequest/SignMessage'
import Encrypt from '../../components/DappRequest/Encrypt'
import Decrypt from '../../components/DappRequest/Decrypt'
import DecryptFromArray from '../../components/DappRequest/DecryptFromArray'
import SignTransaction from '../../components/DappRequest/SignTransaction'

type Props = {
  history: any,
  showErrorNotification: ({ message: string }) => void,
}

const componentsByMethod: { [key: string]: any } = {
  invokeFunction: InvokeFunction,
  signMessage: SignMessage,
  verifyMessage: VerifyMessage,
  encrypt: Encrypt,
  decrypt: Decrypt,
  decryptFromArray: DecryptFromArray,
  signTransaction: SignTransaction,
}

const DappRequest = ({ history, showErrorNotification }: Props) => {
  const { request, session } = history.location.state

  const { method } = request.params.request
  const { rejectRequest } = useWalletConnectWallet()

  const Component = useMemo(() => componentsByMethod[method], [method])

  const checkUnsupportedMethod = useCallback(
    async () => {
      if (!Component) {
        showErrorNotification({
          message: 'unsupportedMethod',
        })

        await rejectRequest(request, {
          code: 1,
          message: 'unsupportedMethod',
        })
        history.push(ROUTES.DASHBOARD)
      }
    },
    [rejectRequest, Component, request, showErrorNotification, history],
  )

  useEffect(
    () => {
      checkUnsupportedMethod()
    },
    [checkUnsupportedMethod],
  )

  return Component ? <Component request={request} session={session} /> : <></>
}

export default DappRequest
