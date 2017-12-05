// @flow
import React from 'react'
import { api } from 'neon-js'
import Button from '../../Button'

import Loader from '../../Loader'
import { formatBalance } from '../../../core/formatters'
import { openExplorerAddress } from '../../../core/explorer'

import styles from './SendModal.scss'

type Props = {
  sendAddress: string,
  sendAmount: string,
  symbol: SymbolType,
  confirmTransaction: Function,
  cancelTransaction: Function,
  explorer: ExplorerType,
  net: NetworkType,
}

type State = {
  addressChecked: boolean,
  addressCheckedMessage: string
}

class ConfirmDisplay extends React.Component<Props> {
  state = {
    addressChecked: false,
    addressCheckedMessage: ''
  }

  checkTransactionHistory = (net, address) => {
    api.neonDB.getTransactionHistory(net, address).then((transactions) => {
      this.setState({ addressChecked: true })

      if (!transactions || !transactions.length) {
        this.setState({
          addressCheckedMessage: 'Warning: recipient address has no activity in its transaction history. Please be sure the address is correct before sending.'
        })
      }
    }).catch((e) => {
      this.setState({
        addressChecked: true,
        addressCheckedMessage: 'Warning: there was an error verifying the recipient address has activity in its transaction history.'
      })
    })
  }

  componentDidMount () {
    const { sendAddress, net } = this.props
    this.checkTransactionHistory(net, sendAddress)
  }

  render () {
    const { sendAddress, sendAmount, symbol, confirmTransaction, cancelTransaction, explorer, net } = this.props
    const { addressChecked, addressCheckedMessage } = this.state

    if (!addressChecked) {
      return (<Loader />)
    } else {
      return (
        <div>
          <p>Please confirm the following transaction:</p>
          <p>You are sending <strong>{formatBalance(symbol, sendAmount)} {symbol}</strong> to:</p>
          <div className={styles.externalLink} onClick={() => openExplorerAddress(net, explorer, sendAddress)}>{sendAddress}</div>
          <div>
            <Button onClick={confirmTransaction}>Confirm</Button>
            <Button cancel onClick={cancelTransaction}>Cancel</Button>
          </div>
          { addressCheckedMessage && <div className={styles.addressWarning}>{addressCheckedMessage}</div> }
        </div>
      )
    }
  }
}

export default ConfirmDisplay
