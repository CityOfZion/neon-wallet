// @flow
import { compose, withProps } from 'recompose'
import { pickBy, pick, omit, reduce } from 'lodash'

import PortfolioPanel from './PortfolioPanel'
import pricesActions from '../../../actions/pricesActions'
import balancesActions from '../../../actions/balancesActions'
import withData from '../../../hocs/api/withData'
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

export default compose(
  withData(pricesActions, mapPricesDataToProps),
  withData(balancesActions, mapBalancesDataToProps),
  withCurrencyData(),
  withProps(mapTotalPortfolioValueToProps)
)(PortfolioPanel)
