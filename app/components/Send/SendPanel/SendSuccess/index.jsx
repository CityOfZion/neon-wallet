// @flow
import React from 'react'
import { FormattedMessage } from 'react-intl'

import CheckMarkIcon from '../../../../assets/icons/confirm-circle.svg'
import Transaction from '../../../Blockchain/Transaction'
import TransactionList from '../../../Blockchain/Transaction/TransactionList'
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
    const transferCount = sendRowDetails.length

    return (
      <section>
        <div className={styles.sendSuccessHeader}>
          <CheckMarkIcon className={styles.sendSuccessHeaderIcon} />
          <div className={styles.sendSuccessHeaderInfo}>
            <h1 className={styles.sendSuccessHeaderInfoText}>
              <FormattedMessage
                id="numberofTransactionsPending"
                values={{
                  transferCount,
                }}
              />
            </h1>
            <p className={styles.sendSuccessParagraphText}>
              {this.txFormattedDate}
            </p>
            <p className={styles.sendSuccessParagraphText}>
              <FormattedMessage id="transactionId" /> {txid}
            </p>
          </div>
        </div>
        <div className={styles.activityLinkText}>
          <ActivityLink />
        </div>
        <div className={styles.sendSuccessBody}>
          <h2 className={styles.sendSuccessBodyHeaderText}>
            <FormattedMessage
              id="assetRecipients"
              values={{
                transferCount,
              }}
            />
          </h2>
          <TransactionList>
            {transactions.map((tx, i) => (
              <Transaction
                renderN2Tx
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
