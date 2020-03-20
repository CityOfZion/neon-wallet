// @flow
import React from 'react'
import classNames from 'classnames'
import { FormattedMessage } from 'react-intl'

import LightningIcon from '../../../assets/icons/lightning.svg'
import Button from '../../Button/Button'
import { toFixedDecimals } from '../../../core/formatters'
import styles from './PriorityFee.scss'

type Props = {
  disabled: boolean,
  fees: number,
  availableGas: number,
  handleAddPriorityFee: number => any,
}

const FEE_OPTIONS = [
  {
    fee: 0.001,
    description: 'Fast',
    translationId: 'fast',
    precision: 3,
  },
  {
    fee: 0.05,
    description: 'Faster',
    translationId: 'faster',
    precision: 2,
  },
  {
    fee: 0.1,
    description: 'Fastest',
    translationId: 'fastest',
    precision: 1,
  },
]

export default class PriorityFee extends React.Component<Props> {
  render() {
    const { disabled, handleAddPriorityFee, fees, availableGas } = this.props
    return (
      <div>
        <div className={styles.priorityExplanationText}>
          <FormattedMessage id="transactionFeeQuestion" />
        </div>
        <div className={styles.priorityFeeButtonContainer}>
          {FEE_OPTIONS.map(option => (
            <Button
              key={option.fee}
              className={classNames(styles.sendFormButton, {
                [styles.activeButton]: fees === option.fee,
              })}
              primary
              renderIcon={() => <LightningIcon />}
              active={fees === option.fee}
              disabled={this.shouldDisableFeeButton(
                disabled,
                availableGas,
                option.fee,
              )}
              onClick={() =>
                handleAddPriorityFee(fees === option.fee ? 0 : option.fee)
              }
            >
              <div>
                <div className={styles.speed}>
                  <FormattedMessage id={option.translationId} />
                </div>
                <div className={styles.feeCost}>
                  {toFixedDecimals(option.fee, option.precision)} GAS
                </div>
              </div>
            </Button>
          ))}
        </div>
      </div>
    )
  }

  shouldDisableFeeButton = (
    disabled: boolean,
    availableGas: number,
    feeAmount: number,
  ) => {
    if (disabled) return true
    if (availableGas < feeAmount) return true
    return false
  }
}
