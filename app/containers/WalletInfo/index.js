// @flow
import { connect, type MapStateToProps } from 'react-redux'
import { bindActionCreators } from 'redux'
import { compose } from 'recompose'
import { values, omit } from 'lodash'

import pricesActions from '../../actions/pricesActions'
import balancesActions from '../../actions/balancesActions'
import withData from '../../hocs/api/withData'
import withActions from '../../hocs/api/withActions'
import withNetworkData from '../../hocs/withNetworkData'
import withAuthData from '../../hocs/withAuthData'
import withCurrencyData from '../../hocs/withCurrencyData'
import withFilteredTokensData from '../../hocs/withFilteredTokensData'
import { updateSettingsActions } from '../../actions/settingsActions'
import { getNetworks } from '../../core/networks'
import { showErrorNotification, showSuccessNotification } from '../../modules/notifications'
import { loadWalletData } from '../../modules/wallet'
import { showModal } from '../../modules/modal'
import { participateInSale, oldParticipateInSale } from '../../modules/sale'

import WalletInfo from './WalletInfo'

const mapStateToProps: MapStateToProps<*, *, *> = (state: Object) => ({
  networks: getNetworks()
})

const mapBalanceDataToProps = (balances) => ({
  NEO: balances.NEO,
  GAS: balances.GAS,
  tokenBalances: values(omit(balances, 'NEO', 'GAS'))
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
  withData(balancesActions, mapBalanceDataToProps),
  withNetworkData(),
  withAuthData(),
  withCurrencyData('currencyCode'),
  withFilteredTokensData(),
  withActions(updateSettingsActions, mapActionsToProps)
)(WalletInfo)
