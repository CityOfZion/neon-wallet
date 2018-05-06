// @flow
import { compose, withState } from 'recompose'
import { withData, withActions } from 'spunky'

import PriceHistoryPanel from './PriceHistoryPanel'
import priceHistoryActions from '../../../actions/priceHistoryActions'
import withCurrencyData from '../../../hocs/withCurrencyData'
import withProgressPanel from '../../../hocs/withProgressPanel'
import { ASSETS } from '../../../core/constants'

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
  // Refetch price history if the selected asset or duration changes
  withState('asset', 'setAsset', ASSETS.NEO),
  withState('duration', 'setDuration', '1m'),
  withActions(priceHistoryActions, mapPriceHistoryActionsToProps),

  // Fetch prices data based based upon the selected currency.  Reload data with the currency changes.
  withProgressPanel(priceHistoryActions, { title: 'Historic Price' }),
  withCurrencyData('currency'),
  withData(priceHistoryActions, mapPricesDataToProps)
)(PriceHistoryPanel)
