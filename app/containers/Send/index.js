import { compose } from 'recompose'
import { values, omit } from 'lodash'
import { withData } from 'spunky'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Send from './Send'

import { sendTransaction } from '../../modules/transactions'

import withPricesData from '../../hocs/withPricesData'
import withNetworkData from '../../hocs/withNetworkData'
import withAuthData from '../../hocs/withAuthData'
import withBalancesData from '../../hocs/withBalancesData'
import withCurrencyData from '../../hocs/withCurrencyData'
import withFilteredTokensData from '../../hocs/withFilteredTokensData'
import contactsActions from '../../actions/contactsActions'

const mapDispatchToProps = dispatch =>
  bindActionCreators({ sendTransaction }, dispatch)

const filterSendableAssets = balances => {
  const sendableAssets = {}
  if (Number(balances.NEO > 0)) {
    sendableAssets.NEO = { symbol: 'NEO', balance: balances.NEO }
  }

  if (Number(balances.GAS > 0)) {
    sendableAssets.GAS = { symbol: 'GAS', balance: balances.GAS }
  }

  values(omit(balances, 'NEO', 'GAS'))
    .filter(token => token.balance > 0)
    .forEach(token => {
      sendableAssets[token.symbol] = {
        symbol: token.symbol,
        balance: token.balance
      }
    })

  return sendableAssets
}

const mapPricesDataToProps = prices => ({
  prices
})

const mapContactsDataToProps = (contacts: Object) => ({ contacts })

const mapBalanceDataToProps = balances => ({
  NEO: balances.NEO,
  GAS: balances.GAS,
  tokenBalances: values(omit(balances, 'NEO', 'GAS')),
  sendableAssets: filterSendableAssets(balances)
})

export default compose(
  connect(
    null,
    mapDispatchToProps
  ),
  withBalancesData(mapBalanceDataToProps),
  withCurrencyData('currencyCode'),
  withData(contactsActions, mapContactsDataToProps),
  withPricesData(mapPricesDataToProps),
  withNetworkData(),
  withAuthData(),
  withFilteredTokensData()
)(Send)
