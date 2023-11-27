/* eslint-disable no-nested-ternary */
// @flow
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import classNames from 'classnames'
import { wallet as n3Wallet } from '@cityofzion/neon-js'

import {
  useWalletConnectWallet,
  TSession,
  TSessionRequest,
} from '@cityofzion/wallet-connect-sdk-wallet-react'
import { NeonInvoker } from '@cityofzion/neon-dappkit'
import ConnectionLoader from '../../ConnectDapp/ConnectionLoader'
import { ROUTES, WITNESS_SCOPE } from '../../../core/constants'
import CloseButton from '../../CloseButton'
import FullHeightPanel from '../../Panel/FullHeightPanel'
import WallletConnect from '../../../assets/icons/wallet_connect.svg'
import styles from '../../../containers/ConnectDapp/styles.scss'
import DialogueBox from '../../DialogueBox'
import WarningIcon from '../../../assets/icons/warning.svg'
import Confirm from '../../../assets/icons/confirm_connection.svg'
import Deny from '../../../assets/icons/deny_connection.svg'
import Tooltip from '../../Tooltip'
import Info from '../../../assets/icons/info.svg'

import { getNode, getRPCEndpoint } from '../../../actions/nodeStorageActions'
import Invocation from '../components/Invocation'
import MessageSuccess from '../MessageSuccess'

const electron = require('electron')

type Props = {
  request: TSessionRequest,
  session: TSession,
  isHardwareLogin: boolean,
  publicKey: string,
  history: any,
  showSuccessNotification({ message: string }): any,
  showInfoNotification({ message: string, autoDismiss?: number }): any,
  hideNotification(id: string): any,
  theme: string,
  net: string,
}

const SignTransaction = ({
  request,
  session,
  isHardwareLogin,
  history,
  publicKey,
  showSuccessNotification,
  showInfoNotification,
  hideNotification,
  theme,
  net,
}: Props) => {
  const requestParams = useMemo(() => request.params.request.params, [request])

  const { rejectRequest, approveRequest } = useWalletConnectWallet()
  const [loading, setLoading] = useState(false)
  const [fee, setFee] = useState()
  const [success, setSuccess] = useState(false)

  const handleCalculateFee = useCallback(
    async () => {
      try {
        setLoading(true)

        if (
          requestParams.extraNetworkFee ||
          requestParams.extraSystemFee ||
          requestParams.networkFeeOverride ||
          requestParams.systemFeeOverride
        ) {
          showInfoNotification({
            message: 'The dApp has overwritten the fees',
          })
        }

        const account = new n3Wallet.Account(publicKey)
        let rpcAddress = await getNode(net)
        if (!rpcAddress) {
          rpcAddress = await getRPCEndpoint(net)
        }

        const invoker = await NeonInvoker.init({ rpcAddress, account })
        const { total } = await invoker.calculateFee(requestParams)

        setFee(total)
      } finally {
        setLoading(false)
      }
    },
    [net, publicKey, requestParams, showInfoNotification],
  )

  const reject = () => {
    rejectRequest(request)
    showSuccessNotification({
      message: `You have denied request from ${session.peer.metadata.name}.`,
    })
    history.push(ROUTES.DASHBOARD)
  }

  const approve = async () => {
    try {
      setLoading(true)

      let notificationId

      if (isHardwareLogin) {
        notificationId = showInfoNotification({
          message: 'Please sign the transaction on your hardware device',
          autoDismiss: 0,
        })
      }

      const { result } = await approveRequest(request)
      console.warn(result)
      if (notificationId) {
        hideNotification(notificationId)
      }

      setSuccess(true)
    } finally {
      setLoading(false)
    }
  }

  useEffect(
    () => {
      handleCalculateFee()
    },
    [handleCalculateFee],
  )

  return loading && !success ? (
    <ConnectionLoader />
  ) : success ? (
    <MessageSuccess text="You have successfully signed your transaction" />
  ) : (
    <FullHeightPanel
      headerText="Wallet Connect"
      renderCloseButton={() => (
        <CloseButton onClick={reject} routeTo={ROUTES.DASHBOARD} />
      )}
      renderHeaderIcon={() => (
        <div className={styles.walletConnectIcon}>
          <WallletConnect />
        </div>
      )}
      renderInstructions={false}
      className={styles.approveTransactionPanel}
      containerClassName={styles.approveTransactionPanelContainer}
    >
      <div
        className={classNames([
          styles.approveConnectionContainer,
          styles.approveRequestContainer,
        ])}
      >
        <img src={session.peer.metadata.icons[0]} />

        <h3 className={styles.wantsToCallHeader}>
          {session.peer.metadata.name} wants to call
        </h3>

        {isHardwareLogin && (
          <DialogueBox
            icon={
              <WarningIcon
                className={styles.warningIcon}
                height={60}
                width={60}
              />
            }
            renderText={() => (
              <div>
                To sign this transaction with your ledger, enable custom
                contract data in the Neo N3 app settings. Read more about how to
                enable this setting
                <a
                  onClick={() => {
                    electron.shell.openExternal(
                      'https://medium.com/proof-of-working/signing-custom-transactions-with-ledger-29723f6eaa4',
                    )
                  }}
                >
                  here
                </a>.
              </div>
            )}
            className={styles.warningDialogue}
          />
        )}

        {request.params.request.params.invocations.map((invocation, index) => (
          <Invocation
            invocation={invocation}
            theme={theme}
            net={net}
            requestParams={requestParams}
            key={index}
          />
        ))}

        {request?.params?.request?.params?.signers?.length <= 1 && (
          <div
            className={classNames([
              styles.detailsLabel,
              styles.detailRow,
              styles.singleSigRow,
            ])}
          >
            <label>signature scope</label>
            {request.params.request.params.signers.length ? (
              <div>
                {
                  WITNESS_SCOPE[
                    String(request.params.request.params.signers[0]?.scopes)
                  ]
                }
                {WITNESS_SCOPE[
                  String(request.params.request.params.signers[0]?.scopes)
                ] === 'Global' && <WarningIcon />}
              </div>
            ) : (
              <div>{WITNESS_SCOPE['1']}</div>
            )}
          </div>
        )}

        <div
          className={classNames([
            styles.detailsLabel,
            styles.detailRow,
            styles.feeRow,
          ])}
        >
          <label>fee</label>
          <div className={styles.fee}>
            {fee} GAS
            <Tooltip title="Other network fees may apply">
              <Info />
            </Tooltip>
          </div>
        </div>

        <div className={styles.confirmation}>
          Please confirm you would like to proceed
          <div>
            <Confirm onClick={approve} />

            <Deny onClick={reject} />
          </div>
        </div>
      </div>
    </FullHeightPanel>
  )
}

export default SignTransaction
