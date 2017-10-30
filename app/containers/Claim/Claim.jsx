// @flow
import React, { Component } from 'react'
import ReactTooltip from 'react-tooltip'

type Props = {
  doClaimNotify: Function,
  setClaimRequest: Function,
  doGasClaim: Function,
  claimRequest: boolean,
  disableClaimButton: boolean,
  claimWasUpdated: boolean,
  claimAmount: number,
}

export default class Claim extends Component<Props> {
  componentDidUpdate () {
    const { claimRequest, claimWasUpdated, doClaimNotify, setClaimRequest } = this.props
    // if we requested a claim and new claims are available, do claim
    if (claimRequest && claimWasUpdated) {
      setClaimRequest(false)
      doClaimNotify()
    }
  }

  render () {
    const { claimAmount, disableClaimButton, doGasClaim } = this.props
    let renderButton
    if (!disableClaimButton) {
      renderButton = <button onClick={() => doGasClaim()}>Claim {claimAmount} GAS</button>
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
