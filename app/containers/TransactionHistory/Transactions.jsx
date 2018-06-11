// @flow
import React from 'react'
import classNames from 'classnames'

import Transaction from '../../components/Blockchain/Transaction'
import { ASSETS } from '../../core/constants'
import { isZero } from '../../core/math'
import { formatBalance } from '../../core/formatters'

import styles from './Transactions.scss'

type Props = {
  className?: string,
  transactions: Array<TransactionHistoryType>
}

export default class Transactions extends React.Component<Props> {
  render () {
    const { className, transactions } = this.props

    if (transactions.length === 0) {
      return <div className={classNames(styles.noTransactions, className)}>No transactions</div>
    }

    return (
      <ul id='transactionList' className={classNames(styles.transactionList, className)}>
        {transactions.map((tx) => (
          <li key={tx.txid} className={styles.row}>
            <Transaction className={classNames(styles.txid, 'txid')} txid={tx.txid} />
            {this.renderAmounts(tx)}
          </li>
        ))}
      </ul>
    )
  }

  renderAmounts (tx: TransactionHistoryType) {
    const forceRenderNEO = !isZero(tx[ASSETS.NEO]) || isZero(tx[ASSETS.GAS])

    return (
      <div className={styles.amounts}>
        {this.renderAmount(tx, ASSETS.NEO, forceRenderNEO)}
        {this.renderAmount(tx, ASSETS.GAS)}
      </div>
    )
  }

  renderAmount (tx: TransactionHistoryType, symbol: SymbolType, forceRender: boolean = false) {
    const amount = tx[symbol]

    if (forceRender || !isZero(amount)) {
      return (
        <div className={classNames(styles.amount, `amount${symbol}`)}>
          {formatBalance(symbol, amount)} {symbol}
        </div>
      )
    }
  }
}
