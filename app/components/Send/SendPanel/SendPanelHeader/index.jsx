// @flow
import React from 'react'

import AddIcon from '../../../../assets/icons/add.svg'
import GridIcon from '../../../../assets/icons/grid.svg'

import styles from '../SendPanel.scss'

type Props = {
  sendRowDetails: Array,
  addRow: () => any,
  resetViews: () => any,
  showConfirmSend: boolean,
  sendSuccess: boolean,
  sendError: boolean
}

const SendPanelHeader = ({
  sendRowDetails,
  addRow,
  showConfirmSend,
  resetViews,
  sendError,
  sendSuccess
}: Props) => {
  let headerTitle = 'Select Assets'
  let headerSubtitle = `${sendRowDetails.length} of 5 Recipients`
  let buttons = (
    <div className={styles.sendPanelHeaderButtons}>
      <button type="button" className={styles.sendPanelHeaderButton}>
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
    headerSubtitle = `${sendRowDetails.length} Recipients`
    buttons = null
  }

  if (sendSuccess) {
    headerTitle = 'Complete!'
    headerSubtitle = `${sendRowDetails.length} asset types sent to 
    ${sendRowDetails.length} recipients from Main Funds Wallet`
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

  return (
    <section className={styles.sendPanelHeader}>
      <div className={styles.sendPanelHeaderInfo}>
        {headerTitle}{' '}
        <span className={styles.sendPanelRecipients}>{headerSubtitle}</span>
      </div>
      {buttons}
    </section>
  )
}

export default SendPanelHeader
