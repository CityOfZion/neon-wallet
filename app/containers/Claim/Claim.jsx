// @flow
import React, { Component } from 'react'

import Button from '../../components/Button'
import Tooltip from '../../components/Tooltip'
import { formatGAS } from '../../core/formatters'
import { toBigNumber } from '../../core/math'

type Props = {
  doClaimNotify: Function,
  setClaimRequest: Function,
  doGasClaim: Function,
  claimRequest: boolean,
  disableClaimButton: boolean,
  claimAmount: string,
}

export default class Claim extends Component<Props> {
  componentDidUpdate (prevProps: Props) {
    const { claimRequest, doClaimNotify, setClaimRequest } = this.props
    if (claimRequest && !prevProps.claimRequest) {
      setClaimRequest(false)
      doClaimNotify()
    }
  }

  render () {
    const { claimAmount, disableClaimButton, doGasClaim } = this.props
    const shouldDisableButton = disableClaimButton || toBigNumber(claimAmount).eq(0)
    const formattedAmount = formatGAS(claimAmount)
    return (
      <div>
        <Tooltip
          title='You can claim GAS once every 5 minutes'
          disabled={!disableClaimButton}
        >
          <Button id='claim' disabled={shouldDisableButton} onClick={doGasClaim}>
            Claim {formattedAmount} GAS
          </Button>
        </Tooltip>
      </div>
    )
  }
}
