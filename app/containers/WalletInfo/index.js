// @flow
import { connect, type MapStateToProps } from 'react-redux'
import { bindActionCreators } from 'redux'
import { compose } from 'recompose'

import withNetworkData from '../../hocs/withNetworkData'
import { getNetworks } from '../../core/networks'
import { showErrorNotification, showSuccessNotification } from '../../modules/notifications'
import { getAddress } from '../../modules/account'
import { getAllTokens, setUserGeneratedTokens } from '../../modules/metadata'
import { loadWalletData, getNEO, getGAS, getTokenBalances } from '../../modules/wallet'
import { getNEOPrice, getGASPrice, getCurrency } from '../../modules/price'
import { showModal } from '../../modules/modal'
import { participateInSale, oldParticipateInSale } from '../../modules/sale'

import WalletInfo from './WalletInfo'

const mapStateToProps: MapStateToProps<*, *, *> = (state: Object) => ({
  NEO: getNEO(state),
  GAS: getGAS(state),
  address: getAddress(state),
  neoPrice: getNEOPrice(state),
  gasPrice: getGASPrice(state),
  tokenBalances: getTokenBalances(state),
  currencyCode: getCurrency(state),
  networks: getNetworks(),
  allTokens: getAllTokens(state)
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

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withNetworkData()
)(WalletInfo)
