// @flow
import React from 'react'

import {
  useWalletConnectWallet,
  TSessionProposal,
} from '@cityofzion/wallet-connect-sdk-wallet-react'
import { MODAL_TYPES, ROUTES } from '../../../core/constants'
import CloseButton from '../../CloseButton'
import FullHeightPanel from '../../Panel/FullHeightPanel'
import WallletConnect from '../../../assets/icons/wallet_connect.svg'
import styles from '../../../containers/ConnectDapp/styles.scss'
import Confirm from '../../../assets/icons/confirm_connection.svg'
import Deny from '../../../assets/icons/deny_connection.svg'
import {
  convertChain,
  getNetworkFromProposal,
} from '../../../util/walletConnect'

type Props = {
  proposal: TSessionProposal,
  history: any,
  showSuccessNotification: ({ message: string }) => void,
  showErrorNotification: ({ message: string }) => void,
  showModal: (modalType: string, modalProps: Object) => void,
  net: string,
  address: string,
}

const ApproveConnection = ({
  proposal,
  history,
  showSuccessNotification,
  showErrorNotification,
  net,
  address,
  showModal,
}: Props) => {
  const { approveProposal, rejectProposal } = useWalletConnectWallet()
  const {
    proposer: { metadata },
    requiredNamespaces,
  } = proposal.params

  const approveSession = async (network: string) => {
    const chain = convertChain(network)

    try {
      await approveProposal(proposal, { address, chain, blockchain: 'neo3' })

      showSuccessNotification({
        message: `You have accepted connection from ${
          proposal ? metadata.name : 'unknown dApp'
        }.`,
        stack: true,
      })
    } catch (error) {
      showErrorNotification({
        message: `An error occurred attempting to approve proposal: ${
          error.message
        }`,
        stack: true,
      })
    } finally {
      history.push(ROUTES.DASHBOARD)
    }
  }

  const rejectSession = async () => {
    try {
      await rejectProposal(proposal)
      showSuccessNotification({
        message: `You have rejected connection from ${metadata.name}.`,
        stack: true,
      })
    } catch (error) {
      showErrorNotification({
        message: `An error occurred attempting to reject proposal: ${
          error.message
        }`,
      })
    } finally {
      history.push(ROUTES.DASHBOARD)
    }
  }

  const handleApproveSessionClick = () => {
    const { network: proposalNetwork } = getNetworkFromProposal(proposal)

    if (proposalNetwork !== net) {
      return showModal(MODAL_TYPES.NETWORK_SWITCH, {
        dAppName: metadata.name,
        onSwitch: () => approveSession(proposalNetwork),
        onCancel: rejectSession,
        proposalNetwork,
      })
    }

    approveSession(net)
  }

  return (
    <FullHeightPanel
      headerText="Wallet Connect"
      renderCloseButton={() => (
        <CloseButton
          onClick={() => rejectSession()}
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
              <Confirm onClick={handleApproveSessionClick} />

              <Deny onClick={rejectSession} />
            </div>
          </div>
        </div>
      </div>
    </FullHeightPanel>
  )
}

export default ApproveConnection
