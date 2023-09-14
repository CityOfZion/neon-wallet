// @flow
import React from 'react'
import { FormattedMessage } from 'react-intl'
import { compose, withState } from 'recompose'

import PriceHistoryPanel from './PriceHistoryPanel'
// import priceHistoryPanelActions from '../../../actions/priceHistoryPanelActions'
// import priceHistoryActions from '../../../actions/priceHistoryActions'
import withProgressPanel from '../../../hocs/withProgressPanel'
import withPricesData from '../../../hocs/withPricesData'
import { ASSETS } from '../../../core/constants'
import withSettingsContext from '../../../hocs/withSettingsContext'
import withPriceHistoryData from '../../../hocs/withPriceHistoryData'

type Duration = '1m' | '1w' | '1d'

const mapPriceHistoryDataToProps = (prices, props) => ({
  prices: Array.isArray(prices[(props?.asset)]) ? prices[(props?.asset)] : [],
})

const mapPriceDataToProps = (staticPrices, props) =>
  console.log({ staticPrices, props }) || {
    staticPrice: staticPrices[(props?.asset)],
  }

// const mapPriceHistoryActionsToProps = (actions, props) => ({
//   setDuration: (duration: Duration) => {
//     props.setDuration(duration)
//     return actions.call({ duration, currency: props.currency })
//   },
// })

export default compose(
  // Refetch price history if the selected asset or duration changes
  withState('asset', 'setAsset', ASSETS.NEO),
  withState('duration', 'setDuration', '1d'),
  // withActions(priceHistoryActions, mapPriceHistoryActionsToProps),
  // // Fetch prices data based based upon the selected currency.  Reload data with the currency changes.
  // withProgressPanel(priceHistoryPanelActions, {
  //   title: <FormattedMessage id="dashboardMarketDataLabel" />,
  // }),

  withPriceHistoryData(mapPriceHistoryDataToProps),
  withPricesData(mapPriceDataToProps),

  // withData(priceHistoryActions, mapPriceHistoryDataToProps),

  withSettingsContext,
)(PriceHistoryPanel)
