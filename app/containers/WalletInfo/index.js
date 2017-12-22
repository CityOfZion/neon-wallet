// @flow
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import WalletInfo from './WalletInfo'
import { initiateGetBalance } from '../../modules/wallet'
import { showErrorNotification, showSuccessNotification, showInfoNotification } from '../../modules/notification'

const mapStateToProps = (state) => ({
  neo: state.wallet.Neo,
  gas: state.wallet.Gas,
  address: state.account.address,
  net: state.metadata.network,
  neoPrice: state.wallet.neoPrice,
  gasPrice: state.wallet.gasPrice
})

const actionCreators = {
  initiateGetBalance,
  showErrorNotification,
  showSuccessNotification,
  showInfoNotification
}

const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(WalletInfo)
