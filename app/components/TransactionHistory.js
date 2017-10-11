// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { shell } from 'electron'
import { syncTransactionHistory } from '../components/NetworkSwitch'
import { NEO_NETWORK, NEO_EXPLORER } from '../core/constants'

// TODO: make this a user setting
const getExplorerLink = (net: NeoNetworkType, explorer: NeoExplorerType, txid: NeoTXId) => {
  let base
  if (explorer === NEO_EXPLORER.NEO_TRACKER) {
    if (net === NEO_NETWORK.MAIN) {
      base = 'https://neotracker.io/tx/'
    } else {
      base = 'https://testnet.neotracker.io/tx/'
    }
  } else {
    if (net === NEO_NETWORK.MAIN) {
      base = 'http://antcha.in/tx/hash/'
    } else {
      base = 'http://testnet.antcha.in/tx/hash/'
    }
  }
  return `${base}${txid}`
}

// helper to open an external web link
const openExplorer = (srcLink) => {
  shell.openExternal(srcLink)
}

type Props = {
  dispatch: DispatchType,
  address: WalletAddressType,
  net: NeoNetworkType,
  transactions: Object,
  explorer: NeoExplorerType
}

let TransactionHistory = class TransactionHistory extends Component<Props> {
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
            const formatGas = (gas) => Math.floor(parseFloat(gas) * 10000) / 10000
            let formatAmount = t.type === 'NEO' ? parseInt(t.amount) : formatGas(t.amount)
            return (
              <li key={t.txid}>
                <div
                  className='txid'
                  onClick={() => openExplorer(getExplorerLink(net, explorer, t.txid))}>
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

TransactionHistory = connect(mapStateToProps)(TransactionHistory)

export default TransactionHistory
