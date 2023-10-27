// @flow
import React, { useState } from 'react'
import classNames from 'classnames'
import { isEmpty } from 'lodash-es'

import {
  useWalletConnectWallet,
  TSessionRequest,
  TSession,
} from '@cityofzion/wallet-connect-sdk-wallet-react'
import { ROUTES } from '../../../core/constants'
import CloseButton from '../../CloseButton'
import FullHeightPanel from '../../Panel/FullHeightPanel'
import WalletConnect from '../../../assets/icons/wallet_connect.svg'
import styles from '../../../containers/ConnectDapp/styles.scss'
import DialogueBox from '../../DialogueBox'
import WarningIcon from '../../../assets/icons/warning.svg'
import Confirm from '../../../assets/icons/confirm_connection.svg'
import Deny from '../../../assets/icons/deny_connection.svg'
import ConnectionLoader from '../../ConnectDapp/ConnectionLoader'
import MessageSuccess from '../MessageSuccess'

type Props = {
  request: TSessionRequest,
  session: TSession,
  isHardwareLogin: boolean,
  history: any,
  showSuccessNotification: ({ message: string }) => any,
  showErrorNotification: ({ message: string }) => any,
}

const Decrypt = ({
  request,
  session,
  isHardwareLogin,
  history,
  showSuccessNotification,
  showErrorNotification,
}: Props) => {
  const { approveRequest, rejectRequest } = useWalletConnectWallet()

  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

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
      await approveRequest(request)
      setSuccess(true)
    } catch (error) {
      showErrorNotification({ message: error.message })
      history.push(ROUTES.DASHBOARD)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <ConnectionLoader />

  return success ? (
    <MessageSuccess isVerify />
  ) : (
    <FullHeightPanel
      headerText="Wallet Connect"
      renderCloseButton={() => (
        <CloseButton routeTo={ROUTES.DASHBOARD} onClick={reject} />
      )}
      renderHeaderIcon={() => (
        <div className={styles.walletConnectIcon}>
          <WalletConnect />
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
        <img src={session.peer.metadata.icons[0]} />
        <h3>{session.peer.metadata.name} wants you to decrypt a message</h3>

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
                not currently support decrypt.
              </div>
            )}
            className={styles.warningDialogue}
          />
        )}

        <div className={styles.connectionDetails}>
          <div
            className={styles.details}
            style={{ margin: '12px 0', padding: '12px' }}
          >
            <div>
              {!isEmpty(request.params.request.params) &&
                Object.entries(request.params.request.params[0]).map(
                  ([key, value]) => (
                    <div key={key}>
                      <div
                        className={classNames([
                          styles.detailsLabel,
                          styles.detailRow,
                        ])}
                      >
                        <label>{key}</label>
                      </div>
                      <div
                        className={styles.methodParameter}
                        style={{
                          wordBreak: 'break-all',
                          fontSize: 12,
                        }}
                      >
                        {JSON.stringify(value)}
                      </div>
                    </div>
                  ),
                )}
            </div>
          </div>
        </div>

        {!isHardwareLogin && (
          <div className={styles.confirmation}>
            Please confirm you would like to proceed
            <div>
              <Confirm onClick={approve} />

              <Deny onClick={reject} />
            </div>
          </div>
        )}
      </div>
    </FullHeightPanel>
  )
}

export default Decrypt
