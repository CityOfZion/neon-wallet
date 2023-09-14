// @flow
import React from 'react'
import { compose, withProps } from 'recompose'
import { pickBy, pick, omit, reduce, map } from 'lodash-es'

import PortfolioPanel from './PortfolioPanel'
import withBalancesData from '../../../hocs/withBalancesData'
import { getTokenBalancesMap } from '../../../core/wallet'
import { toNumber, toBigNumber } from '../../../core/math'
import { ASSETS } from '../../../core/constants'
import withSettingsContext from '../../../hocs/withSettingsContext'
import withPricesData from '../../../hocs/withPricesData'

const removeEmptyBalances = balances =>
  pickBy(balances, balance => toBigNumber(balance).gt(0))

const mapPricesDataToProps = prices => ({ prices })

const mapBalancesDataToProps = balances => ({
  balances: removeEmptyBalances({
    ...pick(balances, ASSETS.NEO, ASSETS.GAS),
    ...getTokenBalancesMap(omit(balances, 'NEO', 'GAS')),
  }),
})

const mapTotalPortfolioValueToProps = ({ prices, balances }) =>
  prices
    ? {
        // $FlowFixMe
        total: reduce(
          balances,
          (result, balance, symbol) =>
            result + toNumber(balance) * (prices[symbol] || 0),
          0,
        ),
      }
    : { total: 0 }

// sort balances by highest value and return only top 5
const mapSortedPortfolioBalanceProps = ({ prices, balances, total }) => ({
  // $FlowFixMe
  balances: map(balances, (tokenBalance, symbol) => {
    const balance = toNumber(tokenBalance)
    const value = balance * (prices[symbol] || 0)
    const percent = value / total
    return { symbol, balance, value, percent }
  })
    .sort((a: Object, b: Object) => b.value - a.value)
    .filter(balances => balances.value)
    .slice(0, 5),
})

export default compose(
  withPricesData(mapPricesDataToProps),
  withBalancesData(mapBalancesDataToProps),
  withProps(mapTotalPortfolioValueToProps),
  withProps(mapSortedPortfolioBalanceProps),
  withSettingsContext,
)(PortfolioPanel)
