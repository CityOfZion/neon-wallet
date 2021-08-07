// @flow
import { compose } from 'recompose'
import { values, omit } from 'lodash-es'

import N3Fees from './N3Fees'
import withBalancesData from '../../../hocs/withBalancesData'
import withCurrencyData from '../../../hocs/withCurrencyData'
import withPricesData from '../../../hocs/withPricesData'

const mapBalanceDataToProps = balances => ({
  GAS: balances.GAS,
})

const mapPricesDataToProps = ({ GAS }) => ({
  gasPrice: GAS,
})

export default compose(
  withCurrencyData('currencyCode'),
  withPricesData(mapPricesDataToProps),
  withBalancesData(mapBalanceDataToProps),
)(N3Fees)
