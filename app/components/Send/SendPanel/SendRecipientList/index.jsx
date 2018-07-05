// @flow

import React from 'react'
import classNames from 'classnames'

import SendRecipientListItem from './SendRecipientListItem'

import styles from './SendRecipientList.scss'

type Props = {
  sendRowDetails: array,
  removeRow: Function,
  updateRowField: Function
}

const SendRecipientList = ({
  sendRowDetails,
  removeRow,
  updateRowField
}: Props) => {
  const renderRows = () =>
    sendRowDetails.map((row, index) => (
      <SendRecipientListItem
        key={row.id}
        asset={row.asset}
        amount={row.amount}
        address={row.address}
        note={row.note}
        index={index}
        removeRow={removeRow}
        updateRowField={updateRowField}
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
        <h3
          className={classNames(
            styles.sendRecipientListHeader,
            styles.reference
          )}
        >
          Reference
        </h3>
        <div className={styles.delete} />
      </div>
      <ul className={styles.sendRecipientList}>{renderRows()}</ul>
    </section>
  )
}

export default SendRecipientList
