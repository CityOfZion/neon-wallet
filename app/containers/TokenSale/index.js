// @flow
import { connect } from 'react-redux'
import TokenSale from './TokenSale'
import { initiateGetBalance } from '../../modules/wallet'
import { sendEvent, clearTransactionEvent } from '../../modules/transactions'
import { updateRpxBalance } from '../../modules/rpx'

const mapStateToProps = (state) => ({
  explorer: state.metadata.blockExplorer,
  wif: state.account.wif,
  neo: state.wallet.Neo,
  net: state.metadata.network,
  address: state.account.address,
  wallets: state.account.accountKeys,
  rpx: state.rpx.RPX
})

const mapDispatchToProps = (dispatch: DispatchType) => ({
  initiateGetBalance: (net, address) => dispatch(initiateGetBalance(net, address)),
  sendEvent: (bool, message) => dispatch(sendEvent(bool, message)),
  clearTransactionEvent: () => dispatch(clearTransactionEvent()),
  updateRpxBalance: (amount) => dispatch(updateRpxBalance(amount))
})

export default connect(mapStateToProps, mapDispatchToProps)(TokenSale)
