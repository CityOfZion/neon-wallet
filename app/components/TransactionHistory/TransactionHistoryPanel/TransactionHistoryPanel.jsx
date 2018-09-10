// @flow
import React from 'react'
import classNames from 'classnames'

import Transactions from './Transactions'
import Panel from '../../Panel'

import styles from './TransactionHistoryPanel.scss'

type Props = {
  className: ?string,
  transactions: Array<Object>
}

export default class TransactionHistory extends React.Component<Props> {
  render() {
    const { className, transactions } = this.props

    return (
      <Panel className={classNames(styles.transactionHistoryPanel, className)}>
        <Transactions
          className={styles.transactions}
          transactions={transactions}
        />
      </Panel>
    )
  }
}
