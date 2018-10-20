// @flow
import React from 'react'
import { isNumber } from 'lodash-es'
import classNames from 'classnames'
import { PRICE_UNAVAILABLE } from '../../../core/constants'
import { imageMap } from '../../../assets/nep5/png'

import styles from './AmountsInfoBox.scss'

type Props = {
  assetName: string,
  totalAmount: string,
  totalBalanceWorth: number | typeof PRICE_UNAVAILABLE,
  fiatCurrencySymbol: string,
  className: string
}

const AmountsInfoBox = ({
  assetName,
  totalAmount,
  totalBalanceWorth,
  fiatCurrencySymbol,
  className
}: Props) => (
  <div className={classNames(styles.amountsInfoBox, className)}>
    <span>
      <span className={styles.assetName}>{assetName}</span>
      <span className={styles.assetAmount}>
        <strong>{totalAmount}</strong>
      </span>
    </span>
    <span className={styles.assetWorth}>
      {isNumber(totalBalanceWorth)
        ? `${fiatCurrencySymbol}${totalBalanceWorth.toFixed(2)}`
        : totalBalanceWorth}
    </span>
  </div>
)

export default AmountsInfoBox
