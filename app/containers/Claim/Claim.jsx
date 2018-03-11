// @flow
import React, { Component } from 'react'

import Button from '../../components/Button'
import Tooltip from '../../components/Tooltip'
import { formatGAS } from '../../core/formatters'
import { toBigNumber } from '../../core/math'

type Props = {
  doGasClaim: Function,
  disableClaimButton: boolean,
  claimAmount: string
}

export default class Claim extends Component<Props> {
  intervalId: ?number

  render () {
    const disabled = this.isDisabled()

    return (
      <div>
        <Tooltip title='You can claim GAS once every 5 minutes' disabled={!disabled}>
          <Button id='claim' disabled={disabled} onClick={this.handleClaim}>
            Claim {this.getFormattedAmount()} GAS
          </Button>
        </Tooltip>
      </div>
    )
  }

  handleClaim = () => {
    this.props.doGasClaim()
  }

  isDisabled = () => {
    const { claimAmount, disableClaimButton } = this.props
    return disableClaimButton || toBigNumber(claimAmount).eq(0)
  }

  getFormattedAmount = () => {
    return formatGAS(this.props.claimAmount)
  }
}
