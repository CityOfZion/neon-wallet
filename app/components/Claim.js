// @flow

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { doClaimAllGas, doSendAsset } from 'neon-js'
import ReactTooltip from 'react-tooltip'
import { setClaimRequest, disableClaim } from '../modules/claim'
import { sendEvent, clearTransactionEvent } from '../modules/transactions'
import { log } from '../util/Logs'

// wrap claiming with notifications

const doClaimNotify = (dispatch: DispatchType, net: NeoNetworkType, selfAddress: WalletAddressType, wif: WIFType) => {
  log(net, 'CLAIM', selfAddress, {info: 'claim all gas'})
  doClaimAllGas(net, wif).then((response) => {
    if (response.result === true) {
      dispatch(sendEvent(true, 'Claim was successful! Your balance will update once the blockchain has processed it.'))
      setTimeout(() => dispatch(disableClaim(false)), 300000)
    } else {
      dispatch(sendEvent(false, 'Claim failed'))
    }
    setTimeout(() => dispatch(clearTransactionEvent()), 5000)
  })
}

// To initiate claim, first send all Neo to own address, the set claimRequest state
// When new claims are available, this will trigger the claim
const doGasClaim = (dispatch: DispatchType, net: NeoNetworkType, wif: WIFType, selfAddress: WalletAddressType, ans: number) => {
  // if no neo in account, no need to send to self first
  if (ans === 0) {
    doClaimNotify(dispatch, net, selfAddress, wif)
  } else {
    dispatch(sendEvent(true, 'Sending Neo to Yourself...'))
    log(net, 'SEND', selfAddress, {to: selfAddress, amount: ans, asset: 'NEO'})
    doSendAsset(net, selfAddress, wif, {'NEO': ans}).then((response) => {
      if (response.result === undefined || response.result === false) {
        dispatch(sendEvent(false, 'Transaction failed!'))
      } else {
        dispatch(sendEvent(true, 'Waiting for transaction to clear...'))
        dispatch(setClaimRequest(true))
        dispatch(disableClaim(true))
      }
    })
  }
}

type Props ={
  dispatch: DispatchType,
  address: WalletAddressType,
  wif: WIFType,
  neo: NeoAssetType,
  net: NeoNetworkType,
  claimRequest: boolean,
  disableClaimButton: boolean,
  claimWasUpdated: boolean,
  claimAmount: number,
}

let Claim = class Claim extends Component<Props> {
  componentDidUpdate () {
    const { claimRequest, claimWasUpdated, dispatch, net, address, wif } = this.props
    // if we requested a claim and new claims are available, do claim
    if (claimRequest === true && claimWasUpdated === true) {
      dispatch(setClaimRequest(false))
      doClaimNotify(dispatch, net, address, wif)
    }
  }

  doClaim = () => {
    const { dispatch, net, wif, address, neo } = this.props
    doGasClaim(dispatch, net, wif, address, neo)
  }

  render () {
    const { claimAmount, disableClaimButton } = this.props
    let renderButton
    if (disableClaimButton === false) {
      renderButton = <button onClick={this.doClaim}>Claim {claimAmount} GAS</button>
    } else {
      renderButton = (<div>
        <button data-tip data-for='claimTip' className='disabled'>Claim {claimAmount} GAS</button>
        <ReactTooltip class='solidTip' id='claimTip' place='bottom' type='dark' effect='solid'>
          <span>You can claim Gas once every 5 minutes</span>
        </ReactTooltip>
      </div>)
    }
    return <div id='claim'>{renderButton}</div>
  }
}

const mapStateToProps = (state) => ({
  claimAmount: state.claim.claimAmount,
  claimRequest: state.claim.claimRequest,
  claimWasUpdated: state.claim.claimWasUpdated,
  disableClaimButton: state.claim.disableClaimButton,
  wif: state.account.wif,
  address: state.account.address,
  net: state.metadata.network,
  neo: state.wallet.Neo
})

Claim = connect(mapStateToProps)(Claim)

export default Claim
