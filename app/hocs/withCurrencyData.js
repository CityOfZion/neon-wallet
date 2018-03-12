// @flow
import withData from './api/withData'
import settingsActions from '../actions/settingsActions'

export default function withCurrencyData (key: string = 'currency') {
  const mapSettingsDataToProps = (settings) => ({ [key]: settings.currency })
  return withData(settingsActions, mapSettingsDataToProps)
}
