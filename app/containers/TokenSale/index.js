// @flow
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import TokenSale from './TokenSale'
import { initiateGetBalance } from '../../modules/wallet'
import { updateRpxBalance, refreshTokenBalance, participateInSale } from '../../modules/rpx'

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
  updateRpxBalance,
  participateInSale,
  refreshTokenBalance
}

const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(TokenSale)
