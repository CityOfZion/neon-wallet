// @flow
import { compose, withProps } from 'recompose'
import { withData } from 'spunky'
import { pickBy, pick, omit, reduce, map } from 'lodash'

import PortfolioPanel from './PortfolioPanel'
import pricesActions from '../../../actions/pricesActions'
import withBalancesData from '../../../hocs/withBalancesData'
import withCurrencyData from '../../../hocs/withCurrencyData'
import { getTokenBalancesMap } from '../../../core/wallet'
import { toNumber, toBigNumber } from '../../../core/math'
import { ASSETS } from '../../../core/constants'

const removeEmptyBalances = (balances) => {
  return pickBy(balances, (balance) => toBigNumber(balance).gt(0))
}

const mapPricesDataToProps = (prices) => ({ prices })

const mapBalancesDataToProps = (balances) => ({
  balances: removeEmptyBalances({
    ...pick(balances, ASSETS.NEO, ASSETS.GAS),
    ...getTokenBalancesMap(omit(balances, 'NEO', 'GAS'))
  })
})

const mapTotalPortfolioValueToProps = ({ prices, balances }) => ({
  total: reduce(balances, (result, balance, symbol) => {
    return result + toNumber(balance) * (prices[symbol] || 0)
  }, 0)
})

const mapPortfolioBalanceProps = ({ prices, balances, total }) => ({
  balances: map(balances, (tokenBalance, symbol) => {
    const balance = toNumber(tokenBalance)
    const value = balance * (prices[symbol] || 0)
    const percent = value / total

    return { symbol, balance, value, percent }
  })
})

export default compose(
  withData(pricesActions, mapPricesDataToProps),
  withBalancesData(mapBalancesDataToProps),
  withCurrencyData(),
  withProps(mapTotalPortfolioValueToProps),
  withProps(mapPortfolioBalanceProps)
)(PortfolioPanel)
