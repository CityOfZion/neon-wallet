// @flow
import { connect, type MapStateToProps } from 'react-redux'
import { bindActionCreators } from 'redux'
import { compose } from 'recompose'

import balanceActions from '../../actions/balanceActions'
import withData from '../../hocs/api/withData'
import withFetch from '../../hocs/api/withFetch'
import withReload from '../../hocs/api/withReload'
import withNetworkData from '../../hocs/withNetworkData'
import withAccountData from '../../hocs/withAccountData'
import withFilteredTokensData from '../../hocs/withFilteredTokensData'
import { getNotifications } from '../../modules/notifications'
import { getNEO, getGAS, getTokenBalances, getIsLoaded, loadWalletData } from '../../modules/wallet'
import { showModal } from '../../modules/modal'
import { sendTransaction } from '../../modules/transactions'

import Dashboard from './Dashboard'

const mapStateToProps: MapStateToProps<*, *, *> = (state: Object) => ({
  notification: getNotifications(state),
  NEO: getNEO(state),
  GAS: getGAS(state),
  tokenBalances: getTokenBalances(state),
  loaded: getIsLoaded(state)
})

const actionCreators = {
  showModal,
  sendTransaction,
  loadWalletData
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(actionCreators, dispatch)

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withNetworkData(),
  withAccountData(),
  withFilteredTokensData(),
  withFetch(balanceActions),
  withData(balanceActions),
  withReload(balanceActions, ['networkId'])
)(Dashboard)
