// @flow
import { compose } from 'recompose'
import { withRouter } from 'react-router-dom'

import Sidebar from './Sidebar'
import withData from '../../../hocs/api/withData'
import withCurrencyData from '../../../hocs/withCurrencyData'
import pricesActions from '../../../actions/pricesActions'

const mapPricesDataToProps = ({ NEO, GAS }) => ({
  neoPrice: NEO,
  gasPrice: GAS
})

export default compose(
  withRouter,
  withData(pricesActions, mapPricesDataToProps),
  withCurrencyData('currencyCode')
)(Sidebar)
