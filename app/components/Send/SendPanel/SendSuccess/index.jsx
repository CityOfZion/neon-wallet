// @flow
import React from 'react'

import CheckMarkIcon from '../../../../assets/icons/confirm-circle.svg'
import Transaction from '../../../Blockchain/Transaction'
import TransactionList from '../../../Blockchain/Transaction/TransactionList'
import { pluralize } from '../../../../util/pluralize'
import { createFormattedDate } from '../../../../util/createFormattedDate'
import styles from './SendSuccess.scss'
import { TX_TYPES } from '../../../../core/constants'
import ActivityLink from '../ActivityLink'

type Props = {
  sendRowDetails: Array<*>,
  txid: string,
}

export default class SendSuccess extends React.Component<Props> {
  txFormattedDate: string

  componentDidMount() {
    this.txFormattedDate = createFormattedDate()
  }

  render() {
    const { sendRowDetails, txid } = this.props
    // normalize tx data for Transaction
    const transactions = sendRowDetails.map(row => ({
      type: TX_TYPES.SEND,
      amount: row.amount,
      label: row.asset,
      to: row.address,
      txid,
    }))
    const numberOfItems = sendRowDetails.length
    return (
      <section>
        <div className={styles.sendSuccessHeader}>
          <CheckMarkIcon className={styles.sendSuccessHeaderIcon} />
          <div className={styles.sendSuccessHeaderInfo}>
            <h1 className={styles.sendSuccessHeaderInfoText}>
              {numberOfItems} {pluralize('Transfer', numberOfItems)} completed
            </h1>
            <p className={styles.sendSuccessParagraphText}>
              {this.txFormattedDate}
            </p>
            <p className={styles.sendSuccessParagraphText}>
              Transaction ID: {txid}
            </p>
          </div>
        </div>
        <div className={styles.activityLinkText}>
          <ActivityLink />
        </div>
        <div className={styles.sendSuccessBody}>
          <h2 className={styles.sendSuccessBodyHeaderText}>
            Asset {pluralize('Recipient', numberOfItems)}
          </h2>
          <TransactionList>
            {transactions.map((tx, i) => (
              <Transaction
                tx={tx}
                key={`sentTx${i}`}
                className={styles.sendSuccessBodyListItem}
              />
            ))}
          </TransactionList>
        </div>
      </section>
    )
  }
}
