// @flow
import React, { Component } from 'react'
import { ASSETS } from '../../core/constants'
import { openExplorer } from '../../core/explorer'
import { formatGAS, formatNEO } from '../../core/formatters'

type Props = {
  address: string,
  net: NetworkType,
  transactions: Object,
  explorer: ExplorerType,
  syncTransactionHistory: Function
}

export default class TransactionHistory extends Component<Props> {
  componentDidMount () {
    const { net, address, syncTransactionHistory } = this.props
    syncTransactionHistory(net, address)
  }

  render () {
    const { transactions, net, explorer } = this.props
    return (
      <div id='transactionInfo'>
        <div className='columnHeader'>Transaction History</div>
        <div className='headerSpacer' />
        <ul id='transactionList'>
          {transactions.map((t) => {
            let formatAmount = t.type === ASSETS.NEO ? formatNEO(t.amount) : formatGAS(t.amount)
            return (
              <li key={t.txid}>
                <div
                  className='txid'
                  onClick={() => openExplorer(net, explorer, t.txid)}>
                  {t.txid.substring(0, 32)}
                </div>
                <div className='amount'>{formatAmount} {t.type}</div>
              </li>)
          })}
        </ul>
      </div>
    )
  }
}
