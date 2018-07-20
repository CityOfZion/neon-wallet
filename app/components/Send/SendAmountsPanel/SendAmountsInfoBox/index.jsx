// @flow
import React from 'react'

import styles from './SendAmountsInfoBox.scss'

import { multiplyNumber } from '../../../../core/math'

type Props = {
  assetName: string,
  assetPrice: number,
  totalAmount: number,
  remainingAmount: number,
  totalBalanceWorth: number,
  remainingBalanceWorth: number,
  fiatCurrencySymbol: string
}

const SendAmountsInfoBox = ({
  assetName,
  assetPrice,
  totalAmount,
  totalBalanceWorth,
  remainingBalanceWorth,
  remainingAmount,
  fiatCurrencySymbol
}: Props) => (
  <div className={styles.sendAmountsInfoBox}>
    <div className={styles.assetTitle}>
      <h3>{assetName}</h3>
    </div>
    <div className={styles.assetAmounts}>
      <p className={styles.assetAmountsPrimary}>{totalAmount.toFixed(2)}</p>
      <p className={styles.assetAmountsSecondary}>
        {remainingAmount.toFixed(2)}
      </p>
    </div>
    <div className={styles.assetValue}>
      <p className={styles.totalAssetValue}>
        {fiatCurrencySymbol}
        {totalBalanceWorth}
      </p>
      <p className={styles.remainingAssetValue}>
        {fiatCurrencySymbol}
        {remainingBalanceWorth}
      </p>
    </div>
  </div>
)

export default SendAmountsInfoBox
