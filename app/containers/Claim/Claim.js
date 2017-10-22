// @flow
import React, { Component } from 'react'
import ReactTooltip from 'react-tooltip'

type Props = {
  doClaimNotify: Function,
  setClaimRequest: Function,
  doGasClaim: Function,
  address: string,
  wif: string,
  neo: number,
  net: NetworkType,
  claimRequest: boolean,
  disableClaimButton: boolean,
  claimWasUpdated: boolean,
  claimAmount: number,
}

export default class Claim extends Component<Props> {
  componentDidUpdate () {
    const { claimRequest, claimWasUpdated, doClaimNotify, net, wif, address, setClaimRequest } = this.props
    // if we requested a claim and new claims are available, do claim
    if (claimRequest && claimWasUpdated) {
      setClaimRequest(false)
      doClaimNotify(net, wif, address)
    }
  }

  render () {
    const { claimAmount, disableClaimButton, doGasClaim, net, wif, address, neo } = this.props
    let renderButton
    if (!disableClaimButton) {
      renderButton = <button onClick={() => doGasClaim(net, wif, address, neo)}>Claim {claimAmount} GAS</button>
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
