// @flow
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { loadWalletData, getNEO } from '../../modules/wallet'
import { updateRpxBalance, refreshTokenBalance, participateInSale } from '../../modules/sale'
import { getWIF, getAddress } from '../../modules/account'
import { getBlockExplorer, getNetwork } from '../../modules/metadata'

import TokenSale from './TokenSale'

const mapStateToProps = (state: Object) => ({
  explorer: getBlockExplorer(state),
  wif: getWIF(state),
  neo: getNEO(state),
  net: getNetwork(state),
  address: getAddress(state)
})

const actionCreators = {
  loadWalletData,
  updateRpxBalance,
  participateInSale,
  refreshTokenBalance
}

const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(TokenSale)
