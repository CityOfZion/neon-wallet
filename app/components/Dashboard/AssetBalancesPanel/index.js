// @flow
import { compose } from 'recompose'
import { values, omit } from 'lodash'
import { createBatchActions, withActions } from 'spunky'

import AssetBalancesPanel from './AssetBalancesPanel'
import balancesActions from '../../../actions/balancesActions'
import claimsActions from '../../../actions/claimsActions'
import pricesActions from '../../../actions/pricesActions'
import withBalancesData from '../../../hocs/withBalancesData'
import withCurrencyData from '../../../hocs/withCurrencyData'
import withPricesData from '../../../hocs/withPricesData'
import withLoadingProp from '../../../hocs/withLoadingProp'
import withProgressPanel from '../../../hocs/withProgressPanel'
import withSuccessNotification from '../../../hocs/withSuccessNotification'
import withFailureNotification from '../../../hocs/withFailureNotification'

const mapBalanceDataToProps = (balances) => ({
  NEO: balances.NEO,
  GAS: balances.GAS,
  tokenBalances: values(omit(balances, 'NEO', 'GAS'))
})

const mapPricesDataToProps = ({ NEO, GAS }) => ({
  neoPrice: NEO,
  gasPrice: GAS
})

const mapBalancesActionsToProps = (actions, props) => ({
  refresh: () => actions.call({ net: props.net, address: props.address, tokens: props.tokens })
})

// TODO: move this into its own actions file
const batchActions = createBatchActions('assetBalancesPanel', {
  prices: pricesActions,
  claims: claimsActions,
  balances: balancesActions
})

export default compose(
  withCurrencyData('currencyCode'),

  // Fetch price & balance data based based upon the selected currency.
  // Reload data with the currency changes.
  withProgressPanel(batchActions, { title: 'Balances' }),
  withPricesData(mapPricesDataToProps),
  withBalancesData(mapBalanceDataToProps),

  // Expose data & functionality needed for `refresh` action.
  withActions(balancesActions, mapBalancesActionsToProps),
  withLoadingProp(balancesActions),
  withSuccessNotification(balancesActions, 'Received latest blockchain information.'),
  withFailureNotification(balancesActions, 'Failed to retrieve blockchain information.')
)(AssetBalancesPanel)
