// @flow
import { compose } from 'recompose'
import { filter, values, omit } from 'lodash'
import { withActions } from 'spunky'

import TokenBalancesPanel from './TokenBalancesPanel'
import balancesActions from '../../../actions/balancesActions'
import withNetworkData from '../../../hocs/withNetworkData'
import withAuthData from '../../../hocs/withAuthData'
import withBalancesData from '../../../hocs/withBalancesData'
import withCurrencyData from '../../../hocs/withCurrencyData'
import withFilteredTokensData from '../../../hocs/withFilteredTokensData'
import withLoadingProp from '../../../hocs/withLoadingProp'
import withProgressPanel from '../../../hocs/withProgressPanel'
import { toBigNumber } from '../../../core/math'

const filterZeroBalanceTokens = (balances) => {
  return filter(balances, (token) => toBigNumber(token.balance).gt(0))
}

const getTokenBalances = (balances) => {
  return values(omit(balances, 'NEO', 'GAS'))
}

const mapBalanceDataToProps = (balances) => ({
  balances: filterZeroBalanceTokens(getTokenBalances(balances))
})

const mapBalancesActionsToProps = (actions, props) => ({
  refresh: () => actions.call({ net: props.net, address: props.address, tokens: props.tokens })
})

export default compose(
  withProgressPanel(balancesActions, { title: 'Token Balances' }),
  withBalancesData(mapBalanceDataToProps),
  withCurrencyData('currencyCode'),

  // expose data & functionality needed for `refresh` action
  withNetworkData(),
  withAuthData(),
  withFilteredTokensData(),
  withActions(balancesActions, mapBalancesActionsToProps),
  withLoadingProp(balancesActions)
)(TokenBalancesPanel)
