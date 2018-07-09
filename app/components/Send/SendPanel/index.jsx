// @flow

import React from 'react'

import Panel from '../../Panel'
import SendRecipientList from './SendRecipientList'
import SendPanelHeader from './SendPanelHeader'
import Button from '../../Button/Button'
import ConfirmSend from './ConfirmSend'

import SendIcon from '../../../assets/icons/send.svg'

import styles from './SendPanel.scss'

type Props = {
  sendRowDetails: Array,
  sendableAssets: Object,
  contacts: Object,
  showConfirmSend: boolean,
  handleSubmit: () => any,
  handleSend: () => any,
  clearErrors: (index: number, field: string) => any,
  addRow: () => any,
  removeRow: (index: number) => any,
  updateRowField: (index: number, field: string, value: any) => any,
  handleEditRecipientsClick: () => any
}

const SendPanel = ({
  sendRowDetails,
  sendableAssets,
  updateRowField,
  addRow,
  removeRow,
  contacts,
  clearErrors,
  handleSubmit,
  handleSend,
  showConfirmSend,
  handleEditRecipientsClick
}: Props) => (
  <Panel
    renderHeader={() => (
      <SendPanelHeader
        sendRowDetails={sendRowDetails}
        addRow={addRow}
        showConfirmSend={showConfirmSend}
      />
    )}
  >
    <form onSubmit={showConfirmSend ? handleSend : handleSubmit}>
      <SendRecipientList
        sendRowDetails={sendRowDetails}
        sendableAssets={sendableAssets}
        removeRow={removeRow}
        updateRowField={updateRowField}
        contacts={contacts}
        clearErrors={clearErrors}
        showConfirmSend={showConfirmSend}
      />
      {!showConfirmSend && (
        <Button
          primary
          className={styles.sendFormButton}
          renderIcon={() => <SendIcon />}
          type="submit"
        >
          Send Assets
        </Button>
      )}
      {showConfirmSend && (
        <ConfirmSend handleEditRecipientsClick={handleEditRecipientsClick} />
      )}
    </form>
  </Panel>
)

export default SendPanel
