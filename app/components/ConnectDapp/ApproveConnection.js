// @flow
import React from 'react'
import { SessionTypes } from '@walletconnect/types'
import { compose } from 'recompose'
import { connect } from 'react-redux'

import { useWalletConnect } from '../../context/WalletConnect/WalletConnectContext'
import { DEFAULT_NAMESPACES, ROUTES, MODAL_TYPES } from '../../core/constants'
import CloseButton from '../CloseButton'
import FullHeightPanel from '../Panel/FullHeightPanel'
import WallletConnect from '../../assets/icons/wallet_connect.svg'
import styles from '../../containers/ConnectDapp/styles.scss'
import Confirm from '../../assets/icons/confirm_connection.svg'
import Deny from '../../assets/icons/deny_connection.svg'
import { showModal } from '../../modules/modal'

const ApproveConnection = ({
  proposal,
  resetState,
  history,
  showSuccessNotification,
  showErrorNotification,
  net,
  address,
  showNetworkSwitchModal,
}: {
  proposal: SessionTypes.Proposal,
  resetState: () => any,
  history: any,
  showSuccessNotification: ({ message: string }) => any,
  showErrorNotification: ({ message: string }) => any,
  net: string,
  address: string,
  showNetworkSwitchModal: ({
    dAppName: string,
    proposedNetwork: string,
    approveSession: (network?: string) => void,
    rejectSession: () => void,
  }) => void,
}) => {
  const walletConnectCtx = useWalletConnect()
  const {
    proposer: { metadata },
    requiredNamespaces,
  } = proposal.params

  const approveSession = network => {
    walletConnectCtx
      .approveSession(
        proposal,
        [
          {
            address,
            chain: `neo3:${
              network || net === 'Custom' ? 'private' : net.toLowerCase()
            }`,
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

    showSuccessNotification({
      message: `You have accepted connection from ${
        proposal ? metadata.name : 'unknown dApp'
      }.`,
    })
    history.push(ROUTES.DASHBOARD)
  }

  const rejectSession = () => {
    walletConnectCtx.rejectSession(proposal)
    showSuccessNotification({
      message: `You have rejected connection from ${
        proposal ? metadata.name : 'unknown dApp'
      }.`,
    })
    resetState()
    history.push(ROUTES.DASHBOARD)
  }

  const handleApproveSessionClick = () => {
    // 'neo3:testnet' or 'neo3:mainnet'
    const proposedNetwork = proposal.params.requiredNamespaces.neo3.chains[0]

    if (net === 'Custom' && proposedNetwork === 'neo3:private') {
      return approveSession()
    }

    const currentNetwork = `neo3:${
      net === 'Custom' ? 'private' : net.toLowerCase()
    }`

    if (
      proposedNetwork !== currentNetwork &&
      proposedNetwork !== 'neo3:private'
    ) {
      return showNetworkSwitchModal({
        dAppName: metadata.name,
        approveSession,
        rejectSession,
        proposedNetwork: proposal.params.requiredNamespaces.neo3.chains[0],
      })
    }

    if (
      proposedNetwork === 'neo3:private' &&
      proposedNetwork !== currentNetwork
    ) {
      return showErrorNotification({
        message: `${metadata.name ||
          'unknown dApp'} is attempting to connect to a private network but you are currently on ${net}.`,
      })
    }

    approveSession()
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
                  handleApproveSessionClick()
                }}
              />

              <Deny
                onClick={() => {
                  rejectSession()
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </FullHeightPanel>
  )
}

const mapDispatchToProps = dispatch => ({
  showNetworkSwitchModal: props =>
    dispatch(showModal(MODAL_TYPES.NETWORK_SWITCH, props)),
})

export default compose(
  connect(
    null,
    mapDispatchToProps,
  ),
)(ApproveConnection)
