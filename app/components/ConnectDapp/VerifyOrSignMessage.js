// @flow

import React from 'react'
import classNames from 'classnames'
import { isEmpty } from 'lodash-es'
import { JsonRpcRequest } from '@json-rpc-tools/utils'

import { useWalletConnect } from '../../context/WalletConnect/WalletConnectContext'
import { ROUTES } from '../../core/constants'
import CloseButton from '../CloseButton'
import FullHeightPanel from '../Panel/FullHeightPanel'
import WallletConnect from '../../assets/icons/wallet_connect.svg'
import styles from '../../containers/ConnectDapp/styles.scss'
import CheckMarkIcon from '../../assets/icons/confirm-circle.svg'
import DialogueBox from '../DialogueBox'
import WarningIcon from '../../assets/icons/warning.svg'
import Confirm from '../../assets/icons/confirm_connection.svg'
import Deny from '../../assets/icons/deny_connection.svg'

const VerifyOrSignMessage = ({
  request,
  peer,
  isHardwareLogin,
  resetState,
  history,
  showSuccessNotification,
  setLoading,
  loading,
  isSignMessage,
}: {
  request: JsonRpcRequest,
  peer: any,
  isHardwareLogin: boolean,
  resetState: () => any,
  history: any,
  showSuccessNotification: ({ message: string }) => any,
  setLoading: boolean => any,
  loading: boolean,
  isSignMessage: boolean,
}) => {
  const walletConnectCtx = useWalletConnect()

  const returnRequestParam = param => {
    if (typeof param === 'string') return param
    return ''
  }

  return (
    <FullHeightPanel
      headerText="Wallet Connect"
      renderCloseButton={() => (
        <CloseButton
          routeTo={ROUTES.DASHBOARD}
          onClick={() => {
            walletConnectCtx.rejectRequest(request)
            resetState()
            history.push(ROUTES.DASHBOARD)
          }}
        />
      )}
      renderHeaderIcon={() => (
        <div className={styles.walletConnectIcon}>
          <WallletConnect />
        </div>
      )}
      renderInstructions={false}
    >
      <div
        className={classNames([
          styles.approveConnectionContainer,
          styles.approveRequestContainer,
        ])}
      >
        <img src={peer && peer.metadata.icons[0]} />
        <h3>
          <h3>{peer && peer.metadata.name} wants you to verify a message</h3>
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
                You can view the message below however, the N3 ledger app does
                not currently support message signing/verification.
              </div>
            )}
            className={styles.warningDialogue}
          />
        )}

        {!isSignMessage && (
          <div className={styles.connectionDetails}>
            <div
              className={styles.details}
              style={{ margin: '12px 0', padding: '12px' }}
            >
              <div>
                {!isEmpty(request.request.params) &&
                  Object.keys(request.request.params).map(param => (
                    <div key={param}>
                      <div
                        className={classNames([
                          styles.detailsLabel,
                          styles.detailRow,
                        ])}
                      >
                        <label>{param}</label>
                      </div>
                      <div
                        className={styles.methodParameter}
                        style={{
                          wordBreak: 'break-all',
                          fontSize: 12,
                        }}
                      >
                        {returnRequestParam(request.request.params[param])}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}

        {isSignMessage && (
          <div className={styles.connectionDetails}>
            <div
              className={styles.details}
              style={{ margin: '12px 0', padding: '12px' }}
            >
              <div
                className={styles.detailsLabel}
                style={{ marginBottom: '6px' }}
              >
                <label>Message</label>
              </div>
              <div>{request.request.params}</div>
            </div>
          </div>
        )}

        {!isHardwareLogin && (
          <div className={styles.confirmation}>
            Please confirm you would like to proceed
            <div>
              <Confirm
                onClick={async () => {
                  if (!loading) {
                    setLoading(true)
                    await walletConnectCtx.approveRequest(request)
                    setLoading(false)
                  }
                }}
              />

              <Deny
                onClick={() => {
                  if (!loading) {
                    showSuccessNotification({
                      message: `You have denied request from ${
                        peer ? peer.metadata.name : 'unknown dApp'
                      }.`,
                    })
                    walletConnectCtx.rejectRequest(request)
                    resetState()
                    history.push(ROUTES.DASHBOARD)
                  }
                }}
              />
            </div>
          </div>
        )}
      </div>
    </FullHeightPanel>
  )
}

export default VerifyOrSignMessage
