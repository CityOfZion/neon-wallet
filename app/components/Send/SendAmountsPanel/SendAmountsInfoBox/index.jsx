// @flow
import React from 'react'

import styles from './SendAmountsInfoBox.scss'

type Props = {
  assetName: string,
  totalAmount: string,
  remainingAmount: number,
  totalBalanceWorth: number,
  remainingBalanceWorth: number,
  fiatCurrencySymbol: string
}

const SendAmountsInfoBox = ({
  assetName,
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
      <p className={styles.assetAmountsPrimary}>{totalAmount}</p>
      <p className={styles.assetAmountsSecondary}>{remainingAmount}</p>
    </div>
    <div className={styles.assetValue}>
      <p className={styles.totalAssetValue}>
        {fiatCurrencySymbol}
        {totalBalanceWorth.toFixed(2)}
      </p>
      <p className={styles.remainingAssetValue}>
        {fiatCurrencySymbol}
        {remainingBalanceWorth.toFixed(2)}
      </p>
    </div>
  </div>
)

// const SendAmountsInfoBox = ({
//   assetName,
//   totalAmount,
//   totalBalanceWorth,
//   remainingBalanceWorth,
//   remainingAmount,
//   fiatCurrencySymbol
// }: Props) => (
//   <div className={styles.amountsInfoContainer}>
//     <div className={styles.sendAmountsInfoBox}>
//       <div className={styles.assetTitle}>
//         <h3>{assetName}</h3>
//       </div>
//       <div className={styles.assetAmounts}>
//         <p className={styles.assetAmountsPrimary}>{totalAmount}</p>
//         {/* <p className={styles.assetAmountsSecondary}>{remainingAmount}</p> */}
//       </div>
//       <div className={styles.assetValue}>
//         <p className={styles.totalAssetValue}>
//           {fiatCurrencySymbol}
//           {totalBalanceWorth.toFixed(2)}
//         </p>
//         {/* <p className={styles.remainingAssetValue}>
//         {fiatCurrencySymbol}
//         {remainingBalanceWorth.toFixed(2)}
//       </p> */}
//       </div>
//     </div>
//     <div className={styles.remainingAmountsInfo}>
//       <p className={styles.assetAmountsSecondary}>{remainingAmount}</p>
//       <p className={styles.remainingAssetValue}>
//         {fiatCurrencySymbol}
//         {remainingBalanceWorth.toFixed(2)}
//       </p>
//     </div>
//   </div>
// )

export default SendAmountsInfoBox
