// @flow
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { logout, getAddress } from '../../modules/account'
import {
  getNetwork,
  getNetworks,
  getAllTokens,
  setUserGeneratedTokens
} from '../../modules/metadata'
import {
  getNotifications,
  showErrorNotification
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
import { participateInSale, oldParticipateInSale } from '../../modules/sale'

import Dashboard from './Dashboard'

const mapStateToProps = (state: Object) => ({
  net: getNetwork(state),
  address: getAddress(state),
  notification: getNotifications(state),
  NEO: getNEO(state),
  GAS: getGAS(state),
  tokenBalances: getTokenBalances(state),
  loaded: getIsLoaded(state),
  networks: getNetworks(state),
  allTokens: getAllTokens(state)
})

const actionCreators = {
  logout,
  showModal,
  showErrorNotification,
  sendTransaction,
  loadWalletData,
  participateInSale,
  oldParticipateInSale,
  setUserGeneratedTokens
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(actionCreators, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
