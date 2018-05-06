// @flow
import { connect, type MapStateToProps } from 'react-redux'
import { bindActionCreators } from 'redux'
import { compose } from 'recompose'
import { createBatchActions, withRecall, withActions } from 'spunky'

import accountActions from '../../actions/accountActions'
import balancesActions from '../../actions/balancesActions'
import claimsActions from '../../actions/claimsActions'
import pricesActions from '../../actions/pricesActions'
import priceHistoryActions from '../../actions/priceHistoryActions'
import withInitialCall from '../../hocs/withInitialCall'
import withAuthData from '../../hocs/withAuthData'
import withCurrencyData from '../../hocs/withCurrencyData'
import withNetworkData from '../../hocs/withNetworkData'
import withFilteredTokensData from '../../hocs/withFilteredTokensData'
import { getNotifications } from '../../modules/notifications'
import { showModal } from '../../modules/modal'

import Dashboard from './Dashboard'

const mapStateToProps: MapStateToProps<*, *, *> = (state: Object) => ({
  notification: getNotifications(state)
})

const actionCreators = {
  showModal
}

const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch)

const mapAccountActionsToProps = (actions, props) => ({
  loadWalletData: () => actions.call({ net: props.net, address: props.address, tokens: props.tokens })
})

// TODO: move this into its own actions file
const batchActions = createBatchActions('dashboard', {
  balances: balancesActions,
  claims: claimsActions,
  prices: pricesActions,
  priceHistory: priceHistoryActions
})

export default compose(
  connect(mapStateToProps, mapDispatchToProps),

  // Expose function for polling & reloading account related data.
  withAuthData(),
  withNetworkData(),
  withCurrencyData('currency'),
  withFilteredTokensData(),
  withInitialCall(batchActions),
  withRecall(accountActions, ['networkId']),
  withActions(accountActions, mapAccountActionsToProps)
)(Dashboard)
