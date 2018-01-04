// @flow
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { loadWalletData, getNEO } from '../../modules/wallet'
import { participateInSale } from '../../modules/sale'

import TokenSale from './TokenSale'

const mapStateToProps = (state: Object) => ({
  NEO: getNEO(state)
})

const actionCreators = {
  loadWalletData,
  participateInSale
}

const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(TokenSale)
