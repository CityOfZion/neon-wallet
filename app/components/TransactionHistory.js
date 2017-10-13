// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { syncTransactionHistory } from '../components/NetworkSwitch'
import { ASSETS } from '../core/constants'
import { openExplorer } from '../core/explorer'
import { formatGAS, formatNEO } from '../core/formatters'

type Props = {
  dispatch: DispatchType,
  address: string,
  net: NetworkType,
  transactions: Object,
  explorer: ExplorerType
}

class TransactionHistory extends Component<Props> {
  componentDidMount () {
    const { dispatch, net, address } = this.props
    syncTransactionHistory(dispatch, net, address)
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

const mapStateToProps = (state) => ({
  address: state.account.address,
  net: state.metadata.network,
  transactions: state.wallet.transactions,
  explorer: state.metadata.blockExplorer
})

export default connect(mapStateToProps)(TransactionHistory)
