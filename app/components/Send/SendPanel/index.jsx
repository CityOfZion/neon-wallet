// @flow
import React from 'react'
import { get } from 'lodash-es'

import Panel from '../../Panel'
import SendRecipientList from './SendRecipientList'
import PriorityFee from '../PriorityFee'
import SendPanelHeader from './SendPanelHeader'
import Button from '../../Button/Button'
import ConfirmSend from './ConfirmSend'
import SendSuccess from './SendSuccess'
import SendError from './SendError'
import ZeroAssets from '../../ZeroAssets/ZeroAssets'
import { pluralize } from '../../../util/pluralize'
import SendIcon from '../../../assets/icons/send.svg'

import styles from './SendPanel.scss'

type Props = {
  sendRowDetails: Array<*>,
  sendableAssets: Object,
  contacts: Object,
  showConfirmSend: boolean,
  sendSuccess: boolean,
  sendErrorMessage: string,
  sendError: boolean,
  noSendableAssets: boolean,
  txid: string,
  fees: number,
  handleAddPriorityFee: number => any,
  address: string,
  maxNumberOfRecipients: number,
  resetViewsAfterError: () => any,
  resetViews: () => any,
  handleSubmit: () => any,
  handleSend: () => any,
  clearErrors: (index: number, field: string) => any,
  addRow: (row: Object) => any,
  removeRow: (index: number) => any,
  updateRowField: (index: number, field: string, value: any) => any,
  handleEditRecipientsClick: () => any,
  showSendModal: (props: Object) => any,
  pushQRCodeData: (data: Object) => any
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
  sendErrorMessage,
  resetViewsAfterError,
  resetViews,
  noSendableAssets,
  txid,
  handleEditRecipientsClick,
  handleAddPriorityFee,
  fees,
  address,
  maxNumberOfRecipients,
  showSendModal,
  pushQRCodeData
}: Props) => {
  const shouldDisableSendButton = sendRowDetails => {
    let disabled = false
    sendRowDetails.some(detail => {
      if (!detail.address) {
        disabled = true
        return true
      }
      if (!detail.amount) {
        disabled = true
        return true
      }
      return false
    })
    return disabled
  }

  const maxRecipientsMet = () => sendRowDetails.length === maxNumberOfRecipients

  if (noSendableAssets) {
    return <ZeroAssets address={address} />
  }

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

      <div className={styles.priorityFeeContainer}>
        <PriorityFee
          availableGas={Number(get(sendableAssets, 'GAS.balance', 0))}
          handleAddPriorityFee={handleAddPriorityFee}
          fees={fees}
          disabled={shouldDisableSendButton(sendRowDetails)}
        />
      </div>

      <Button
        primary
        className={styles.sendFormButton}
        renderIcon={() => <SendIcon />}
        type="submit"
        disabled={shouldDisableSendButton(sendRowDetails)}
      >
        Send {pluralize('Asset', sendRowDetails.length)}{' '}
        {fees ? 'With Fee' : 'Without Fee'}
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
        <ConfirmSend
          handleEditRecipientsClick={handleEditRecipientsClick}
          fees={fees}
        />
      </form>
    )
  }

  if (sendSuccess) {
    content = <SendSuccess txid={txid} sendRowDetails={sendRowDetails} />
  }

  if (sendError) {
    content = (
      <SendError
        resetViewsAfterError={resetViewsAfterError}
        sendErrorMessage={sendErrorMessage}
      />
    )
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
          sendError={sendError}
          resetViews={resetViews}
          noSendableAssets={noSendableAssets}
          hasNetworkFees={!!fees}
          maxNumberOfRecipients={maxNumberOfRecipients}
          showSendModal={showSendModal}
          pushQRCodeData={pushQRCodeData}
          disableAddRecipient={
            shouldDisableSendButton(sendRowDetails) || maxRecipientsMet()
          }
          disableEnterQRCode={maxRecipientsMet()}
        />
      )}
      className={styles.sendSuccessPanel}
    >
      {content}
    </Panel>
  )
}

export default SendPanel
