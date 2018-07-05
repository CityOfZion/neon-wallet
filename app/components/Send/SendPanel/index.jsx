// @flow

import React, { Component } from 'react'

import AddIcon from '../../../assets/icons/add.svg'
import GridIcon from '../../../assets/icons/grid.svg'
import Panel from '../../Panel'
import SendRecipientList from './SendRecipientList'

import styles from './SendPanel.scss'

type Props = {
  sendRowDetails: array,
  addRow: Function,
  removeRow: Function
}

class SendPanel extends Component<Props> {
  renderHeader = () => (
    <section className={styles.sendPanelHeader}>
      <div className={styles.sendPanelHeaderInfo}>
        Select Assets{' '}
        <span className={styles.sendPanelRecipients}>0 of 5 recipients</span>
      </div>
      <div className={styles.sendPanelHeaderButtons}>
        <button type="button" className={styles.sendPanelHeaderButton}>
          <GridIcon className={styles.sendPanelHeaderButtonIcon} /> Enter QR
          Code
        </button>
        <button
          type="button"
          className={styles.sendPanelHeaderButton}
          onClick={this.props.addRow}
        >
          <AddIcon className={styles.sendPanelHeaderButtonIcon} /> Add Recipient
        </button>
      </div>
    </section>
  )

  render() {
    return (
      <Panel renderHeader={this.renderHeader}>
        <SendRecipientList
          sendRowDetails={this.props.sendRowDetails}
          removeRow={this.props.removeRow}
        />
      </Panel>
    )
  }
}
export default SendPanel
