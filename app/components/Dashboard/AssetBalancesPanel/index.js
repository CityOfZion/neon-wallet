// @flow
import { compose } from 'recompose'
import { values, omit } from 'lodash'

import AssetBalancesPanel from './AssetBalancesPanel'
import pricesActions from '../../../actions/pricesActions'
import balancesActions from '../../../actions/balancesActions'
import withData from '../../../hocs/api/withData'
import withActions from '../../../hocs/api/withActions'
import withNetworkData from '../../../hocs/withNetworkData'
import withAuthData from '../../../hocs/withAuthData'
import withCurrencyData from '../../../hocs/withCurrencyData'
import withFilteredTokensData from '../../../hocs/withFilteredTokensData'
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
  refresh: () => actions.request({ net: props.net, address: props.address, tokens: props.tokens })
})

export default compose(
  withData(pricesActions, mapPricesDataToProps),
  withData(balancesActions, mapBalanceDataToProps),
  withCurrencyData('currencyCode'),

  // expose data & functionality needed for `refresh` action
  withNetworkData(),
  withAuthData(),
  withFilteredTokensData(),
  withActions(balancesActions, mapBalancesActionsToProps),
  withSuccessNotification(balancesActions, 'Received latest blockchain information.'),
  withFailureNotification(balancesActions, 'Failed to retrieve blockchain information.')
)(AssetBalancesPanel)
