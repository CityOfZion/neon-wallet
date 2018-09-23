// @flow
import { compose } from 'recompose'
import { withData, withReset } from 'spunky'

import withCurrencyData from './withCurrencyData'
import withInitialCall from './withInitialCall'
import pricesActions from '../actions/pricesActions'

export default function withPricesData(mapPricesDataToProps: Function | void) {
  return compose(
    withCurrencyData('currencyCode'),
    withInitialCall(pricesActions),
    withReset(pricesActions, ['currencyCode']),
    withData(pricesActions, mapPricesDataToProps)
  )
}
