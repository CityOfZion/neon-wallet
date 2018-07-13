// @flow

import React from 'react'

import Panel from '../../Panel'
import SendRecipientList from './SendRecipientList'
import SendPanelHeader from './SendPanelHeader'
import Button from '../../Button/Button'
import ConfirmSend from './ConfirmSend'
import SendSuccess from './SendSuccess'
import SendError from './SendError'

import SendIcon from '../../../assets/icons/send.svg'

import styles from './SendPanel.scss'

type Props = {
  sendRowDetails: Array,
  sendableAssets: Object,
  contacts: Object,
  showConfirmSend: boolean,
  sendSuccess: boolean,
  sendError: boolean,
  txid: string,
  resetViews: () => any,
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
  sendSuccess,
  sendError,
  resetViews,
  txid,
  handleEditRecipientsClick
}: Props) => {
  let content = (
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
  )

  if (showConfirmSend) {
    content = (
      <form onSubmit={handleSend}>
        <SendRecipientList
          sendRowDetails={sendRowDetails}
          sendableAssets={sendableAssets}
          removeRow={removeRow}
          updateRowField={updateRowField}
          contacts={contacts}
          clearErrors={clearErrors}
          showConfirmSend={showConfirmSend}
        />
        <ConfirmSend handleEditRecipientsClick={handleEditRecipientsClick} />
      </form>
    )
  }

  if (sendSuccess) {
    content = <SendSuccess txid={txid} sendRowDetails={sendRowDetails} />
  }

  if (sendError) {
    content = <SendError />
  }

  return (
    <Panel
      contentClassName={sendSuccess ? styles.sendSuccessContent : null}
      renderHeader={() => (
        <SendPanelHeader
          sendRowDetails={sendRowDetails}
          addRow={addRow}
          showConfirmSend={showConfirmSend}
          sendSuccess={sendSuccess}
          resetViews={resetViews}
        />
      )}
    >
      {content}
    </Panel>
  )
}

export default SendPanel
