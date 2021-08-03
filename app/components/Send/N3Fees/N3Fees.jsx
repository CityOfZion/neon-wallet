// @flow
import React from 'react'
import classNames from 'classnames'

import { imageMap } from '../../../assets/nep5/svg'
import WarningIcon from '../../../assets/icons/warning.svg'
import styles from './N3Fees.scss'

const GAS_IMAGE = imageMap.GAS

type Props = {
  currencyCode: string,
  gasPrice: string,
  GAS: string,
  fees: {
    systemFee: string,
    networkFee: string,
  },
  notEnoughGasCallback: boolean => void,
}

export default class N3Fees extends React.Component<Props> {
  static defaultProps = {
    fees: {
      systemFee: 0,
      networkFee: 0,
    },
  }

  render() {
    const {
      fees,
      currencyCode,
      gasPrice,
      GAS,
      notEnoughGasCallback,
    } = this.props

    const totalFees = parseFloat(
      (Number(fees.systemFee) + Number(fees.networkFee)).toFixed(8),
    )
    const totalFeesInFiat = (Number(gasPrice) * totalFees).toFixed(2)
    const hasSufficientGas = Number(GAS) > totalFees

    notEnoughGasCallback(hasSufficientGas)

    return (
      <div>
        <div className={styles.explanation}>
          <div
            className={classNames({
              [styles.disabled]: !totalFees,
            })}
          >
            TOTAL GAS FEES
          </div>

          {!!totalFees &&
            !hasSufficientGas && (
              <div className={styles.gasWarning}>
                <WarningIcon /> INSUFFICIENT GAS
              </div>
            )}
        </div>

        <div
          className={classNames({
            [styles.disabled]: !totalFees,
            [styles.feeContainer]: true,
          })}
        >
          <div className={styles.gasAmount}>
            <img
              className={classNames({
                [styles.tokenImage]: true,
                [styles.disabledTokenImage]: !totalFees,
              })}
              src={GAS_IMAGE}
              alt=""
            />
            {totalFees}
          </div>

          <div className={styles.fiatAmount}>
            <div className={styles.currencyCode}>
              {currencyCode.toUpperCase()}
            </div>
            {totalFeesInFiat}
          </div>
        </div>
      </div>
    )
  }
}
