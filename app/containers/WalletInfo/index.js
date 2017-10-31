// @flow
import { connect } from 'react-redux'
import WalletInfo from './WalletInfo'
import { initiateGetBalance } from '../../modules/wallet'
import { sendEvent, clearTransactionEvent } from '../../modules/transactions'

const mapStateToProps = (state) => ({
  neo: state.wallet.Neo,
  gas: state.wallet.Gas,
  address: state.account.address,
  net: state.metadata.network,
  neoPrice: state.wallet.neoPrice,
  gasPrice: state.wallet.gasPrice
})

const mapDispatchToProps = (dispatch: DispatchType) => ({
  initiateGetBalance: (net, address) => dispatch(initiateGetBalance(net, address)),
  sendEvent: (bool, message) => dispatch(sendEvent(bool, message)),
  clearTransactionEvent: () => dispatch(clearTransactionEvent())
})

export default connect(mapStateToProps, mapDispatchToProps)(WalletInfo)
