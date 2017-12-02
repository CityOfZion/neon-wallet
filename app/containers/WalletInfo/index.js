// @flow
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { showErrorNotification, showSuccessNotification } from '../../modules/notifications'
import { getAddress } from '../../modules/account'
import { getNetwork } from '../../modules/metadata'
import {
  loadWalletData,
  getNEO,
  getGAS,
  getTokens
} from '../../modules/wallet'
import { getNEOPrice, getGASPrice, getCurrency } from '../../modules/price'
import { showModal } from '../../modules/modal'

import WalletInfo from './WalletInfo'

const mapStateToProps = (state: Object) => ({
  NEO: getNEO(state),
  GAS: getGAS(state),
  address: getAddress(state),
  net: getNetwork(state),
  neoPrice: getNEOPrice(state),
  gasPrice: getGASPrice(state),
  tokens: getTokens(state),
  currencyCode: getCurrency(state)
})

const actionCreators = {
  loadWalletData,
  showErrorNotification,
  showSuccessNotification,
  showModal
}

const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(WalletInfo)
