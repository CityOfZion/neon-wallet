// @flow
import { connect, type MapStateToProps } from 'react-redux'
import { bindActionCreators } from 'redux'
import { compose } from 'recompose'
import { omit, get, filter, values } from 'lodash'
import {
  withCall,
  withData,
  withRecall,
  withActions,
  withProgressComponents,
  alreadyLoadedStrategy,
  progressValues
} from 'spunky'

import Loader from '../../components/Loader'
import accountActions from '../../actions/accountActions'
import dashboardActions from '../../actions/dashboardActions'
import withNetworkData from '../../hocs/withNetworkData'
import withAuthData from '../../hocs/withAuthData'
import withFilteredTokensData from '../../hocs/withFilteredTokensData'
import { getNotifications } from '../../modules/notifications'
import { showModal } from '../../modules/modal'
import { sendTransaction } from '../../modules/transactions'

import Dashboard from './Dashboard'

const { LOADING } = progressValues

const mapStateToProps: MapStateToProps<*, *, *> = (state: Object) => ({
  notification: getNotifications(state)
})

const getTokenBalances = (balances: Balances): Array<string> => {
  const tokens = values(omit(balances, 'NEO', 'GAS'))
  return filter(tokens, token => token.balance !== '0')
}

const getICOTokenBalances = (balances: Balances): Array<string> => {
  return values(omit(balances, 'NEO', 'GAS'))
}

const mapDashboardDataToProps = (dashboardData: {
  balances: Balances,
  blockHeight: number
}): {
  NEO: ?string,
  GAS: ?string,
  tokenBalances: Array<string>,
  icoTokenBalances: Array<string>
} => {
  const balances = get(dashboardData, 'balances')
  return {
    NEO: get(balances, 'NEO', null),
    GAS: get(balances, 'GAS', null),
    tokenBalances: balances ? getTokenBalances(balances) : [],
    icoTokenBalances: balances ? getICOTokenBalances(balances) : []
  }
}

const actionCreators = {
  showModal,
  sendTransaction
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(actionCreators, dispatch)

const mapAccountActionsToProps = (actions, props) => ({
  loadWalletData: () =>
    actions.call({
      net: props.net,
      address: props.address,
      tokens: props.tokens
    })
})

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withNetworkData(),
  withAuthData(),
  withFilteredTokensData(),
  withCall(accountActions),
  withProgressComponents(
    accountActions,
    {
      [LOADING]: Loader
    },
    {
      strategy: alreadyLoadedStrategy
    }
  ),
  withData(dashboardActions, mapDashboardDataToProps),
  withRecall(accountActions, ['networkId']),
  withActions(accountActions, mapAccountActionsToProps)
)(Dashboard)
