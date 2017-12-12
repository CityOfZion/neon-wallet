// @flow
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { logout, getAddress, getIsHardwareLogin } from '../../modules/account'
import { getBlockExplorer, getNetwork } from '../../modules/metadata'
import { getNotifications, showErrorNotification } from '../../modules/notifications'
import { getNEO, getGAS, getTokens, getIsLoaded, loadWalletData } from '../../modules/wallet'
import { showModal } from '../../modules/modal'
import { sendTransaction } from '../../modules/transactions'

import Dashboard from './Dashboard'

const mapStateToProps = (state: Object) => ({
  net: getNetwork(state),
  address: getAddress(state),
  notification: getNotifications(state),
  NEO: getNEO(state),
  GAS: getGAS(state),
  tokens: getTokens(state),
  loaded: getIsLoaded(state),
  explorer: getBlockExplorer(state),
  isHardwareLogin: getIsHardwareLogin(state)
})

const actionCreators = {
  logout,
  showModal,
  showErrorNotification,
  sendTransaction,
  loadWalletData
}

const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
