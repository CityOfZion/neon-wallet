// @flow
import React, { Component } from 'react'
import { FormattedMessage, IntlShape } from 'react-intl'

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
  isWatchOnly?: boolean,
  intl: IntlShape,
  chain: string,
}

export default class Claim extends Component<Props> {
  intervalId: ?number

  render() {
    const { className, claimAmount, isWatchOnly } = this.props
    const disabled = this.isDisabled()

    return (
      <div>
        <Tooltip
          title={this.tooltipText(isWatchOnly, claimAmount)}
          disabled={!disabled}
        >
          <Button
            id="claim"
            className={className}
            disabled={disabled}
            primary
            renderIcon={ClaimIcon}
            onClick={isWatchOnly ? () => {} : this.handleClaim}
          >
            <FormattedMessage
              id="dashboardGasClaimButton"
              values={{ amount: this.getFormattedAmount() }}
            />
          </Button>
        </Tooltip>
      </div>
    )
  }

  handleClaim = () => {
    const { chain } = this.props
    this.props.doGasClaim(chain)
  }

  isDisabled = () => {
    const { claimAmount, disableClaimButton, isWatchOnly } = this.props
    return disableClaimButton || toBigNumber(claimAmount).eq(0) || isWatchOnly
  }

  getFormattedAmount = () => formatGAS(this.props.claimAmount)

  tooltipText = (isWatchOnly?: boolean, claimAmount: string): string => {
    const { intl } = this.props
    if (isWatchOnly)
      return intl.formatMessage({ id: 'claimUnavailableInWatch' })

    return toBigNumber(claimAmount).eq(0)
      ? intl.formatMessage({ id: 'noClaimableGas' })
      : intl.formatMessage({ id: 'claimTimeDisclaimer' })
  }
}
