// @flow
import React from 'react'
import classNames from 'classnames'

import Transaction from '../../Blockchain/Transaction'
import LogoWithStrikethrough from '../../LogoWithStrikethrough'
import { ASSETS } from '../../../core/constants'
import { isZero } from '../../../core/math'
import { formatBalance } from '../../../core/formatters'

import styles from './Transactions.scss'

type Props = {
  className?: string,
  transactions: Array<Object>
}

export default class Transactions extends React.Component<Props> {
  render() {
    const { className, transactions } = this.props

    if (transactions.length === 0) {
      return (
        <div className={classNames(styles.noTransactions, className)}>
          <LogoWithStrikethrough />
        </div>
      )
    }

    return (
      <ul
        id="transactionList"
        className={classNames(styles.transactionList, className)}
      >
        {transactions.map((tx, i) => (
          <li
            key={tx.id}
            className={classNames(styles.row, {
              [styles.oddNumberedRow]: i % 2 === 0
            })}
          >
            <Transaction className={classNames(styles.txid, 'txid')} tx={tx} />
          </li>
        ))}
      </ul>
    )
  }
}
