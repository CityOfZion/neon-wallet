// @flow
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { loadWalletData, getNEO, getGAS } from '../../modules/wallet'
import {
  participateInSale,
  getSaleBalance,
  updateSaleBalance
} from '../../modules/sale'
import { getWIF } from '../../modules/account'

import TokenSale from './TokenSale'

const mapStateToProps = (state: Object) => ({
  NEO: getNEO(state),
  GAS: getGAS(state),
  saleBalance: getSaleBalance(state)
})

const actionCreators = {
  loadWalletData,
  participateInSale,
  updateSaleBalance
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(actionCreators, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(TokenSale)
