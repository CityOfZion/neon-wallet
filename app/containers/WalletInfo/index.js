// @flow
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { showErrorNotification, showSuccessNotification } from '../../modules/notifications'
import { getAddress } from '../../modules/account'
import {
  getNetwork,
  getNetworks,
  getAllTokens,
  setUserGeneratedTokens,
  getNetworkId
} from '../../modules/metadata'
import {
  loadWalletData,
  getNEO,
  getGAS,
  getTokenBalances
} from '../../modules/wallet'
import { getNEOPrice, getGASPrice, getCurrency } from '../../modules/price'
import { showModal } from '../../modules/modal'
import { participateInSale, oldParticipateInSale } from '../../modules/sale'

import WalletInfo from './WalletInfo'

const mapStateToProps = (state: Object) => ({
  NEO: getNEO(state),
  GAS: getGAS(state),
  address: getAddress(state),
  net: getNetwork(state),
  neoPrice: getNEOPrice(state),
  gasPrice: getGASPrice(state),
  tokenBalances: getTokenBalances(state),
  currencyCode: getCurrency(state),
  networks: getNetworks(state),
  allTokens: getAllTokens(state),
  networkId: getNetworkId(state)
})

const actionCreators = {
  loadWalletData,
  showErrorNotification,
  showSuccessNotification,
  showModal,
  participateInSale,
  oldParticipateInSale,
  setUserGeneratedTokens
}

const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(WalletInfo)
