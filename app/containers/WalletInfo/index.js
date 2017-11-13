// @flow
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import WalletInfo from './WalletInfo'
import { initiateGetBalance, getNeo, getGas, getNeoPrice, getGasPrice } from '../../modules/wallet'
import { showErrorNotification, showSuccessNotification, showInfoNotification } from '../../modules/notifications'
import { getAddress } from '../../modules/account'
import { getNetwork } from '../../modules/metadata'

const mapStateToProps = (state) => ({
  neo: getNeo(state),
  gas: getGas(state),
  address: getAddress(state),
  net: getNetwork(state),
  neoPrice: getNeoPrice(state),
  gasPrice: getGasPrice(state)
})

const actionCreators = {
  initiateGetBalance,
  showErrorNotification,
  showSuccessNotification,
  showInfoNotification
}

const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(WalletInfo)
