// @flow
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { loadWalletData, getNEO } from '../../modules/wallet'
import {
  updateRpxBalance,
  refreshTokenBalance,
  participateInSale
} from '../../modules/sale'
import { getWIF } from '../../modules/account'
import { getBlockExplorer } from '../../modules/metadata'

import TokenSale from './TokenSale'

const mapStateToProps = (state: Object) => ({
  explorer: getBlockExplorer(state),
  wif: getWIF(state),
  NEO: getNEO(state),
  GAS: getGAS(state)
})

const actionCreators = {
  loadWalletData,
  participateInSale
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(actionCreators, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(TokenSale)
