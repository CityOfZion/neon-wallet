// @flow
import React from 'react'
import classNames from 'classnames'

import Transaction from '../../components/Blockchain/Transaction'
import { formatBalance } from '../../core/formatters'

import styles from './Transactions.scss'

type Props = {
  transactions: Array<Object>
}

const Transactions = ({ transactions }: Props) => {
  if (transactions.length === 0) {
    return <div className={styles.noTransactions}>No transactions</div>
  }

  return (
    <ul id='transactionList' className={styles.transactionList}>
      {transactions.map((tx) => (
        <li key={tx.txid} className={styles.row}>
          <Transaction className={classNames(styles.txid, 'txid')} txid={tx.txid} />
          <div className={classNames(styles.amount, 'amount')}>
            {formatBalance(tx.type, tx.amount)} {tx.type}
          </div>
        </li>
      ))}
    </ul>
  )
}

export default Transactions
