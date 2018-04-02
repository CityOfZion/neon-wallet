// @flow
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { compose } from 'recompose'
import { values, omit, filter } from 'lodash'
import { withData, withActions } from 'spunky'

import accountActions from '../../actions/accountActions'
import pricesActions from '../../actions/pricesActions'
import balancesActions from '../../actions/balancesActions'
import withAuthData from '../../hocs/withAuthData'
import withCurrencyData from '../../hocs/withCurrencyData'
import withFilteredTokensData from '../../hocs/withFilteredTokensData'
import withSuccessNotification from '../../hocs/withSuccessNotification'
import withFailureNotification from '../../hocs/withFailureNotification'
import { showModal } from '../../modules/modal'
import { participateInSale } from '../../modules/sale'

import WalletInfo from './WalletInfo'

const getTokenBalances = (balances) => {
  const tokens = values(omit(balances, 'NEO', 'GAS'))
  return filter(tokens, (token) => token.balance !== '0')
}

const mapBalanceDataToProps = (balances) => ({
  NEO: balances.NEO,
  GAS: balances.GAS,
  tokenBalances: getTokenBalances(balances)
})

const mapPricesDataToProps = ({ NEO, GAS }) => ({
  neoPrice: NEO,
  gasPrice: GAS
})

const actionCreators = {
  showModal,
  participateInSale
}

const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch)

const mapAccountActionsToProps = (actions, props) => ({
  loadWalletData: () => actions.call({ net: props.net, address: props.address, tokens: props.tokens })
})

export default compose(
  connect(null, mapDispatchToProps),
  withData(pricesActions, mapPricesDataToProps),
  withData(balancesActions, mapBalanceDataToProps),
  withAuthData(),
  withCurrencyData('currencyCode'),
  withFilteredTokensData(),
  withActions(accountActions, mapAccountActionsToProps),
  withSuccessNotification(accountActions, 'Received latest blockchain information.'),
  withFailureNotification(accountActions, 'Failed to retrieve blockchain information.')
)(WalletInfo)
