// @flow
import { compose } from 'recompose'
import { values, omit } from 'lodash'
import { withActions } from 'spunky'

import AssetBalancesPanel from './AssetBalancesPanel'
import balancesActions from '../../../actions/balancesActions'
import withBalancesData from '../../../hocs/withBalancesData'
import withCurrencyData from '../../../hocs/withCurrencyData'
import withPricesData from '../../../hocs/withPricesData'
import withLoadingProp from '../../../hocs/withLoadingProp'
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

export default compose(
  withCurrencyData('currencyCode'),

  // Fetch prices data based based upon the selected currency.  Reload data with the currency changes.
  withPricesData(mapPricesDataToProps),

  // Fetch balances data based based upon the selected network.  Reload data with the network changes.
  withBalancesData(mapBalanceDataToProps),

  // Expose data & functionality needed for `refresh` action.
  withActions(balancesActions, mapBalancesActionsToProps),
  withLoadingProp(balancesActions),
  withSuccessNotification(balancesActions, 'Received latest blockchain information.'),
  withFailureNotification(balancesActions, 'Failed to retrieve blockchain information.')
)(AssetBalancesPanel)
