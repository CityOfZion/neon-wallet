// @flow
import React, { Component } from 'react'

import Button from '../../components/Button'
import Tooltip from '../../components/Tooltip'
import { formatGAS } from '../../core/formatters'
import { toBigNumber } from '../../core/math'
import ClaimIcon from '../../assets/icons/claim.svg'

type Props = {
  className: ?string,
  doGasClaim: Function,
  disableClaimButton: boolean,
  claimAmount: string
}

export default class Claim extends Component<Props> {
  intervalId: ?number

  render() {
    const { className, claimAmount } = this.props
    const disabled = this.isDisabled()

    return (
      <div>
        <Tooltip
          title={
            toBigNumber(claimAmount).eq(0)
              ? 'Address must hold NEO in order to claim GAS'
              : 'You can claim GAS once every 5 minutes'
          }
          disabled={!disabled}
        >
          <Button
            id="claim"
            className={className}
            disabled={disabled}
            primary
            renderIcon={ClaimIcon}
            onClick={this.handleClaim}
          >
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

  getFormattedAmount = () => formatGAS(this.props.claimAmount)
}
