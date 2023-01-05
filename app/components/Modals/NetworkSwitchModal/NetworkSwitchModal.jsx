// @flow
import React from 'react'

import FullHeightPanel from '../../Panel/FullHeightPanel'
import BaseModal from '../BaseModal'
import styles from './NetworkSwitchModal.scss'
import CloseButton from '../../CloseButton'
import Cog from '../../../assets/icons/cog-icon.svg'

import Button from '../../Button'

type Props = {
  hideModal: Function,
  net: string,
  dAppName: string,
  approveSession: (network: string) => void,
  rejectSession: () => void,
  switchNetworks: (id: string) => void,
}

export default function NetworkSwitchModal(props: Props) {
  const {
    hideModal,
    net,
    dAppName = 'The dApp you are using',
    approveSession,
    rejectSession,
    switchNetworks,
  } = props

  const requestedNetwork = net === 'MainNet' ? 'TestNet' : 'MainNet'
  const requestedNetworkId = net === 'MainNet' ? '2' : '1'

  function handleCancelClick() {
    rejectSession()
    hideModal()
  }

  function handleApproveClick() {
    switchNetworks(requestedNetworkId)
    approveSession(requestedNetwork.toLowerCase())
    hideModal()
  }

  return (
    <BaseModal
      hideModal={hideModal}
      shouldRenderHeader={false}
      style={{
        content: {
          width: '500px',
          height: '320px',
        },
      }}
      dismissable={false}
    >
      <FullHeightPanel
        shouldRenderNavigation={false}
        containerClassName={styles.releaseNotesContainer}
        renderInstructions={false}
        renderHeaderIcon={() => <Cog />}
        headerText="Change networks?"
        renderCloseButton={() => (
          <div className={styles.closeButton} onClick={() => hideModal()}>
            <CloseButton renderWithoutLink />
          </div>
        )}
      >
        <p className={styles.explanation}>
          {' '}
          {dAppName} has made a session request for {requestedNetwork} however
          you are currently on {net}, would you like to change networks and
          accept this request?
        </p>
        {/* <div>
            <br />
            Open Neon on your mobile device and tap "Scan QR Code" to import
            your account
          </div>

          <div className={styles.qr}>
            <label>
              {' '}
              <FormattedMessage
                id={IS_NEP2_EXPORT ? 'encryptedKeyLabel' : 'addressLabel'}
              />{' '}
            </label>
            <canvas
              ref={node => {
                this.targetCanvas = node
              }}
            />
          </div> */}
        <div className={styles.buttonContainer}>
          <Button onClick={handleCancelClick}>Cancel</Button>
          <Button primary onClick={handleApproveClick}>
            Switch networks
          </Button>
        </div>
      </FullHeightPanel>
    </BaseModal>
  )
}
