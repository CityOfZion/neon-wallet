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
  GAS: number,
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
    const { className, claimAmount, isWatchOnly, chain } = this.props
    const disabled = this.isDisabled()

    return (
      <div>
        <Tooltip
          title={this.tooltipText(isWatchOnly, claimAmount, chain)}
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
    const {
      claimAmount,
      disableClaimButton,
      isWatchOnly,
      chain,
      GAS,
    } = this.props
    if (chain === 'neo3') {
      return (
        disableClaimButton || toBigNumber(GAS).lt(0.01120527) || isWatchOnly
      )
    }
    return disableClaimButton || toBigNumber(claimAmount).eq(0) || isWatchOnly
  }

  getFormattedAmount = () => formatGAS(this.props.claimAmount)

  tooltipText = (
    isWatchOnly?: boolean,
    claimAmount: string,
    chain: string,
  ): string => {
    const { intl } = this.props
    if (isWatchOnly)
      return intl.formatMessage({ id: 'claimUnavailableInWatch' })
    if (chain === 'neo3') {
      if (toBigNumber(claimAmount).eq(0)) {
        return intl.formatMessage({ id: 'noClaimableGas' })
      }
      if (toBigNumber(claimAmount).lte(0.01120527)) {
        return intl.formatMessage({ id: 'claimFeeGreater' })
      }
      return intl.formatMessage({ id: 'claimFeeDisclaimerN3' })
    }
    return toBigNumber(claimAmount).eq(0)
      ? intl.formatMessage({ id: 'noClaimableGas' })
      : intl.formatMessage({ id: 'claimTimeDisclaimer' })
  }
}
