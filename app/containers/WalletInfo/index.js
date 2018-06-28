// @flow
import { connect, type MapStateToProps } from 'react-redux'
import { bindActionCreators } from 'redux'
import { compose } from 'recompose'
import { get } from 'lodash'
import { withData, withActions } from 'spunky'

import accountActions from '../../actions/accountActions'
import pricesActions from '../../actions/pricesActions'
import withNetworkData from '../../hocs/withNetworkData'
import withAuthData from '../../hocs/withAuthData'
import withCurrencyData from '../../hocs/withCurrencyData'
import withFilteredTokensData from '../../hocs/withFilteredTokensData'
import withSuccessNotification from '../../hocs/withSuccessNotification'
import withFailureNotification from '../../hocs/withFailureNotification'
import { updateSettingsActions } from '../../actions/settingsActions'
import { getNetworks } from '../../core/networks'
import { showModal } from '../../modules/modal'
import { participateInSale } from '../../modules/sale'

import WalletInfo from './WalletInfo'

const mapStateToProps: MapStateToProps<*, *, *> = (state: Object) => ({
  networks: getNetworks()
})

const mapPricesDataToProps = (
  prices: ?Prices
): {
  neoPrice: ?number,
  gasPrice: ?number
} => ({
  neoPrice: get(prices, 'NEO'),
  gasPrice: get(prices, 'GAS')
})

const actionCreators = {
  showModal,
  participateInSale
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(actionCreators, dispatch)

const mapSettingsActionsToProps = actions => ({
  setUserGeneratedTokens: tokens => actions.call({ tokens })
})

const mapAccountActionsToProps = (actions, props) => ({
  loadWalletData: () =>
    actions.call({
      net: props.net,
      address: props.address,
      tokens: props.tokens
    })
})

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withData(pricesActions, mapPricesDataToProps),
  withNetworkData(),
  withAuthData(),
  withCurrencyData('currencyCode'),
  withFilteredTokensData(),
  withActions(updateSettingsActions, mapSettingsActionsToProps),
  withActions(accountActions, mapAccountActionsToProps),
  withSuccessNotification(
    accountActions,
    'Received latest blockchain information.'
  ),
  withFailureNotification(
    accountActions,
    'Failed to retrieve blockchain information.'
  )
)(WalletInfo)
