// @flow
import { compose, withProps } from 'recompose'
import { pick, omit, reduce } from 'lodash'

import PortfolioPanel from './PortfolioPanel'
import pricesActions from '../../../actions/pricesActions'
import balancesActions from '../../../actions/balancesActions'
import withData from '../../../hocs/api/withData'
import withCurrencyData from '../../../hocs/withCurrencyData'
import { getTokenBalancesMap } from '../../../core/wallet'
import { toNumber } from '../../../core/math'
import { ASSETS } from '../../../core/constants'

const mapPricesDataToProps = (prices) => ({ prices })

const mapBalancesDataToProps = (balances) => ({
  balances: {
    ...pick(balances, ASSETS.NEO, ASSETS.GAS),
    ...getTokenBalancesMap(omit(balances, 'NEO', 'GAS'))
  }
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
