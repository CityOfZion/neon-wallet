// @flow
import React from 'react'
import classNames from 'classnames'

import LightningIcon from '../../../assets/icons/lightning.svg'
import Button from '../../Button/Button'
import { toFixedDecimals } from '../../../core/formatters'
import styles from './PriorityFee.scss'

type Props = {
  disabled: boolean,
  fees: number,
  availableGas: number,
  handleAddPriorityFee: number => any
}

const FEE_OPTIONS = [
  {
    fee: 0.001,
    description: 'Fast',
    precision: 3
  },
  {
    fee: 0.05,
    description: 'Faster',
    precision: 2
  },
  {
    fee: 0.1,
    description: 'Fastest',
    precision: 1
  }
]

export default class PriorityFee extends React.Component<Props> {
  render() {
    const { disabled, handleAddPriorityFee, fees, availableGas } = this.props
    return (
      <div>
        <div className={styles.priorityExplanationText}>
          Prioritize your transaction with a fee?
        </div>
        <div className={styles.priorityFeeButtonContainer}>
          {FEE_OPTIONS.map(option => (
            <Button
              key={option.description}
              className={classNames(styles.sendFormButton, {
                [styles.activeButton]: fees === option.fee
              })}
              primary
              renderIcon={() => <LightningIcon />}
              active={fees === option.fee}
              disabled={this.shouldDisableFeeButton(
                disabled,
                availableGas,
                option.fee
              )}
              onClick={() =>
                handleAddPriorityFee(fees === option.fee ? 0 : option.fee)
              }
            >
              <div>
                <div className={styles.speed}>{option.description}</div>
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
    feeAmount: number
  ) => {
    if (disabled) return true
    if (availableGas < feeAmount) return true
    return false
  }
}
