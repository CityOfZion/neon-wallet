// @flow
import React from 'react'
import { FormattedMessage } from 'react-intl'
import { compose } from 'recompose'
import { values, omit, get } from 'lodash-es'
import { withActions, withData } from 'spunky'

import AssetBalancesPanel from './AssetBalancesPanel'
import assetBalancesPanelActions from '../../../actions/assetBalancesPanelActions'
import balancesActions from '../../../actions/balancesActions'
import priceHistoryActions from '../../../actions/priceHistoryActions'
import withBalancesData from '../../../hocs/withBalancesData'
import withCurrencyData from '../../../hocs/withCurrencyData'
import withPricesData from '../../../hocs/withPricesData'
import withLoadingProp from '../../../hocs/withLoadingProp'
import withProgressPanel from '../../../hocs/withProgressPanel'
import withSuccessNotification from '../../../hocs/withSuccessNotification'
import withFailureNotification from '../../../hocs/withFailureNotification'
import withNetworkData from '../../../hocs/withNetworkData'
import withAuthData from '../../../hocs/withAuthData'
import withFilteredTokensData from '../../../hocs/withFilteredTokensData'
import { ASSETS } from '../../../core/constants'
import { toBigNumber } from '../../../core/math'
import withSettingsContext from '../../../hocs/withSettingsContext'

const mapBalanceDataToProps = balances => ({
  NEO: balances.NEO,
  GAS: balances.GAS,
  tokenBalances: values(omit(balances, 'NEO', 'GAS')),
})

const mapPricesDataToProps = ({ NEO, GAS }) => ({
  neoPrice: NEO,
  gasPrice: GAS,
})

const mapPriceChangeDataToProps = (prices: Object) => {
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

const mapBalancesActionsToProps = (actions: Object, props: Object) => ({
  refresh: () =>
    actions.call({
      net: props.net,
      address: props.address,
      tokens: props.tokens,
    }),
})

export default compose(
  withCurrencyData('currencyCode'),

  // Fetch price & balance data based based upon the selected currency.
  // Reload data with the currency changes.
  withNetworkData(),
  withAuthData(),
  withFilteredTokensData(),
  withProgressPanel(assetBalancesPanelActions, {
    title: <FormattedMessage id="dashboardAssetsPanelLabel" />,
  }),
  withPricesData(mapPricesDataToProps),
  withBalancesData(mapBalanceDataToProps),
  withData(priceHistoryActions, mapPriceChangeDataToProps),

  // Expose data & functionality needed for `refresh` action.
  withActions(balancesActions, mapBalancesActionsToProps),
  withLoadingProp(balancesActions),
  withSuccessNotification(
    balancesActions,
    'notifications.success.receivedBlockchainInfo',
    {},
    true,
  ),
  withFailureNotification(
    balancesActions,
    'notifications.failure.blockchainInfoFailure',
    {},
    true,
  ),
)(withSettingsContext(AssetBalancesPanel))
