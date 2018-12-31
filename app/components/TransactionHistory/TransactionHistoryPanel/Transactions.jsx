// @flow
import React from 'react'
import classNames from 'classnames'
import { isEmpty } from 'lodash-es'

import Transaction from '../../Blockchain/Transaction'
import TransactionList from '../../Blockchain/Transaction/TransactionList'
import LogoWithStrikethrough from '../../LogoWithStrikethrough'

import styles from './Transactions.scss'

type Props = {
  className?: string,
  transactions: Array<Object>,
  pendingTransactions: Array<Object>,
}

export default class Transactions extends React.Component<Props> {
  static defaultProps = {
    pendingTransactions: [],
  }

  render() {
    const { className, transactions, pendingTransactions } = this.props
    if (isEmpty(transactions) && isEmpty(pendingTransactions)) {
      return (
        <div className={classNames(styles.noTransactions, className)}>
          <LogoWithStrikethrough />
        </div>
      )
    }

    return (
      <TransactionList className={className} alternateRows>
        {pendingTransactions &&
          pendingTransactions.map((tx, i) => (
            <Transaction isPending pendingTx={tx} key={i} />
          ))}
        {transactions.map((tx, i) => <Transaction tx={tx} key={i} />)}
      </TransactionList>
    )
  }
}
