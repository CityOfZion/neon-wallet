// @flow
import React from 'react'
import ReactDOM from 'react-dom'
import classNames from 'classnames'

import Transactions from './Transactions'
import Panel from '../../Panel'

import styles from './TransactionHistoryPanel.scss'

type Props = {
  className: ?string,
  transactions: Array<Object>,
  handleFetchAddtionalTxData: () => any
}

export default class TransactionHistory extends React.Component<Props> {
  render() {
    const { className, transactions } = this.props
    return (
      <Panel
        className={classNames(styles.transactionHistoryPanel, className)}
        onScroll={this.handleScroll}
      >
        <Transactions
          className={styles.transactions}
          transactions={transactions}
        />
      </Panel>
    )
  }

  handleScroll = (e: SyntheticInputEvent<EventTarget>) => {
    const { handleFetchAddtionalTxData } = this.props
    const bottom =
      e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight
    if (bottom) {
      handleFetchAddtionalTxData()
    }
  }
}
