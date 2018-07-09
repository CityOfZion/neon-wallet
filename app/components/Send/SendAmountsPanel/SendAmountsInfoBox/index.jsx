// @flow
import React from 'react'

import styles from './SendAmountsInfoBox.scss'

import { multiplyNumber } from '../../../../core/math'

type Props = {
  assetName: string,
  assetPrice: number,
  totalAmount: number,
  remainingAmount: number,
  fiatCurrencySymbol: string
}

const SendAmountsInfoBox = ({
  assetName,
  assetPrice,
  totalAmount,
  remainingAmount,
  fiatCurrencySymbol
}: Props) => (
  <div className={styles.sendAmountsInfoBox}>
    <div className={styles.assetTitle}>
      <h3>{assetName}</h3>
    </div>
    <div className={styles.assetAmounts}>
      <p className={styles.assetAmountsPrimary}>{totalAmount}</p>
      <p className={styles.assetAmountsSecondary}>{remainingAmount}</p>
    </div>
    <div className={styles.assetValue}>
      <p className={styles.totalAssetValue}>
        {fiatCurrencySymbol}
        {multiplyNumber(assetPrice, totalAmount).c[0]}
      </p>
      <p className={styles.remainingAssetValue}>
        {fiatCurrencySymbol}
        {assetPrice * remainingAmount}
      </p>
    </div>
  </div>
)

export default SendAmountsInfoBox
