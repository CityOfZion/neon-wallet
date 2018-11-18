// @flow

import React from 'react'
import classNames from 'classnames'
import { uniqueId } from 'lodash-es'

import SendRecipientListItem from './SendRecipientListItem'

import styles from './SendRecipientList.scss'

type Props = {
  sendRowDetails: Array<*>,
  sendableAssets: Object,
  contacts: Object,
  showConfirmSend: boolean,
  clearErrors: (index: number, field: string) => any,
  removeRow: (index: number) => any,
  updateRowField: (index: number, field: string, value: any) => any,
  calculateMaxValue: (asset: string, index: number) => string
}

const SendRecipientList = ({
  sendRowDetails,
  removeRow,
  updateRowField,
  sendableAssets,
  contacts,
  clearErrors,
  showConfirmSend,
  calculateMaxValue
}: Props) => {
  const renderRows = () =>
    sendRowDetails.map((row, index) => (
      <SendRecipientListItem
        key={row.id || uniqueId}
        {...row}
        index={index}
        numberOfRecipients={sendRowDetails.length}
        showConfirmSend={showConfirmSend}
        removeRow={removeRow}
        updateRowField={updateRowField}
        sendableAssets={sendableAssets}
        contacts={contacts}
        clearErrors={clearErrors}
        calculateMaxValue={calculateMaxValue}
      />
    ))

  return (
    <section className={styles.sendRecipientListContainer}>
      <div className={styles.sendRecipientListHeaders}>
        <h3
          className={classNames(styles.sendRecipientListHeader, styles.asset)}
        >
          Asset
        </h3>
        <h3
          className={classNames(styles.sendRecipientListHeader, styles.amount)}
        >
          Amount
        </h3>
        <h3
          className={classNames(styles.sendRecipientListHeader, styles.address)}
        >
          Recipient Address
        </h3>
        <div className={styles.delete} />
      </div>
      <ul className={styles.sendRecipientList}>{renderRows()}</ul>
    </section>
  )
}

export default SendRecipientList
