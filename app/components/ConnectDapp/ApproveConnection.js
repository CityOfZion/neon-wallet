// @flow
import React from 'react'
import { SessionTypes } from '@walletconnect/types'

import { useWalletConnect } from '../../context/WalletConnect/WalletConnectContext'
import { DEFAULT_NAMESPACES, ROUTES } from '../../core/constants'
import CloseButton from '../CloseButton'
import FullHeightPanel from '../Panel/FullHeightPanel'
import WallletConnect from '../../assets/icons/wallet_connect.svg'
import styles from '../../containers/ConnectDapp/styles.scss'
import Confirm from '../../assets/icons/confirm_connection.svg'
import Deny from '../../assets/icons/deny_connection.svg'

const ApproveConnection = ({
  proposal,
  resetState,
  history,
  showSuccessNotification,
  showErrorNotification,
  net,
  address,
}: {
  proposal: SessionTypes.Proposal,
  resetState: () => any,
  history: any,
  showSuccessNotification: ({ message: string }) => any,
  showErrorNotification: ({ message: string }) => any,
  net: string,
  address: string,
}) => {
  const walletConnectCtx = useWalletConnect()
  const {
    proposer: { metadata },
    requiredNamespaces,
  } = proposal.params

  const approveSession = () => {
    walletConnectCtx
      .approveSession(
        proposal,
        [
          {
            address,
            chain: `neo3:${net.toLowerCase()}`,
          },
        ],
        DEFAULT_NAMESPACES,
      )
      .catch(e => {
        // TODO: parse into a more user friendly error
        showErrorNotification({
          message: `An error occurred attempting to approve session: ${e}`,
        })
      })
  }

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
        <img src={metadata.icons[0]} />

        <h3>{metadata.name} wants to connect</h3>
        <div className={styles.connectionDetails}>
          {metadata.name} wants to connect to your wallet
          <div className={styles.details} style={{ marginTop: 12 }}>
            <div className={styles.detailsLabel}>
              <label>dApp details</label>
            </div>
            <div className={styles.featuresRow}>
              <div>
                <label>CHAINS</label>
                {/* $FlowFixMe */}
                {Object.values(requiredNamespaces).map(({ chains }, i) => (
                  <div key={i}>{chains.join('')}</div>
                ))}
              </div>
              <div>
                <label>FEATURES</label>
                {/* $FlowFixMe */}
                {Object.values(requiredNamespaces).map(({ methods }) =>
                  methods.join(', '),
                )}
              </div>
            </div>
          </div>
          <div className={styles.confirmation} style={{ border: 'none' }}>
            Please confirm you would like to connect
            <div>
              <Confirm
                onClick={() => {
                  approveSession()
                  showSuccessNotification({
                    message: `You have accepted connection from ${
                      proposal ? metadata.name : 'unknown dApp'
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
                      proposal ? metadata.name : 'unknown dApp'
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
