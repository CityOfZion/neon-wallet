// @flow
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import WalletInfo from './WalletInfo'
import { showErrorNotification, showSuccessNotification } from '../../modules/notifications'
import { getAddress } from '../../modules/account'
import { getNetwork } from '../../modules/metadata'
import {
  loadWalletData,
  getNEO,
  getGAS,
  getNEOPrice,
  getGASPrice,
  getTokens
} from '../../modules/wallet'
import { showModal } from '../../modules/modal'

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
  showModal
}

const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(WalletInfo)
