// @flow
import React, { Component } from 'react'
import { isNil } from 'lodash'

import Button from '../../components/Button'
import Tooltip from '../../components/Tooltip'
import { formatGAS } from '../../core/formatters'
import { toBigNumber } from '../../core/math'

type Props = {
  doGasClaim: Function,
  disableClaimButton: boolean,
  claimAmount: ?string
}

export default class Claim extends Component<Props> {
  intervalId: ?number

  render () {
    const { claimAmount } = this.props
    const disabled = this.isDisabled()

    const validClaimAmount = !isNil(claimAmount)

    return (
      <div>
        <Tooltip
          title={
            validClaimAmount
              ? 'You can claim GAS once every 5 minutes'
              : 'There are problems with the network right now. GAS Claiming has been disabled until these issues have been resolved.'
          }
          disabled={!disabled}
        >
          <Button id='claim' disabled={disabled} onClick={this.handleClaim}>
            {validClaimAmount
              ? `Claim ${this.getFormattedAmount()} GAS`
              : 'GAS Claim unavailable'}
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
    return disableClaimButton || !claimAmount || toBigNumber(claimAmount).eq(0)
  }

  getFormattedAmount = () => {
    const { claimAmount } = this.props
    return formatGAS(claimAmount || '0')
  }
}
