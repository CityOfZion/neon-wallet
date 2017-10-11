// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { doSendAsset, verifyAddress } from 'neon-js'
import { togglePane } from '../modules/dashboard'
import { sendEvent, clearTransactionEvent, toggleAsset } from '../modules/transactions'
import SplitPane from 'react-split-pane'
import ReactTooltip from 'react-tooltip'
import { log } from '../util/Logs'
import { NEO_ASSET } from '../core/constants'

// form validators for input fields
const validateForm = (dispatch: DispatchType, neoBalance: number, gasBalance: number, asset: string, sendAddress: ?WalletAddressType, sendAmount: ?string) => {
  // check for valid address
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
  if (asset === NEO_ASSET.NEO.NAME && parseFloat(sendAmount) !== parseInt(sendAmount)) { // check for fractional neo
    dispatch(sendEvent(false, 'You cannot send fractional amounts of Neo.'))
    setTimeout(() => dispatch(clearTransactionEvent()), 5000)
    return false
  } else if (asset === NEO_ASSET.NEO.NAME && parseInt(sendAmount) > neoBalance) { // check for value greater than account balance
    dispatch(sendEvent(false, 'You do not have enough NEO to send.'))
    setTimeout(() => dispatch(clearTransactionEvent()), 5000)
    return false
  } else if (asset === NEO_ASSET.GAS.NAME && parseFloat(sendAmount) > gasBalance) {
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
const openAndValidate = (dispatch: DispatchType, neoBalance: number, gasBalance: number, asset: string, sendAddressInput: ?HTMLInputElement, sendAmountInput: ?HTMLInputElement) => {
  const sendAddressValue = sendAddressInput && sendAddressInput.value
  const sendAmountValue = sendAmountInput && sendAmountInput.value
  if (validateForm(dispatch, neoBalance, gasBalance, asset, sendAddressValue, sendAmountValue)) {
    dispatch(togglePane('confirmPane'))
  }
}

type TransactionType = {
  dispatch: DispatchType,
  net: NeoNetworkType,
  selfAddress: WalletAddressType,
  wif: WIFType,
  asset: string,
  neoBalance: NeoAssetType,
  gasBalance: GasAssetType,
  sendAddressInput: ?HTMLInputElement,
  sendAmountInput: ?HTMLInputElement,
  confirmButton: ?HTMLButtonElement
}

// perform send transaction
const sendTransaction = ({ dispatch, net, selfAddress, wif, asset, neoBalance, gasBalance, sendAddressInput, sendAmountInput, confirmButton }: TransactionType) => {
  let assetName
  if (asset === NEO_ASSET.NEO.NAME) {
    assetName = NEO_ASSET.NEO.TYPE
  } else if (asset === NEO_ASSET.GAS.NAME) {
    assetName = NEO_ASSET.GAS.TYPE
  } else {
    dispatch(sendEvent(false, 'That asset is not Neo or Gas'))
    setTimeout(() => dispatch(clearTransactionEvent()), 5000)
    return false
  }
  const sendAddressValue = sendAddressInput && sendAddressInput.value
  const sendAmountValue = sendAmountInput && sendAmountInput.value
  // validate fields again for good measure (might have changed?)
  if (validateForm(dispatch, neoBalance, gasBalance, asset, sendAddressValue, sendAmountValue) === true) {
    let sendAsset = {}
    sendAsset[assetName] = sendAmountValue
    dispatch(sendEvent(true, 'Processing...'))
    log(net, 'SEND', selfAddress, {to: sendAddressValue, asset: asset, amount: sendAmountValue})
    doSendAsset(net, sendAddressValue, wif, sendAsset).then((response) => {
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
  if (sendAddressInput) {
    sendAddressInput.value = ''
  }
  if (sendAmountInput) {
    sendAmountInput.value = ''
  }
  if (confirmButton) {
    confirmButton.blur()
  }
}

type Props = {
  dispatch: DispatchType,
  address: WalletAddressType,
  wif: WIFType,
  neo: NeoAssetType,
  net: NeoNetworkType,
  gas: GasAssetType,
  confirmPane: boolean,
  selectedAsset: string,
}

let Send = class Send extends Component<Props> {
  sendAddressInput: ?HTMLInputElement
  sendAmountInput: ?HTMLInputElement
  confirmButton: ?HTMLButtonElement

  render () {
    const { dispatch, wif, address, neo, gas, net, confirmPane, selectedAsset } = this.props
    const confirmPaneClosed = confirmPane ? '100%' : '69%'

    const sendAddressInput = this.sendAddressInput
    const sendAmountInput = this.sendAmountInput
    const confirmButton = this.confirmButton

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
          <button id='doSend' onClick={() => openAndValidate(dispatch, neo, gas, selectedAsset, sendAddressInput, sendAmountInput)}>Send Asset</button>
        </div>
        <div id='confirmPane' onClick={() => sendTransaction({ dispatch, net, selfAddress: address, wif, selectedAsset, neoBalance: neo, gasBalance: gas, sendAddressInput, sendAmountInput, confirmButton })}>
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
