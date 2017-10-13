import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { shell } from 'electron'
import { syncTransactionHistory } from '../components/NetworkSwitch'

// TODO: make this a user setting
const getExplorerLink = (net, explorer, txid) => {
  let base
  if (explorer === 'Neotracker') {
    if (net === 'MainNet') {
      base = 'https://neotracker.io/tx/'
    } else {
      base = 'https://testnet.neotracker.io/tx/'
    }
  } else {
    if (net === 'MainNet') {
      base = 'http://antcha.in/tx/hash/'
    } else {
      base = 'http://testnet.antcha.in/tx/hash/'
    }
  }
  return base + txid
}

// helper to open an external web link
const openExplorer = (srcLink) => {
  shell.openExternal(srcLink)
}

let TransactionHistory = class TransactionHistory extends Component {
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
            var formatAmount
            if (t.type === 'NEO') {
              formatAmount = parseInt(t.amount)
            } else {
              formatAmount = parseFloat(t.amount).toFixed(7)
            }
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

TransactionHistory.propTypes = {
  dispatch: PropTypes.func.isRequired,
  address: PropTypes.string,
  net: PropTypes.string,
  transactions: PropTypes.any, // TODO: Use correct shape
  explorer: PropTypes.string

}

TransactionHistory = connect(mapStateToProps)(TransactionHistory)

export default TransactionHistory
