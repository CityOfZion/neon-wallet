// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { doSendAsset, verifyAddress } from 'neon-js'
import { togglePane } from '../modules/dashboard'
import { sendEvent, clearTransactionEvent, toggleAsset } from '../modules/transactions'
import SplitPane from 'react-split-pane'
import ReactTooltip from 'react-tooltip'
import { log } from '../util/Logs'
import { ASSETS } from '../core/constants'

type Props = {
  dispatch: DispatchType,
  address: string,
  wif: string,
  neo: number,
  net: NetworkType,
  gas: number,
  confirmPane: boolean,
  selectedAsset: string,
}

let Send = class Send extends Component<Props> {
  sendAddressInput: ?HTMLInputElement
  sendAmountInput: ?HTMLInputElement
  confirmButton: ?HTMLButtonElement

  validateForm () {
    const { dispatch, neo, gas, selectedAsset } = this.props
    const sendAddress = this.sendAddressInput && this.sendAddressInput.value
    const sendAmount = this.sendAmountInput && this.sendAmountInput.value
    const neoBalance = neo
    const gasBalance = gas

    if (!sendAddress || !sendAmount) { return false }

    try {
      if (verifyAddress(sendAddress) !== true || sendAddress.charAt(0) !== 'A') {
        dispatch(sendEvent(false, 'The address you entered was not valid.'))
        setTimeout(() => dispatch(clearTransactionEvent()), 5000)
        return false
      }
    } catch (e) {
      dispatch(sendEvent(false, 'The address you entered was not valid.'))
      setTimeout(() => dispatch(clearTransactionEvent()), 5000)
      return false
    }
    if (selectedAsset === 'Neo' && parseFloat(sendAmount) !== parseInt(sendAmount)) { // check for fractional neo
      dispatch(sendEvent(false, 'You cannot send fractional amounts of Neo.'))
      setTimeout(() => dispatch(clearTransactionEvent()), 5000)
      return false
    } else if (selectedAsset === 'Neo' && parseInt(sendAmount) > neoBalance) { // check for value greater than account balance
      dispatch(sendEvent(false, 'You do not have enough NEO to send.'))
      setTimeout(() => dispatch(clearTransactionEvent()), 5000)
      return false
    } else if (selectedAsset === 'Gas' && parseFloat(sendAmount) > gasBalance) {
      dispatch(sendEvent(false, 'You do not have enough GAS to send.'))
      setTimeout(() => dispatch(clearTransactionEvent()), 5000)
      return false
    } else if (parseFloat(sendAmount) < 0) { // check for negative asset
      dispatch(sendEvent(false, 'You cannot send negative amounts of an asset.'))
      setTimeout(() => dispatch(clearTransactionEvent()), 5000)
      return false
    }
    return true
  }

  // open confirm pane and validate fields
  openAndValidate = () => {
    const { dispatch } = this.props
    if (this.validateForm()) {
      dispatch(togglePane('confirmPane'))
    }
  }

  // perform send transaction
  sendTransaction = () => {
    const { dispatch, net, address, wif, selectedAsset } = this.props

    let assetName
    if (selectedAsset === 'Neo') {
      assetName = ASSETS.NEO
    } else if (selectedAsset === 'Gas') {
      assetName = ASSETS.GAS
    } else {
      dispatch(sendEvent(false, 'That asset is not Neo or Gas'))
      setTimeout(() => dispatch(clearTransactionEvent()), 5000)
      return false
    }
    // validate fields again for good measure (might have changed?)
    if (this.validateForm()) {
      const selfAddress = address
      const sendAddress = this.sendAddressInput && this.sendAddressInput.value
      const sendAmount = this.sendAmountInput && this.sendAmountInput.value
      let sendAsset = {}
      sendAsset[assetName] = sendAmount
      dispatch(sendEvent(true, 'Processing...'))
      log(net, 'SEND', selfAddress, { to: sendAddress, asset: selectedAsset, amount: sendAmount })
      doSendAsset(net, sendAddress, wif, sendAsset).then((response) => {
        if (response.result === undefined || response.result === false) {
          dispatch(sendEvent(false, 'Transaction failed!'))
        } else {
          console.log(response.result)
          dispatch(sendEvent(true, 'Transaction complete! Your balance will automatically update when the blockchain has processed it.'))
        }
        setTimeout(() => dispatch(clearTransactionEvent()), 5000)
      }).catch((e) => {
        dispatch(sendEvent(false, 'Transaction failed!'))
        setTimeout(() => dispatch(clearTransactionEvent()), 5000)
      })
    }
    // close confirm pane and clear fields
    dispatch(togglePane('confirmPane'))
    this.resetForm()
  }

  resetForm () {
    if (this.sendAddressInput) {
      this.sendAddressInput.value = ''
    }
    if (this.sendAmountInput) {
      this.sendAmountInput.value = ''
    }
    if (this.confirmButton) {
      this.confirmButton.blur()
    }
  }

  render () {
    const { dispatch, confirmPane, selectedAsset } = this.props
    const confirmPaneClosed = confirmPane ? '100%' : '69%'

    return (
      <SplitPane className='confirmSplit' split='horizontal' size={confirmPaneClosed} allowResize={false}>
        <div id='sendPane'>
          <div id='sendAddress'>
            <input placeholder='Where to send the asset (address)' ref={node => { this.sendAddressInput = node }} />
          </div>
          <div id='sendAmount'>
            <input placeholder='Amount' ref={node => { this.sendAmountInput = node }} />
          </div>
          <button id='sendAsset' data-tip data-for='assetTip' onClick={() => dispatch(toggleAsset())}>{selectedAsset}</button>
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

const mapStateToProps = (state) => ({
  wif: state.account.wif,
  address: state.account.address,
  net: state.metadata.network,
  neo: state.wallet.Neo,
  gas: state.wallet.Gas,
  selectedAsset: state.transactions.selectedAsset,
  confirmPane: state.dashboard.confirmPane
})

Send = connect(mapStateToProps)(Send)

export default Send
