// @flow
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import TokenSale from './TokenSale'
import { loadWalletData, getNEO } from '../../modules/wallet'
import { updateRpxBalance, refreshTokenBalance, participateInSale, getRPX } from '../../modules/rpx'
import { getWif, getAddress } from '../../modules/account'
import { getBlockExplorer, getNetwork } from '../../modules/metadata'

const mapStateToProps = (state: Object) => ({
  explorer: getBlockExplorer(state),
  wif: getWif(state),
  neo: getNEO(state),
  net: getNetwork(state),
  address: getAddress(state),
  rpx: getRPX(state)
})

const actionCreators = {
  loadWalletData,
  updateRpxBalance,
  participateInSale,
  refreshTokenBalance
}

const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(TokenSale)
