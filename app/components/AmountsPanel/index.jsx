// @flow
import React from 'react'
import classNames from 'classnames'
import { orderBy, times } from 'lodash-es'

import AmountsInfoBox from './AmountsInfoBox'
import { CURRENCIES } from '../../core/constants'

import Nothing from '../../assets/icons/nothing.svg'

import amountBoxStyles from './AmountsInfoBox/AmountsInfoBox.scss'
import styles from './AmountsPanel.scss'

type AmountDataItem = {
  symbol: string,
  price: string,
  totalBalance: string,
  totalBalanceWorth: number
}

type Props = {
  amountsData: AmountDataItem[],
  currencyCode: string
}

const ORDER_BY_FIELD = 'totalBalanceWorth'
const ORDERY_BY_DIRECTION = 'asc'
const MAX_RESULTS = 10
const RESULTS_PER_ROW = 5

const AmountsPanel = ({ amountsData, currencyCode }: Props) => {
  if (amountsData.length === 0) {
    return (
      <div className={styles.zeroAmount}>
        <Nothing /> <h1> Nothing to see here! </h1>
      </div>
    )
  }

  const orderedAmounts = orderBy(
    amountsData,
    ORDER_BY_FIELD,
    ORDERY_BY_DIRECTION
  ).slice(0, MAX_RESULTS)

  const amountsInSingleRow = orderedAmounts.length <= RESULTS_PER_ROW
  const amountToFill = amountsInSingleRow
    ? 0
    : MAX_RESULTS - orderedAmounts.length
  return (
    <div className={styles.container}>
      <section
        className={classNames(styles.amountsPanel, {
          [styles.amountsPanelSingleRow]: amountsInSingleRow,
          [styles.amountsPanelMultipleRows]: !amountsInSingleRow
        })}
      >
        {orderedAmounts.map((dataset: AmountDataItem, i: number) => (
          <AmountsInfoBox
            key={dataset.symbol}
            assetName={dataset.symbol}
            assetPrice={dataset.price}
            totalAmount={dataset.totalBalance}
            totalBalanceWorth={dataset.totalBalanceWorth}
            fiatCurrencySymbol={CURRENCIES[currencyCode].symbol}
            className={classNames({
              [amountBoxStyles.amountsInSingleRow]: amountsInSingleRow,
              [amountBoxStyles.amountsInMultipleRows]: !amountsInSingleRow,
              [amountBoxStyles.amountsInAltColor]:
                !amountsInSingleRow && i >= RESULTS_PER_ROW
            })}
          />
        ))}
        {amountToFill > 0 &&
          times(amountToFill).map(i => (
            <div
              key={`infoBoxFill${i}`}
              className={classNames(
                amountBoxStyles.amountsInAltColor,
                amountBoxStyles.amountsInfoBox
              )}
            />
          ))}
      </section>
    </div>
  )
}

export default AmountsPanel
