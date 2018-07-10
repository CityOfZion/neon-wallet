// @flow

import React from 'react'

import CheckMarkIcon from '../../../../assets/icons/confirm.svg'
import SendSuccessTransaction from './SendSuccessTransaction'

import { createFormattedDate } from '../../../../util/createFormattedDate'

import styles from './SendSuccess.scss'

type Props = {
  sendRowDetails: Array,
  txid: string
}

const SendSuccess = ({ sendRowDetails, txid }: Props) => (
  <section>
    <div className={styles.sendSuccessHeader}>
      <CheckMarkIcon className={styles.sendSuccessHeaderIcon} />
      <div className={styles.sendSuccessHeaderInfo}>
        <h1 className={styles.sendSuccessHeaderInfoText}>
          {sendRowDetails.length} Transactions completed
        </h1>
        <p className={styles.sendSuccessDateText}>{createFormattedDate()}</p>
      </div>
    </div>
    <div className={styles.sendSuccessBody}>
      <h2 className={styles.sendSuccessBodyHeaderText}>Asset Recipients</h2>
      <ul className={styles.sendSuccessBodyList}>
        {sendRowDetails.map(row => (
          <SendSuccessTransaction
            key={row.id}
            amount={row.amount}
            asset={row.asset}
            address={row.address}
            note={row.note}
            txid={txid}
          />
        ))}
      </ul>
    </div>
  </section>
)

export default SendSuccess
