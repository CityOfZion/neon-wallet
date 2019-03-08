import React from 'react'

import HeaderBar from '../../components/HeaderBar'
import TransactionHistoryPanel from '../../components/TransactionHistory/TransactionHistoryPanel'
import styles from './TransactionHistory.scss'
import RefreshButton from '../Buttons/RefreshButton/RefreshButton'
import ExportIcon from '../../assets/icons/export.svg'
import PanelHeaderButton from '../../components/PanelHeaderButton/PanelHeaderButton'

const PanelHeaderContent = () => (
  <div className={styles.panelHeaderButtons}>
    <PanelHeaderButton
      className={styles.exportButton}
      renderIcon={() => <ExportIcon />}
      buttonText="Export"
    />
    <RefreshButton />
  </div>
)

export default function TransactionHistory() {
  return (
    <div className={styles.transactionHistory}>
      <HeaderBar label="All Activity" renderRightContent={PanelHeaderContent} />
      <TransactionHistoryPanel className={styles.transactionHistoryPanel} />
    </div>
  )
}
