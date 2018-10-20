// @flow
import React from 'react'
import { isNumber } from 'lodash-es'
import classNames from 'classnames'
import { PRICE_UNAVAILABLE } from '../../../core/constants'
import { truncateNumber } from '../../../core/math'
import Tooltip from '../../Tooltip'

import styles from './AmountsInfoBox.scss'

type Props = {
  assetName: string,
  totalAmount: string,
  totalBalanceWorth: number | typeof PRICE_UNAVAILABLE,
  fiatCurrencySymbol: string,
  className: string
}

const DECIMAL_PLACES = 2

const AmountsInfoBox = ({
  assetName,
  totalAmount,
  totalBalanceWorth,
  fiatCurrencySymbol,
  className
}: Props) => {
  const totalAmountNumeric = Number(totalAmount)
  const totalAmountIsInteger = Number.isInteger(totalAmountNumeric)
  return (
    <div className={classNames(styles.amountsInfoBox, className)}>
      <span>
        <span className={styles.assetName}>{assetName}</span>
        <Tooltip title={totalAmount} disabled={totalAmountIsInteger}>
          <span className={styles.assetAmount}>
            <strong>
              {totalAmountIsInteger
                ? totalAmount
                : truncateNumber(totalAmountNumeric, DECIMAL_PLACES).toFixed(
                    DECIMAL_PLACES
                  )}
            </strong>
          </span>
        </Tooltip>
      </span>
      <span className={styles.assetWorth}>
        {isNumber(totalBalanceWorth)
          ? `${fiatCurrencySymbol} ${totalBalanceWorth.toFixed(DECIMAL_PLACES)}`
          : totalBalanceWorth}
      </span>
    </div>
  )
}

export default AmountsInfoBox
