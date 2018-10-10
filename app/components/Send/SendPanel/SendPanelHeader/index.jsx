// @flow
import React from 'react'

import Tooltip from '../../../Tooltip'
import AddIcon from '../../../../assets/icons/add.svg'
import GridIcon from '../../../../assets/icons/grid.svg'
import LightningIcon from '../../../../assets/icons/lightning.svg'
import PanelHeaderButton from '../../../PanelHeaderButton'

import { pluralize } from '../../../../util/pluralize'

import styles from '../SendPanel.scss'

type Props = {
  sendRowDetails: Array<*>,
  addRow: () => any,
  resetViews: () => any,
  showConfirmSend: boolean,
  sendSuccess: boolean,
  sendError: boolean,
  noSendableAssets: boolean,
  disabled: boolean,
  hasNetworkFees: boolean,
  maxNumberOfRecipients: number
}

const SendPanelHeader = ({
  sendRowDetails,
  addRow,
  showConfirmSend,
  resetViews,
  sendError,
  sendSuccess,
  noSendableAssets,
  disabled,
  hasNetworkFees = false,
  maxNumberOfRecipients
}: Props) => {
  const numberOfItems = sendRowDetails.length

  let headerTitle = 'Select Assets'
  let headerSubtitle = `${numberOfItems} of ${maxNumberOfRecipients} Recipients`
  let buttons = (
    <div className={styles.sendPanelHeaderButtons}>
      <Tooltip
        className={styles.disabledFeature}
        title="Coming Soon"
        position="left"
      >
        <PanelHeaderButton
          disabled
          onClick={() => {}}
          renderIcon={() => (
            <GridIcon className={styles.sendPanelHeaderButtonIcon} />
          )}
          buttonText="Enter QR Code"
        />
      </Tooltip>
      <PanelHeaderButton
        disabled={disabled}
        onClick={addRow}
        renderIcon={() => (
          <AddIcon className={styles.sendPanelHeaderButtonIcon} />
        )}
        buttonText="Add Recipient"
      />
    </div>
  )

  if (showConfirmSend) {
    headerTitle = 'Confirmation'
    headerSubtitle = `${numberOfItems} ${pluralize('Recipient', numberOfItems)}`
    buttons = <div className={styles.sendPanelHeaderButtons} />
  }

  if (sendSuccess) {
    headerTitle = 'Complete!'
    headerSubtitle = `${numberOfItems} asset ${pluralize(
      'type',
      numberOfItems
    )} sent to 
    ${numberOfItems} ${pluralize('recipient', numberOfItems)}.`
    buttons = (
      <div className={styles.sendPanelHeaderButtons}>
        <button
          type="button"
          className={styles.sendPanelHeaderButton}
          onClick={resetViews}
        >
          <AddIcon className={styles.sendPanelHeaderButtonIcon} /> Send More
          Assets
        </button>
      </div>
    )
  }

  if (sendError) {
    headerTitle = 'Error!'
    headerSubtitle = null
    buttons = null
  }

  if (noSendableAssets) {
    headerTitle = 'No available assets to send'
    headerSubtitle = null
    buttons = null
  }

  return (
    <section className={styles.sendPanelHeader}>
      <div className={styles.sendPanelHeaderInfo}>
        {headerTitle}{' '}
        <span className={styles.sendPanelRecipients}>{headerSubtitle}</span>
      </div>
      {hasNetworkFees && (
        <div className={styles.priorityTrasferHeaderTextContainer}>
          <LightningIcon /> Priority Transfer
        </div>
      )}
      {buttons}
    </section>
  )
}

export default SendPanelHeader
