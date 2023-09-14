// @flow
import { compose } from 'recompose'
import { values, omit, get, isEmpty } from 'lodash-es'

import AssetBalancesPanel from './AssetBalancesPanel'
import withBalancesData from '../../../hocs/withBalancesData'
import withPricesData from '../../../hocs/withPricesData'
import withNetworkData from '../../../hocs/withNetworkData'
import withAuthData from '../../../hocs/withAuthData'
import { ASSETS } from '../../../core/constants'
import { toBigNumber } from '../../../core/math'
import withSettingsContext from '../../../hocs/withSettingsContext'
import withPriceHistoryData from '../../../hocs/withPriceHistoryData'

const mapBalanceDataToProps = balances => ({
  NEO: balances?.NEO,
  GAS: balances?.GAS,
  tokenBalances: values(omit(balances, 'NEO', 'GAS')),
})

const mapPricesDataToProps = prices => ({
  neoPrice: prices?.NEO,
  gasPrice: prices?.GAS,
})

const mapPriceChangeDataToProps = (prices: Object) => {
  if (isEmpty(prices)) {
    return {
      neoPriceChange: toBigNumber(0),
      gasPriceChange: toBigNumber(0),
    }
  }
  const oldNeo = toBigNumber(get(prices, `[${ASSETS.NEO}][0].close`, 0))
  const newNeo = toBigNumber(
    get(prices, `[${ASSETS.NEO}][${prices[ASSETS.NEO].length - 1}].close`, 0),
  )
  const oldGas = toBigNumber(get(prices, `[${ASSETS.GAS}][0].close`, 0))
  const newGas = toBigNumber(
    get(prices, `[${ASSETS.GAS}][${prices[ASSETS.GAS].length - 1}].close`, 0),
  )

  return {
    neoPriceChange: newNeo.sub(oldNeo).dividedBy(oldNeo),
    gasPriceChange: newGas.sub(oldGas).dividedBy(oldGas),
  }
}

export default compose(
  withNetworkData(),
  withAuthData,
  withPricesData(mapPricesDataToProps),
  withBalancesData(mapBalanceDataToProps),
  withPriceHistoryData(mapPriceChangeDataToProps),
  withSettingsContext,
)(AssetBalancesPanel)
