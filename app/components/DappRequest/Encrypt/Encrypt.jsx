// @flow
import React, { useState } from 'react'
import classNames from 'classnames'

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

const Encrypt = ({
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
    <MessageSuccess
      text="You have successfully encrypted your text"
      isVerify={false}
    />
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
        <h3>{session.peer.metadata.name} asks for authentication</h3>

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
                not currently support encrypt method.
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
            <div
              className={styles.detailsLabel}
              style={{ marginBottom: '6px' }}
            >
              <label>Encrypt</label>
            </div>
            <div className={styles.wcMessageContents}>
              {request.params.request.params[0]}
              {JSON.stringify(request.params.request.params)}
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

export default Encrypt
