// @flow
import { connect, type MapStateToProps } from 'react-redux'
import { bindActionCreators } from 'redux'
import { compose } from 'recompose'

import pricesActions from '../../actions/pricesActions'
import withData from '../../hocs/api/withData'
import withActions from '../../hocs/api/withActions'
import withNetworkData from '../../hocs/withNetworkData'
import withAccountData from '../../hocs/withAccountData'
import withCurrencyData from '../../hocs/withCurrencyData'
import { updateSettingsActions } from '../../actions/settingsActions'
import { getNetworks } from '../../core/networks'
import { showErrorNotification, showSuccessNotification } from '../../modules/notifications'
import { loadWalletData, getNEO, getGAS, getTokenBalances } from '../../modules/wallet'
import { showModal } from '../../modules/modal'
import { participateInSale, oldParticipateInSale } from '../../modules/sale'

import WalletInfo from './WalletInfo'

const mapStateToProps: MapStateToProps<*, *, *> = (state: Object) => ({
  NEO: getNEO(state),
  GAS: getGAS(state),
  tokenBalances: getTokenBalances(state),
  networks: getNetworks()
})

const mapPricesDataToProps = ({ NEO, GAS }) => ({
  neoPrice: NEO,
  gasPrice: GAS
})

const actionCreators = {
  loadWalletData,
  showErrorNotification,
  showSuccessNotification,
  showModal,
  participateInSale,
  oldParticipateInSale
}

const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch)

const mapActionsToProps = (actions) => ({
  setUserGeneratedTokens: (tokens) => actions.request({ tokens })
})

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withData(pricesActions, mapPricesDataToProps),
  withNetworkData(),
  withAccountData(),
  withCurrencyData('currencyCode'),
  withActions(updateSettingsActions, mapActionsToProps)
)(WalletInfo)
