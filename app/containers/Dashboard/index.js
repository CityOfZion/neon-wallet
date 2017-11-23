// @flow
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Dashboard from './Dashboard'
import { togglePane } from '../../modules/dashboard'
import { logout, getAddress } from '../../modules/account'
import { getBlockHeight, getNetwork } from '../../modules/metadata'
import { getNotifications, showErrorNotification } from '../../modules/notifications'
import { getNeoPrice, getGasPrice, getNeo, getGas, getTokensBalance } from '../../modules/wallet'
import { showModal } from '../../modules/modal'
import { sendTransaction } from '../../modules/transactions'

const mapStateToProps = (state: Object) => ({
  blockHeight: getBlockHeight(state),
  net: getNetwork(state),
  address: getAddress(state),
  neoPrice: getNeoPrice(state),
  gasPrice: getGasPrice(state),
  notification: getNotifications(state),
  neo: getNeo(state),
  gas: getGas(state),
  tokensBalance: getTokensBalance(state)
})

const actionCreators = {
  togglePane,
  logout,
  showModal,
  showErrorNotification,
  sendTransaction
}

const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
