// @flow
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import WalletInfo from './WalletInfo'
import { initiateGetBalance } from '../../modules/wallet'
import { sendEvent, clearTransactionEvent } from '../../modules/transactions'

const mapStateToProps = (state) => ({
  neo: state.wallet.Neo,
  gas: state.wallet.Gas,
  address: state.account.address,
  net: state.metadata.network,
  price: state.wallet.price
})

const actionCreators = {
  initiateGetBalance,
  sendEvent,
  clearTransactionEvent
}

const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(WalletInfo)
