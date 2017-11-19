// @flow
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Dashboard from './Dashboard'
import { togglePane, getSendPane, getConfirmPane } from '../../modules/dashboard'
import { logout, getAddress } from '../../modules/account'
import { getBlockHeight, getNetwork } from '../../modules/metadata'
import { getNotifications } from '../../modules/notifications'
import { getNeoPrice, getGasPrice } from '../../modules/wallet'
import { showModal } from '../../modules/modal'
import { getNeo, getGas } from '../../modules/wallet'

const mapStateToProps = (state: Object) => ({
  sendPane: getSendPane(state),
  confirmPane: getConfirmPane(state),
  blockHeight: getBlockHeight(state),
  net: getNetwork(state),
  address: getAddress(state),
  neoPrice: getNeoPrice(state),
  gasPrice: getGasPrice(state),
  notification: getNotifications(state),
  neo: getNeo(state),
  gas: getGas(state)
})

const actionCreators = {
  togglePane,
  logout,
  showModal
}

const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
