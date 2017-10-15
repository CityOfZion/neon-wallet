// @flow
import React, { Component } from 'react'
import ReactTooltip from 'react-tooltip'
import { connect } from 'react-redux'
import { setClaimRequest, disableClaim } from '../modules/claim'
import { sendEvent, clearTransactionEvent } from '../modules/transactions'
import { ledgerNanoSGetdoClaimAllGas, ledgerNanoSGetdoSendAsset } from '../modules/ledgerNanoS'
import { log } from '../util/Logs'
import { ASSETS } from '../core/constants'

type Props = {
  dispatch: DispatchType,
  address: string,
  wif: string,
  neo: number,
  net: NetworkType,
  claimRequest: boolean,
  disableClaimButton: boolean,
  claimWasUpdated: boolean,
  claimAmount: number,
}

class Claim extends Component<Props> {
  componentDidUpdate () {
    const { claimRequest, claimWasUpdated, dispatch } = this.props
    // if we requested a claim and new claims are available, do claim
    if (claimRequest && claimWasUpdated) {
      dispatch(setClaimRequest(false))
      this.doClaimNotify()
    }
  }

  doClaimNotify () {
    const { dispatch, net, address, wif } = this.props
    log(net, 'CLAIM', address, { info: 'claim all gas' })
    ledgerNanoSGetdoClaimAllGas(net, wif).then((response) => {
      if (response.result) {
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
  doGasClaim = () => {
    const { dispatch, net, wif, address, neo } = this.props

    // if no neo in account, no need to send to self first
    if (neo === 0) {
      this.doClaimNotify()
    } else {
      dispatch(sendEvent(true, 'Sending Neo to Yourself...'))
      log(net, 'SEND', address, { to: address, amount: neo, asset: 'NEO' })
      ledgerNanoSGetdoSendAsset(net, address, wif, { [ASSETS.NEO]: neo }).then((response) => {
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

  render () {
    const { claimAmount, disableClaimButton } = this.props
    let renderButton
    if (!disableClaimButton) {
      renderButton = <button onClick={this.doGasClaim}>Claim {claimAmount} GAS</button>
    } else {
      renderButton = (
        <div>
          <button data-tip data-for='claimTip' className='disabled'>Claim {claimAmount} GAS</button>
          <ReactTooltip class='solidTip' id='claimTip' place='bottom' type='dark' effect='solid'>
            <span>You can claim Gas once every 5 minutes</span>
          </ReactTooltip>
        </div>
      )
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

export default connect(mapStateToProps)(Claim)
