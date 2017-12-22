// @flow
import React, { Component } from 'react'
import SplitPane from 'react-split-pane'
import ReactTooltip from 'react-tooltip'
import { validateTransactionBeforeSending } from '../../core/wallet'

type Props = {
  togglePane: Function,
  showErrorNotification: Function,
  sendTransaction: Function,
  toggleAsset: Function,
  neo: number,
  gas: number,
  confirmPane: boolean,
  selectedAsset: string,
}

type State = {
  sendAmount: string,
  sendAddress: string,
}

export default class Send extends Component<Props, State> {
  state = {
    sendAmount: '',
    sendAddress: ''
  }

  confirmButton: ?HTMLButtonElement

  // open confirm pane and validate fields
  openAndValidate = () => {
    const { neo, gas, selectedAsset, togglePane, showErrorNotification } = this.props
    const { sendAddress, sendAmount } = this.state
    const { error, valid } = validateTransactionBeforeSending(neo, gas, selectedAsset, sendAddress, sendAmount)
    if (valid) {
      togglePane('confirmPane')
    } else {
      showErrorNotification({ message: error })
    }
  }

  // perform send transaction
  sendTransaction = () => {
    const { sendTransaction, togglePane } = this.props
    const { sendAddress, sendAmount } = this.state
    sendTransaction(sendAddress, sendAmount).then(() => {
      togglePane('confirmPane')
      this.resetForm()
    })
  }

  resetForm () {
    this.setState({
      sendAddress: '',
      sendAmount: ''
    })
    if (this.confirmButton) {
      this.confirmButton.blur()
    }
  }

  render () {
    const { confirmPane, selectedAsset, toggleAsset } = this.props
    const { sendAddress, sendAmount } = this.state
    const confirmPaneClosed = confirmPane ? '100%' : '69%'

    return (
      <SplitPane className='confirmSplit' split='horizontal' size={confirmPaneClosed} allowResize={false}>
        <div id='sendPane'>
          <div id='sendAddress'>
            <input
              autoFocus
              type='text'
              placeholder='Where to send the asset (address)'
              value={sendAddress}
              onChange={(e) => this.setState({ sendAddress: e.target.value })}
            />
          </div>
          <div id='sendAmount'>
            <input
              type='text'
              value={sendAmount}
              placeholder='Amount'
              onChange={(e) => this.setState({ sendAmount: e.target.value })}
            />
          </div>
          <button id='sendAsset' data-tip data-for='assetTip' onClick={() => toggleAsset()}>{selectedAsset}</button>
          <ReactTooltip class='solidTip' id='assetTip' place='bottom' type='dark' effect='solid'>
            <span>Toggle NEO / GAS</span>
          </ReactTooltip>
          <button id='doSend' onClick={this.openAndValidate}>Send Asset</button>
        </div>
        <div id='confirmPane' onClick={this.sendTransaction}>
          <button ref={node => { this.confirmButton = node }}>Confirm Transaction</button>
        </div>
      </SplitPane>
    )
  }
}
