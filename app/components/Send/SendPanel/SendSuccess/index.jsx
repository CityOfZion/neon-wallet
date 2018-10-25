// @flow
import React from 'react'

import CheckMarkIcon from '../../../../assets/icons/confirm-circle.svg'
import SendSuccessTransaction from './SendSuccessTransaction'

import { pluralize } from '../../../../util/pluralize'
import { createFormattedDate } from '../../../../util/createFormattedDate'

import styles from './SendSuccess.scss'

type Props = {
  sendRowDetails: Array<*>,
  txid: string
}

const SendSuccess = ({ sendRowDetails, txid }: Props) => {
  const numberOfItems = sendRowDetails.length

  return (
    <section>
      <div className={styles.sendSuccessHeader}>
        <CheckMarkIcon className={styles.sendSuccessHeaderIcon} />
        <div className={styles.sendSuccessHeaderInfo}>
          <h1 className={styles.sendSuccessHeaderInfoText}>
            {numberOfItems} {pluralize('Transaction', numberOfItems)} completed
          </h1>
          <p className={styles.sendSuccessParagraphText}>
            {createFormattedDate()}
          </p>
          <p className={styles.sendSuccessParagraphText}>
            Transaction ID: {txid}
          </p>
        </div>
      </div>
      <div className={styles.sendSuccessBody}>
        <h2 className={styles.sendSuccessBodyHeaderText}>
          Asset {pluralize('Recipient', numberOfItems)}
        </h2>
        <ul className={styles.sendSuccessBodyList}>
          {sendRowDetails.map(row => (
            <SendSuccessTransaction
              key={row.id}
              amount={row.amount}
              asset={row.asset}
              address={row.address}
              txid={txid}
            />
          ))}
        </ul>
      </div>
    </section>
  )
}

export default SendSuccess
