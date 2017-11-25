// @flow
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import WalletInfo from './WalletInfo'
import { showErrorNotification, showSuccessNotification } from '../../modules/notifications'
import { getAddress } from '../../modules/account'
import { getNetwork } from '../../modules/metadata'
import {
  initiateGetBalance,
  getNeo,
  getGas,
  getNeoPrice,
  getGasPrice,
  getTokens
} from '../../modules/wallet'
import { showModal } from '../../modules/modal'

const mapStateToProps = (state) => ({
  neo: getNeo(state),
  gas: getGas(state),
  address: getAddress(state),
  net: getNetwork(state),
  neoPrice: getNeoPrice(state),
  gasPrice: getGasPrice(state),
  tokens: getTokens(state)
})

const actionCreators = {
  initiateGetBalance,
  showErrorNotification,
  showSuccessNotification,
  showModal
}

const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(WalletInfo)
