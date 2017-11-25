// @flow
import React, { Component } from 'react'
import Tooltip from '../../components/Tooltip'

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
    if (claimRequest && claimWasUpdated) {
      setClaimRequest(false)
      doClaimNotify()
    }
  }

  render () {
    const { claimAmount, disableClaimButton, doGasClaim } = this.props
    const buttonText = `Claim ${claimAmount} GAS`

    return (
      <div id='claim'>
        {disableClaimButton
          ? <Tooltip title='You can claim GAS once every 5 minutes'>
            <button className='disabled' disabled>{buttonText}</button>
          </Tooltip>
          : <button onClick={() => doGasClaim()}>{buttonText}</button>
        }
      </div>
    )
  }
}
