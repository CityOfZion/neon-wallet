// @flow

import React, { Component } from 'react'

import Panel from '../../Panel'
import SendRecipientList from './SendRecipientList'
import SendPanelHeader from './SendPanelHeader'
import Button from '../../Button/Button'

import SendIcon from '../../../assets/icons/send.svg'

import styles from './SendPanel.scss'

type Props = {
  sendRowDetails: Array,
  sendableAssets: Object,
  contacts: Object,
  showConfirmSend: boolean,
  handleSubmit: () => any,
  clearErrors: (index: number, field: string) => any,
  addRow: () => any,
  removeRow: (index: number) => any,
  updateRowField: (index: number, field: string, value: any) => any
}

class SendPanel extends Component<Props> {
  render() {
    const {
      sendRowDetails,
      sendableAssets,
      updateRowField,
      addRow,
      removeRow,
      contacts,
      clearErrors,
      handleSubmit,
      showConfirmSend
    } = this.props
    return (
      <Panel
        renderHeader={() => (
          <SendPanelHeader
            sendRowDetails={sendRowDetails}
            addRow={addRow}
            showConfirmSend={showConfirmSend}
          />
        )}
      >
        <form onSubmit={handleSubmit}>
          <SendRecipientList
            sendRowDetails={sendRowDetails}
            sendableAssets={sendableAssets}
            removeRow={removeRow}
            updateRowField={updateRowField}
            contacts={contacts}
            clearErrors={clearErrors}
            showConfirmSend={showConfirmSend}
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
