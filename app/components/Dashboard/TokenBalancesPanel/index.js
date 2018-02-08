// @flow
import { compose } from 'recompose'
import { values, omit } from 'lodash'
import { withData, withActions } from 'spunky'

import TokenBalancesPanel from './TokenBalancesPanel'
import balancesActions from '../../../actions/balancesActions'
import withNetworkData from '../../../hocs/withNetworkData'
import withAuthData from '../../../hocs/withAuthData'
import withCurrencyData from '../../../hocs/withCurrencyData'
import withFilteredTokensData from '../../../hocs/withFilteredTokensData'

const mapBalanceDataToProps = (balances) => ({
  balances: values(omit(balances, 'NEO', 'GAS'))
})

const mapBalancesActionsToProps = (actions, props) => ({
  refresh: () => actions.call({ net: props.net, address: props.address, tokens: props.tokens })
})

export default compose(
  withData(balancesActions, mapBalanceDataToProps),
  withCurrencyData('currencyCode'),

  // expose data & functionality needed for `refresh` action
  withNetworkData(),
  withAuthData(),
  withFilteredTokensData(),
  withActions(balancesActions, mapBalancesActionsToProps)
)(TokenBalancesPanel)
