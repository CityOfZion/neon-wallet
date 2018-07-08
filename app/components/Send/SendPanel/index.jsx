// @flow

import React, { Component } from 'react'

import AddIcon from '../../../assets/icons/add.svg'
import GridIcon from '../../../assets/icons/grid.svg'
import Panel from '../../Panel'
import SendRecipientList from './SendRecipientList'
import Button from '../../Button/Button'

import SendIcon from '../../../assets/icons/send.svg'

import styles from './SendPanel.scss'

type Props = {
  sendRowDetails: Array,
  sendableAssets: Object,
  contacts: Object,
  handleSubmit: Function,
  clearErrors: Function,
  addRow: Function,
  removeRow: Function,
  updateRowField: Function
}

class SendPanel extends Component<Props> {
  renderHeader = () => (
    <section className={styles.sendPanelHeader}>
      <div className={styles.sendPanelHeaderInfo}>
        Select Assets{' '}
        <span className={styles.sendPanelRecipients}>
          {this.props.sendRowDetails.length} of 5 recipients
        </span>
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
    const {
      sendRowDetails,
      sendableAssets,
      updateRowField,
      removeRow,
      contacts,
      clearErrors,
      handleSubmit
    } = this.props
    return (
      <Panel renderHeader={this.renderHeader}>
        <form onSubmit={handleSubmit}>
          <SendRecipientList
            sendRowDetails={sendRowDetails}
            sendableAssets={sendableAssets}
            removeRow={removeRow}
            updateRowField={updateRowField}
            contacts={contacts}
            clearErrors={clearErrors}
          />
          <Button
            primary
            className={styles.sendFormButton}
            renderIcon={() => <SendIcon />}
            type="submit"
          >
            Send Assets
          </Button>
        </form>
      </Panel>
    )
  }
}
export default SendPanel
