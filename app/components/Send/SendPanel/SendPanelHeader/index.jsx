// @flow
import React from 'react'

import AddIcon from '../../../../assets/icons/add.svg'
import GridIcon from '../../../../assets/icons/grid.svg'

import styles from '../SendPanel.scss'

type Props = {
  sendRowDetails: Array,
  addRow: Function,
  showConfirmSend: boolean
}

const SendPanelHeader = ({
  sendRowDetails,
  addRow,
  showConfirmSend
}: Props) => (
  <section className={styles.sendPanelHeader}>
    <div className={styles.sendPanelHeaderInfo}>
      Select Assets{' '}
      <span className={styles.sendPanelRecipients}>
        {sendRowDetails.length} of 5 recipients
      </span>
    </div>
    {!showConfirmSend && (
      <div className={styles.sendPanelHeaderButtons}>
        <button type="button" className={styles.sendPanelHeaderButton}>
          <GridIcon className={styles.sendPanelHeaderButtonIcon} /> Enter QR
          Code
        </button>
        <button
          type="button"
          className={styles.sendPanelHeaderButton}
          onClick={addRow}
        >
          <AddIcon className={styles.sendPanelHeaderButtonIcon} /> Add Recipient
        </button>
      </div>
    )}
  </section>
)

export default SendPanelHeader
