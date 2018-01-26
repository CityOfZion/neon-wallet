// @flow
import { connect, type MapStateToProps } from 'react-redux'
import { bindActionCreators } from 'redux'
import { compose } from 'recompose'
import { omit } from 'lodash'

import Loader from '../../components/Loader'
import balancesActions from '../../actions/balancesActions'
import withData from '../../hocs/api/withData'
import withFetch from '../../hocs/api/withFetch'
import withReload from '../../hocs/api/withReload'
import withProgressComponents from '../../hocs/api/withProgressComponents'
import withNetworkData from '../../hocs/withNetworkData'
import withAuthData from '../../hocs/withAuthData'
import withFilteredTokensData from '../../hocs/withFilteredTokensData'
import { getNotifications } from '../../modules/notifications'
import { loadWalletData } from '../../modules/wallet'
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
  sendTransaction,
  loadWalletData
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(actionCreators, dispatch)

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withNetworkData(),
  withAuthData(),
  withFilteredTokensData(),
  withFetch(balancesActions),
  withProgressComponents(balancesActions, {
    [LOADING]: Loader
  }),
  withData(balancesActions, mapBalanceDataToProps),
  withReload(balancesActions, ['networkId'])
)(Dashboard)
