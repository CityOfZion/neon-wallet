// @flow
import { compose, withProps } from 'recompose'
import { withData } from 'spunky'
import { pickBy, pick, omit, reduce, map } from 'lodash-es'

import PortfolioPanel from './PortfolioPanel'
import portfolioPanelActions from '../../../actions/portfolioPanelActions'
import pricesActions from '../../../actions/pricesActions'
import withBalancesData from '../../../hocs/withBalancesData'
import withCurrencyData from '../../../hocs/withCurrencyData'
import withProgressPanel from '../../../hocs/withProgressPanel'
import { getTokenBalancesMap } from '../../../core/wallet'
import { toNumber, toBigNumber } from '../../../core/math'
import { ASSETS } from '../../../core/constants'

const removeEmptyBalances = balances =>
  pickBy(balances, balance => toBigNumber(balance).gt(0))

const mapPricesDataToProps = prices => ({ prices })

const mapBalancesDataToProps = balances => ({
  balances: removeEmptyBalances({
    ...pick(balances, ASSETS.NEO, ASSETS.GAS),
    ...getTokenBalancesMap(omit(balances, 'NEO', 'GAS'))
  })
})

const mapTotalPortfolioValueToProps = ({ prices, balances }) => ({
  total: reduce(
    balances,
    (result, balance, symbol) =>
      result + toNumber(balance) * (prices[symbol] || 0),
    0
  )
})

// sort balances by highest value and return only top 5
const mapSortedPortfolioBalanceProps = ({ prices, balances, total }) => ({
  balances: map(balances, (tokenBalance, symbol) => {
    const balance = toNumber(tokenBalance)
    const value = balance * (prices[symbol] || 0)
    const percent = value / total

    return { symbol, balance, value, percent }
  })
    .sort((a: Object, b: Object) => b.value - a.value)
    .slice(0, 5)
})

export default compose(
  withProgressPanel(portfolioPanelActions, { title: 'Total Wallet Value' }),
  withData(pricesActions, mapPricesDataToProps),
  withBalancesData(mapBalancesDataToProps),
  withCurrencyData(),
  withProps(mapTotalPortfolioValueToProps),
  withProps(mapSortedPortfolioBalanceProps)
)(PortfolioPanel)
