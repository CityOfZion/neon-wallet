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
  getNEOPrice,
  getGASPrice,
  getTokens,
  retrieveTokenInfo
} from '../../modules/wallet'
import { showModal } from '../../modules/modal'

import WalletInfo from './WalletInfo'

const mapStateToProps = (state: Object) => ({
  neo: getNEO(state),
  gas: getGAS(state),
  address: getAddress(state),
  net: getNetwork(state),
  neoPrice: getNEOPrice(state),
  gasPrice: getGASPrice(state),
  tokens: getTokens(state)
})

const actionCreators = {
  loadWalletData,
  showErrorNotification,
  showSuccessNotification,
  showModal,
  retrieveTokenInfo
}

const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(WalletInfo)
