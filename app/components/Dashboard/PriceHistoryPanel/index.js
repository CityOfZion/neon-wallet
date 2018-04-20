// @flow
import { compose, withState } from 'recompose'
import { withData, withActions, withProgressComponents, alreadyLoadedStrategy, progressValues } from 'spunky'

import PriceHistoryPanel from './PriceHistoryPanel'
import Loader from '../../Loader'
import Failed from '../../../containers/App/Failed'
import priceHistoryActions from '../../../actions/priceHistoryActions'
import withCurrencyData from '../../../hocs/withCurrencyData'
import withInitialCall from '../../../hocs/withInitialCall'
import { ASSETS } from '../../../core/constants'

const { LOADING, FAILED } = progressValues

type Duration = '1m' | '1w' | '1d'

const mapPricesDataToProps = (prices, props) => ({
  prices: prices[props.asset]
})

const mapPriceHistoryActionsToProps = (actions, props) => ({
  setDuration: (duration: Duration) => {
    props.setDuration(duration)
    actions.call({ duration, currency: props.currency })
  }
})

export default compose(
  // Fetch prices data based based upon the selected currency.  Reload data with the currency changes.
  withCurrencyData('currencyCode'),
  withInitialCall(priceHistoryActions),
  withProgressComponents(priceHistoryActions, {
    [LOADING]: Loader,
    [FAILED]: Failed
  }, {
    strategy: alreadyLoadedStrategy
  }),
  withData(priceHistoryActions, mapPricesDataToProps),

  // Refetch price history if the selected asset or duration changes
  withState('asset', 'setAsset', ASSETS.NEO),
  withState('duration', 'setDuration', '1m'),
  withActions(priceHistoryActions, mapPriceHistoryActionsToProps)
)(PriceHistoryPanel)
