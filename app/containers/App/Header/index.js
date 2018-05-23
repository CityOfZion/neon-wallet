// @flow
import { get } from 'lodash'
import { compose } from 'recompose'
import { withData } from 'spunky'

import Header from './Header'
import withAuthData from '../../../hocs/withAuthData'
import withCurrencyData from '../../../hocs/withCurrencyData'
import pricesActions from '../../../actions/pricesActions'

const mapPricesDataToProps = (prices: ?Prices): {
  neoPrice: ?number,
  gasPrice: ?number
} => ({
  neoPrice: get(prices, 'NEO'),
  gasPrice: get(prices, 'GAS')
})

export default compose(
  withData(pricesActions, mapPricesDataToProps),
  withAuthData(),
  withCurrencyData('currencyCode')
)(Header)
