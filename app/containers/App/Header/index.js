// @flow
import { compose } from 'recompose'

import Header from './Header'
import withData from '../../../hocs/api/withData'
import withAccountData from '../../../hocs/withAccountData'
import withCurrencyData from '../../../hocs/withCurrencyData'
import pricesActions from '../../../actions/pricesActions'

const mapPricesDataToProps = ({ NEO, GAS }) => ({
  neoPrice: NEO,
  gasPrice: GAS
})

export default compose(
  withData(pricesActions, mapPricesDataToProps),
  withAccountData(),
  withCurrencyData('currencyCode')
)(Header)
