// @flow
import { compose, withState } from 'recompose'

import PriceHistoryPanel from './PriceHistoryPanel'
import priceHistoryActions from '../../../actions/priceHistoryActions'
import withData from '../../../hocs/api/withData'
import withActions from '../../../hocs/api/withActions'
import withCurrencyData from '../../../hocs/withCurrencyData'
import { ASSETS } from '../../../core/constants'

type Duration = '1m' | '1w' | '1d'

const mapPricesDataToProps = (prices, props) => ({
  prices: prices[props.asset]
})

const mapPriceHistoryActionsToProps = (actions, props) => ({
  setDuration: (duration: Duration) => {
    props.setDuration(duration)
    return actions.request({ duration, currency: props.currency })
  }
})

export default compose(
  withState('asset', 'setAsset', ASSETS.NEO),
  withState('duration', 'setDuration', '1m'),
  withData(priceHistoryActions, mapPricesDataToProps),
  withCurrencyData(),
  withActions(priceHistoryActions, mapPriceHistoryActionsToProps)
)(PriceHistoryPanel)
