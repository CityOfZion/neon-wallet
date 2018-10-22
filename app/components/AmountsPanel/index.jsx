// @flow
import React from 'react'
import classNames from 'classnames'
import { orderBy, times, has } from 'lodash-es'

import AmountsInfoBox from './AmountsInfoBox'
import { CURRENCIES, PRICE_UNAVAILABLE } from '../../core/constants'

import Nothing from '../../assets/icons/nothing.svg'

import amountBoxStyles from './AmountsInfoBox/AmountsInfoBox.scss'
import styles from './AmountsPanel.scss'

type AmountDataItem = {
  symbol: string,
  price: string,
  totalBalance: string,
  totalBalanceWorth: number | typeof PRICE_UNAVAILABLE
}

type Props = {
  amountsData: AmountDataItem[],
  currencyCode: string
}

const ORDER_BY_FIELD = 'totalBalanceWorth'
const ORDERY_BY_DIRECTION = 'desc'
const RESULTS_PER_ROW = 4
const MAX_RESULTS = 8

const validateAmountDataItem = (amountDataItem: AmountDataItem) =>
  has(amountDataItem, 'symbol') &&
  has(amountDataItem, 'price') &&
  has(amountDataItem, 'totalBalance') &&
  has(amountDataItem, 'totalBalanceWorth')

const AmountsPanel = ({ amountsData, currencyCode }: Props) => {
  if (!Array.isArray(amountsData) || amountsData.length === 0) {
    return (
      <div className={styles.zeroAmount}>
        <Nothing /> <h1> Nothing to see here! </h1>
      </div>
    )
  }

  const orderedAmounts = orderBy(
    /* $FlowFixMe */
    amountsData,
    item => (item.price ? item[ORDER_BY_FIELD] : '0'),
    ORDERY_BY_DIRECTION
  ).slice(0, MAX_RESULTS)

  const amountsInSingleRow = orderedAmounts.length <= RESULTS_PER_ROW
  const amountToFill = amountsInSingleRow
    ? 0
    : Math.ceil(orderedAmounts.length / RESULTS_PER_ROW) * RESULTS_PER_ROW -
      orderedAmounts.length
  return (
    <div className={styles.container}>
      <section
        className={classNames(styles.amountsPanel, {
          [styles.amountsPanelSingleRow]: amountsInSingleRow,
          [styles.amountsPanelMultipleRows]: !amountsInSingleRow
        })}
      >
        {[...orderedAmounts, ...times(amountToFill)].map(
          (dataset: AmountDataItem, i: number) => {
            const isAltRow =
              !amountsInSingleRow &&
              Math.ceil((i + 1) / RESULTS_PER_ROW) % 2 === 0
            if (validateAmountDataItem(dataset)) {
              return (
                <AmountsInfoBox
                  key={`${dataset.symbol}${i}`}
                  assetName={dataset.symbol}
                  assetPrice={dataset.price}
                  totalAmount={dataset.totalBalance}
                  totalBalanceWorth={dataset.totalBalanceWorth}
                  fiatCurrencySymbol={CURRENCIES[currencyCode].symbol}
                  className={classNames({
                    [amountBoxStyles.amountsInSingleRow]: amountsInSingleRow,
                    [amountBoxStyles.amountsInMultipleRows]: !amountsInSingleRow,
                    [amountBoxStyles.amountsInAltColor]: isAltRow
                  })}
                />
              )
            }
            return (
              <div
                key={`infoBoxFill${i}`}
                className={classNames(amountBoxStyles.amountsInfoBox, {
                  [amountBoxStyles.amountsInAltColor]: isAltRow
                })}
              />
            )
          }
        )}
      </section>
    </div>
  )
}

export default AmountsPanel
