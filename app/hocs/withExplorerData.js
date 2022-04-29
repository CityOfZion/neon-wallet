// @flow
import { withData } from 'spunky'

import settingsActions from '../actions/settingsActions'
import { DEFAULT_EXPLORER } from '../core/constants'

export default function withExplorerData(key: string = 'explorer') {
  const mapSettingsDataToProps = settings => ({
    [key]: settings.blockExplorer || DEFAULT_EXPLORER,
  })
  return withData(settingsActions, mapSettingsDataToProps)
}
