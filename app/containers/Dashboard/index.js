// @flow
import { connect, type MapStateToProps } from 'react-redux'
import { bindActionCreators } from 'redux'
import { compose } from 'recompose'
import { omit } from 'lodash'

import Loader from '../../components/Loader'
import accountActions from '../../actions/accountActions'
import withData from '../../hocs/api/withData'
import withFetch from '../../hocs/api/withFetch'
import withReload from '../../hocs/api/withReload'
import withActions from '../../hocs/api/withActions'
import withProgressComponents from '../../hocs/api/withProgressComponents'
import withNetworkData from '../../hocs/withNetworkData'
import withAuthData from '../../hocs/withAuthData'
import withFilteredTokensData from '../../hocs/withFilteredTokensData'
import alreadyLoaded from '../../hocs/api/progressStrategies/alreadyLoadedStrategy'
import { getNotifications } from '../../modules/notifications'
import { showModal } from '../../modules/modal'
import { sendTransaction } from '../../modules/transactions'
import { LOADING } from '../../values/state'

import Dashboard from './Dashboard'

const mapStateToProps: MapStateToProps<*, *, *> = (state: Object) => ({
  notification: getNotifications(state)
})

const mapBalanceDataToProps = (balances) => ({
  NEO: balances.NEO,
  GAS: balances.GAS,
  tokenBalances: omit(balances, 'NEO', 'GAS')
})

const actionCreators = {
  showModal,
  sendTransaction
}

const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch)

const mapAccountActionsToProps = (actions, props) => ({
  loadWalletData: () => actions.request({ net: props.net, address: props.address, tokens: props.tokens })
})

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withNetworkData(),
  withAuthData(),
  withFilteredTokensData(),
  withFetch(accountActions),
  withProgressComponents(accountActions, {
    [LOADING]: Loader
  }, {
    strategy: alreadyLoaded
  }),
  withData(accountActions, mapBalanceDataToProps),
  withReload(accountActions, ['networkId']),
  withActions(accountActions, mapAccountActionsToProps)
)(Dashboard)
