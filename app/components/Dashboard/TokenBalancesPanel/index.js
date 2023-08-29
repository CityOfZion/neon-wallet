// @flow
import React from 'react'
import { compose } from 'recompose'
import { FormattedMessage, injectIntl } from 'react-intl'

// $FlowFixMe
import { filter, cloneDeep } from 'lodash-es'
import { withActions, withData } from 'spunky'

import TokenBalancesPanel from './TokenBalancesPanel'
import balancesActions from '../../../actions/balancesActions'
import withNetworkData from '../../../hocs/withNetworkData'
import withAuthData from '../../../hocs/withAuthData'
import withBalancesData from '../../../hocs/withBalancesData'
import withLoadingProp from '../../../hocs/withLoadingProp'
import withProgressPanel from '../../../hocs/withProgressPanel'
import { toBigNumber } from '../../../core/math'
import pricesActions from '../../../actions/pricesActions'
import { imageMap } from '../../../assets/nep5/png'
import nftActions from '../../../actions/nftActions'
import withSettingsContext from '../../../hocs/withSettingsContext'

const mapPricesDataToProps = prices => ({ prices })
const mapNftDataToProps = nft => ({ nft })

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
        image: imageMap[key],
      }
    }
  })
  return {
    balances: filterZeroBalanceTokens(mutatedBalances).sort(sortedByImage),
  }
}

const mapBalancesActionsToProps = (actions, props) => ({
  refresh: () =>
    actions.call({
      net: props.net,
      address: props.address,
      tokens: props.tokens,
    }),
})

const mapNftActionsToProps = (actions, props) => ({
  refresh: () =>
    actions.call({
      net: props.net,
      address: props.address,
    }),
})

export default compose(
  withNetworkData(),
  withAuthData,
  withProgressPanel(pricesActions, {
    title: <FormattedMessage id="dashboardBalancePanelLabel" />,
  }),
  withBalancesData(mapBalanceDataToProps),
  withData(pricesActions, mapPricesDataToProps),
  // expose data & functionality needed for `refresh` action
  // withActions(balancesActions, mapBalancesActionsToProps),
  // withLoadingProp(balancesActions),
  withActions(nftActions, mapNftActionsToProps),
  withLoadingProp(nftActions),

  withData(nftActions, mapNftDataToProps),
  injectIntl,
  withSettingsContext,
)(TokenBalancesPanel)
