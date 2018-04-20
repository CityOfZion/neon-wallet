// @flow
import { compose } from 'recompose'
import { withData, withReset, withProgressComponents, alreadyLoadedStrategy, progressValues } from 'spunky'

import withCurrencyData from './withCurrencyData'
import withInitialCall from './withInitialCall'
import pricesActions from '../actions/pricesActions'
import Loader from '../components/Loader'
import Failed from '../containers/App/Failed'

const { LOADING, FAILED } = progressValues

export default function withPricesData (mapPricesDataToProps: Function) {
  return compose(
    withCurrencyData('currencyCode'),
    withInitialCall(pricesActions),
    withReset(pricesActions, ['currencyCode']),
    withProgressComponents(pricesActions, {
      [LOADING]: Loader,
      [FAILED]: Failed
    }, {
      strategy: alreadyLoadedStrategy
    }),
    withData(pricesActions, mapPricesDataToProps)
  )
}
