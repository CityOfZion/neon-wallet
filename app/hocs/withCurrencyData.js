// @flow
import { compose } from 'recompose'
import { withData } from 'spunky'

import withSettingsCall from './withSettingsCall'
import settingsActions from '../actions/settingsActions'

export default function withCurrencyData (key: string = 'currency') {
  const mapSettingsDataToProps = (settings) => ({ [key]: settings.currency })

  return compose(
    withSettingsCall(),
    withData(settingsActions, mapSettingsDataToProps)
  )
}
