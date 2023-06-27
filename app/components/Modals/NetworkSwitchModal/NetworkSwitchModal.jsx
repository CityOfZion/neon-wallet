// @flow
import React from 'react'

import FullHeightPanel from '../../Panel/FullHeightPanel'
import BaseModal from '../BaseModal'
import styles from './NetworkSwitchModal.scss'
import CloseButton from '../../CloseButton'
import Cog from '../../../assets/icons/cog-icon.svg'

import Button from '../../Button'
import { networksIDSByNetworksLabel } from '../../../util/walletConnect'
import { useSettingsContext } from '../../../context/settings/SettingsContext'

type Props = {
  hideModal: Function,
  net: string,
  dAppName: string,
  onSwitch: () => void,
  onCancel: (error?: string) => void,
  switchNetworks: (id: string) => void,
  saveSelectedNode: Function,
  proposalNetwork: string,
}

export default function NetworkSwitchModal({
  hideModal,
  net,
  dAppName,
  onSwitch,
  onCancel,
  switchNetworks,
  saveSelectedNode,
  proposalNetwork,
}: Props) {
  const { settings } = useSettingsContext()

  function handleCancelClick() {
    onCancel()
    hideModal()
  }

  function handleApproveClick() {
    try {
      const network = Object.entries(networksIDSByNetworksLabel).find(
        ([key]) => key === proposalNetwork,
      )

      if (!network) throw new Error('Invalid network')
      const networkId = (network[1]: any)

      if (networkId === 'Custom') {
        const customNetwork = settings.customNetworks[0]

        if (!customNetwork) throw new Error('There is no custom network')
        saveSelectedNode({
          url: customNetwork.rpc,
          net: 'Custom',
          label: customNetwork.label,
        })
      }

      switchNetworks(networkId)
      onSwitch()
    } catch (error) {
      onCancel(error.message)
    } finally {
      hideModal()
    }
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
          {dAppName} has made a session request for {proposalNetwork} however
          you are currently on {net}, would you like to change networks and
          accept this request?
        </p>
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
