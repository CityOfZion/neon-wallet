// @flow
import { compose } from 'recompose'
import { withData } from 'spunky'

import Header from './Header'
import withAuthData from '../../../hocs/withAuthData'
import withCurrencyData from '../../../hocs/withCurrencyData'
import pricesActions from '../../../actions/pricesActions'

const mapPricesDataToProps = ({ NEO, GAS }) => ({
  neoPrice: NEO,
  gasPrice: GAS
})

export default compose(
  withData(pricesActions, mapPricesDataToProps),
  withAuthData(),
  withCurrencyData('currencyCode')
)(Header)
