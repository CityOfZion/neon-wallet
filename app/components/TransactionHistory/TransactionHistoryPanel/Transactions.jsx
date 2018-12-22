// @flow
import React from 'react'
import classNames from 'classnames'

import Transaction from '../../Blockchain/Transaction'
import TransactionList from '../../Blockchain/Transaction/TransactionList'
import LogoWithStrikethrough from '../../LogoWithStrikethrough'

import styles from './Transactions.scss'

type Props = {
  className?: string,
  transactions: Array<Object>,
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
      <TransactionList className={className} alternateRows>
        {transactions.map((tx, i) => <Transaction tx={tx} key={i} />)}
      </TransactionList>
    )
  }
}
