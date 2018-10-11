// @flow
import { compose, withState } from 'recompose'
import { withData, withActions } from 'spunky'

import PriceHistoryPanel from './PriceHistoryPanel'
import priceHistoryPanelActions from '../../../actions/priceHistoryPanelActions'
import priceHistoryActions from '../../../actions/priceHistoryActions'
import withCurrencyData from '../../../hocs/withCurrencyData'
import withProgressPanel from '../../../hocs/withProgressPanel'
import withPricesData from '../../../hocs/withPricesData'
import { ASSETS } from '../../../core/constants'

type Duration = '1m' | '1w' | '1d'

const mapPriceHistoryDataToProps = (prices, props) => ({
  prices: prices[props.asset]
})

const mapPriceDataToProps = (staticPrices, props) => ({
  staticPrice: staticPrices[props.asset]
})

const mapPriceHistoryActionsToProps = (actions, props) => ({
  setDuration: (duration: Duration) => {
    props.setDuration(duration)
    return actions.call({ duration, currency: props.currency })
  }
})

export default compose(
  // Refetch price history if the selected asset or duration changes
  withState('asset', 'setAsset', ASSETS.NEO),
  withState('duration', 'setDuration', '1m'),
  withActions(priceHistoryActions, mapPriceHistoryActionsToProps),

  // Fetch prices data based based upon the selected currency.  Reload data with the currency changes.
  withProgressPanel(priceHistoryPanelActions, { title: 'Market Data' }),
  withCurrencyData('currency'),
  withPricesData(mapPriceDataToProps),
  withData(priceHistoryActions, mapPriceHistoryDataToProps)
)(PriceHistoryPanel)
