// @flow
import withData from './api/withData'
import settingsActions from '../actions/settingsActions'

export default function withExplorerData (key: string = 'explorer') {
  const mapSettingsDataToProps = (settings) => ({ [key]: settings.blockExplorer })
  return withData(settingsActions, mapSettingsDataToProps)
}
