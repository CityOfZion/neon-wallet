// @flow
import { compose } from 'recompose'

// $FlowFixMe
import { filter, cloneDeep } from 'lodash'
import { withActions, withData } from 'spunky'

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
import pricesActions from '../../../actions/pricesActions'
import neoLogo from '../../../assets/images/neo-logo.png'

const mapPricesDataToProps = prices => ({ prices })

const filterZeroBalanceTokens = balances =>
  filter(balances, token => toBigNumber(token.balance).gt(0))

const sortedByImage = a => {
  if (a.image) {
    return -1
  }
  if (!a.image) {
    return 1
  }
  return 0
}

const mapBalanceDataToProps = balances => {
  const mutatedBalances = cloneDeep(balances)
  // eslint-disable-next-line
  Object.keys(mutatedBalances).map(key => {
    if (key === 'NEO' || key === 'GAS') {
      mutatedBalances[key] = {
        scriptHash: key,
        symbol: key,
        balance: mutatedBalances[key],
        name: key,
        image: neoLogo
      }
    }
  })
  return {
    balances: filterZeroBalanceTokens(mutatedBalances).sort(sortedByImage)
  }
}

const mapBalancesActionsToProps = (actions, props) => ({
  refresh: () =>
    actions.call({
      net: props.net,
      address: props.address,
      tokens: props.tokens
    })
})

export default compose(
  withCurrencyData('currencyCode'),

  withNetworkData(),
  withAuthData(),
  withFilteredTokensData(),
  withProgressPanel(balancesActions, { title: 'Token Balances' }),
  withBalancesData(mapBalanceDataToProps),
  withData(pricesActions, mapPricesDataToProps),

  // expose data & functionality needed for `refresh` action
  withActions(balancesActions, mapBalancesActionsToProps),
  withLoadingProp(balancesActions)
)(TokenBalancesPanel)
