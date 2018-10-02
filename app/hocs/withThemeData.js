// @flow
import { withData } from 'spunky'

import { DEFAULT_THEME } from '../core/constants'
import settingsActions from '../actions/settingsActions'

export default function withThemeData() {
  const mapSettingsDataToProps = settings => ({
    theme: settings.theme
  })
  return withData(settingsActions, mapSettingsDataToProps)
}
