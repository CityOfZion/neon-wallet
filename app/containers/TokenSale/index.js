// @flow
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import TokenSale from './TokenSale'
import { initiateGetBalance } from '../../modules/wallet'
import { showErrorNotification, showSuccessNotification, showStickyInfoNotification } from '../../modules/notification'
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

const actionCreators = {
  initiateGetBalance,
  showErrorNotification,
  showSuccessNotification,
  showStickyInfoNotification,
  updateRpxBalance
}

const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(TokenSale)
