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
  claimAmount: string,
  isWatchOnly: boolean,
}

export default class Claim extends Component<Props> {
  intervalId: ?number

  render() {
    const { className } = this.props
    const disabled = this.isDisabled()

    return (
      <div>
        <Tooltip title={this.getTooltip()} disabled={!disabled}>
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
    const { claimAmount, disableClaimButton, isWatchOnly } = this.props
    return disableClaimButton || toBigNumber(claimAmount).eq(0) || isWatchOnly
  }

  getFormattedAmount = () => formatGAS(this.props.claimAmount)

  getTooltip = () => {
    const { claimAmount, isWatchOnly } = this.props
    if (isWatchOnly) return 'You cannot claim GAS in watch mode.'
    return toBigNumber(claimAmount).eq(0)
      ? 'Address must hold NEO in order to claim GAS'
      : 'You can claim GAS once every 5 minutes'
  }
}
