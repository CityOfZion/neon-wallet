// @flow
import { withData } from 'spunky'

import settingsActions from '../actions/settingsActions'

export default function withCurrencyData (key: string = 'currency') {
  const mapSettingsDataToProps = (settings) => ({ [key]: settings.currency })
  return withData(settingsActions, mapSettingsDataToProps)
}
