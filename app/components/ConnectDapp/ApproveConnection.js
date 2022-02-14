// @flow

import React from 'react'
import classNames from 'classnames'
import { isEmpty } from 'lodash-es'
import { JsonRpcRequest } from '@json-rpc-tools/utils'
import { SessionTypes, AppMetadata } from '@walletconnect/types'

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

const ApproveConnection = ({
  proposal,
  resetState,
  history,
  showSuccessNotification,
}: {
  proposal: SessionTypes.Proposal,
  resetState: () => any,
  history: any,
  showSuccessNotification: ({ message: string }) => any,
}) => {
  const walletConnectCtx = useWalletConnect()
  return (
    <FullHeightPanel
      headerText="Wallet Connect"
      renderCloseButton={() => (
        <CloseButton
          onClick={() => {
            walletConnectCtx.rejectSession(proposal)
            resetState()
          }}
          routeTo={ROUTES.DASHBOARD}
        />
      )}
      renderHeaderIcon={() => (
        <div className={styles.walletConnectIcon}>
          <WallletConnect />
        </div>
      )}
      renderInstructions={false}
    >
      <div className={styles.approveConnectionContainer}>
        <img src={proposal && proposal.proposer.metadata.icons[0]} />

        <h3>{proposal && proposal.proposer.metadata.name} wants to connect</h3>
        <div className={styles.connectionDetails}>
          {proposal && proposal.proposer.metadata.name} wants to connect to your
          wallet
          <div className={styles.details} style={{ marginTop: 12 }}>
            <div className={styles.detailsLabel}>
              <label>dApp details</label>
            </div>
            <div className={styles.featuresRow}>
              <div>
                <label>CHAINS</label>
                {proposal &&
                  proposal.permissions.blockchain.chains.map(chain => (
                    <div key={chain}>{chain}</div>
                  ))}
              </div>
              <div>
                <label>FEATURES</label>
                {proposal && proposal.permissions.jsonrpc.methods.join(', ')}
              </div>
            </div>
          </div>
          <div className={styles.confirmation} style={{ border: 'none' }}>
            Please confirm you would like to connect
            <div>
              <Confirm
                onClick={() => {
                  walletConnectCtx.approveSession(proposal)
                  showSuccessNotification({
                    message: `You have accepted connection from ${
                      proposal
                        ? proposal.proposer.metadata.name
                        : 'unknown dApp'
                    }.`,
                  })
                  history.push(ROUTES.DASHBOARD)
                }}
              />

              <Deny
                onClick={() => {
                  walletConnectCtx.rejectSession(proposal)
                  showSuccessNotification({
                    message: `You have rejected connection from ${
                      proposal
                        ? proposal.proposer.metadata.name
                        : 'unknown dApp'
                    }.`,
                  })
                  resetState()
                  history.push(ROUTES.DASHBOARD)
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </FullHeightPanel>
  )
}

export default ApproveConnection
