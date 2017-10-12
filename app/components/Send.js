import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { doSendAsset, verifyAddress } from 'neon-js'
import { togglePane } from '../modules/dashboard'
import { sendEvent, clearTransactionEvent, toggleAsset } from '../modules/transactions'
import SplitPane from 'react-split-pane'
import ReactTooltip from 'react-tooltip'
import { log } from '../util/Logs'
import { ledgerNanoS_CreateSignature,ledgerNanoS_doSendAsset } from '../modules/ledgerNanoS'

let sendAddress, sendAmount, confirmButton

// form validators for input fields
const validateForm = (dispatch, neoBalance, gasBalance, asset) => {
  // check for valid address
  try {
    if (verifyAddress(sendAddress.value) !== true || sendAddress.value.charAt(0) !== 'A') {
      dispatch(sendEvent(false, 'The address you entered was not valid.'))
      setTimeout(() => dispatch(clearTransactionEvent()), 5000)
      return false
    }
  } catch (e) {
    dispatch(sendEvent(false, 'The address you entered was not valid.'))
    setTimeout(() => dispatch(clearTransactionEvent()), 5000)
    return false
  }
  if (asset === 'Neo' && parseFloat(sendAmount.value) !== parseInt(sendAmount.value)) { // check for fractional neo
    dispatch(sendEvent(false, 'You cannot send fractional amounts of Neo.'))
    setTimeout(() => dispatch(clearTransactionEvent()), 5000)
    return false
  } else if (asset === 'Neo' && parseInt(sendAmount.value) > neoBalance) { // check for value greater than account balance
    dispatch(sendEvent(false, 'You do not have enough NEO to send.'))
    setTimeout(() => dispatch(clearTransactionEvent()), 5000)
    return false
  } else if (asset === 'Gas' && parseFloat(sendAmount.value) > gasBalance) {
    dispatch(sendEvent(false, 'You do not have enough GAS to send.'))
    setTimeout(() => dispatch(clearTransactionEvent()), 5000)
    return false
  } else if (parseFloat(sendAmount.value) < 0) { // check for negative asset
    dispatch(sendEvent(false, 'You cannot send negative amounts of an asset.'))
    setTimeout(() => dispatch(clearTransactionEvent()), 5000)
    return false
  }
  return true
}

// open confirm pane and validate fields
const openAndValidate = (dispatch, neoBalance, gasBalance, asset) => {
  if (validateForm(dispatch, neoBalance, gasBalance, asset) === true) {
    dispatch(togglePane('confirmPane'))
  }
}

// perform send transaction
const sendTransaction = (dispatch, net, selfAddress, wif, asset, neoBalance, gasBalance) => {
  let assetName
  if (asset === 'Neo') {
    assetName = 'NEO'
  } else if (asset === 'Gas') {
    assetName = 'GAS'
  } else {
    dispatch(sendEvent(false, 'That asset is not Neo or Gas'))
    setTimeout(() => dispatch(clearTransactionEvent()), 5000)
    return false
  }
  // validate fields again for good measure (might have changed?)
  if (validateForm(dispatch, neoBalance, gasBalance, asset) === true) {
    let sendAsset = {}
    sendAsset[assetName] = sendAmount.value
    dispatch(sendEvent(true, 'Processing...'))
    log(net, 'SEND', selfAddress, {to: sendAddress.value, asset: asset, amount: sendAmount.value})
    ledgerNanoS_doSendAsset(net, sendAddress.value, wif, sendAsset).then((response) => {
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
  sendAddress.value = ''
  sendAmount.value = ''
  confirmButton.blur()
}

let Send = ({ dispatch, wif, address, status, neo, gas, net, confirmPane, selectedAsset }) => {
  let confirmPaneClosed
  if (confirmPane) {
    confirmPaneClosed = '100%'
  } else {
    confirmPaneClosed = '69%'
  }
  return (<SplitPane className='confirmSplit' split='horizontal' size={confirmPaneClosed} allowResize={false}>
    <div id='sendPane'>
      <div id='sendAddress'>
        <input placeholder='Where to send the asset (address)' ref={node => { sendAddress = node }} />
      </div>
      <div id='sendAmount'>
        <input placeholder='Amount' ref={node => { sendAmount = node }} />
      </div>
      <button id='sendAsset' data-tip data-for='assetTip' onClick={() => dispatch(toggleAsset())}>{selectedAsset}</button>
      <ReactTooltip class='solidTip' id='assetTip' place='bottom' type='dark' effect='solid'>
        <span>Toggle NEO / GAS</span>
      </ReactTooltip>
      <button id='doSend' onClick={() => openAndValidate(dispatch, neo, gas, selectedAsset)}>Send Asset</button>
    </div>
    <div id='confirmPane' onClick={() => sendTransaction(dispatch, net, address, wif, selectedAsset, neo, gas)}>
      <button ref={node => { confirmButton = node }}>Confirm Transaction</button>
    </div>
  </SplitPane>)
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

Send.propTypes = {
  dispatch: PropTypes.func.isRequired,
  address: PropTypes.string,
  wif: PropTypes.string,
  neo: PropTypes.number,
  net: PropTypes.string,
  gas: PropTypes.number,
  confirmPane: PropTypes.bool,
  selectedAsset: PropTypes.string,
  status: PropTypes.string
}

Send = connect(mapStateToProps)(Send)

export default Send
