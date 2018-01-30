// @flow
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { logout, getAddress } from '../../modules/account'
import {
  getNetwork
} from '../../modules/metadata'
import {
  getNotifications
} from '../../modules/notifications'
import {
  getNEO,
  getGAS,
  getTokenBalances,
  getIsLoaded,
  loadWalletData
} from '../../modules/wallet'
import { showModal } from '../../modules/modal'
import { sendTransaction } from '../../modules/transactions'

import Dashboard from './Dashboard'

const mapStateToProps = (state: Object) => ({
  net: getNetwork(state),
  address: getAddress(state),
  notification: getNotifications(state),
  NEO: getNEO(state),
  GAS: getGAS(state),
  tokenBalances: getTokenBalances(state),
  loaded: getIsLoaded(state)
})

const actionCreators = {
  logout,
  showModal,
  sendTransaction,
  loadWalletData
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(actionCreators, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
