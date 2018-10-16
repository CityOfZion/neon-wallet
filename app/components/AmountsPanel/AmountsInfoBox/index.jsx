// @flow
import React from 'react'
import classNames from 'classnames'

import styles from './AmountsInfoBox.scss'

type Props = {
  assetName: string,
  totalAmount: string,
  totalBalanceWorth: number,
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
    <span className={styles.assetName}>{assetName}</span>
    <span className={styles.assetAmount}>
      <strong>{totalAmount}</strong>
    </span>
    <span>
      {fiatCurrencySymbol}
      {totalBalanceWorth.toFixed(2)}
    </span>
  </div>
)

export default AmountsInfoBox
