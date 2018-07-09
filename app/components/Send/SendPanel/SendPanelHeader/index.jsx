// @flow
import React from 'react'

import AddIcon from '../../../../assets/icons/add.svg'
import GridIcon from '../../../../assets/icons/grid.svg'

import styles from '../SendPanel.scss'

type Props = {
  sendRowDetails: Array,
  addRow: () => any,
  showConfirmSend: boolean
}

const SendPanelHeader = ({
  sendRowDetails,
  addRow,
  showConfirmSend
}: Props) => {
  let headerTitle = 'Select Assets'
  let headerSubtitle = `${sendRowDetails.length} of 5 Recipients`

  if (showConfirmSend) {
    headerTitle = 'Confirmation'
    headerSubtitle = `${sendRowDetails.length} Recipients`
  }

  return (
    <section className={styles.sendPanelHeader}>
      <div className={styles.sendPanelHeaderInfo}>
        {headerTitle}{' '}
        <span className={styles.sendPanelRecipients}>{headerSubtitle}</span>
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
            <AddIcon className={styles.sendPanelHeaderButtonIcon} /> Add
            Recipient
          </button>
        </div>
      )}
    </section>
  )
}

export default SendPanelHeader
