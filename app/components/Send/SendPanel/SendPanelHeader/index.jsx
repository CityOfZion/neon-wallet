// @flow
import React from 'react'

import AddIcon from '../../../../assets/icons/add.svg'
import GridIcon from '../../../../assets/icons/grid.svg'
import LightningIcon from '../../../../assets/icons/lightning.svg'

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
  hasNetworkFees: boolean
}

const SendPanelHeader = ({
  sendRowDetails,
  addRow,
  showConfirmSend,
  resetViews,
  sendError,
  sendSuccess,
  noSendableAssets,
  hasNetworkFees = false
}: Props) => {
  const numberOfItems = sendRowDetails.length

  let headerTitle = 'Select Assets'
  let headerSubtitle = `${numberOfItems} of 5 Recipients`
  let buttons = (
    <div className={styles.sendPanelHeaderButtons}>
      <button
        type="button"
        className={styles.enterQrHeaderButton}
        onClick={addRow}
      >
        <GridIcon className={styles.sendPanelHeaderButtonIcon} /> Enter QR Code
      </button>
      <button
        type="button"
        className={styles.sendPanelHeaderButton}
        onClick={addRow}
      >
        <AddIcon className={styles.sendPanelHeaderButtonIcon} /> Add Recipient
      </button>
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
    headerTitle = 'No available assets to send.'
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
