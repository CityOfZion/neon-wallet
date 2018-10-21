// @flow
import { withData } from 'spunky'

import { DEFAULT_THEME } from '../core/constants'
import settingsActions from '../actions/settingsActions'

export default function withThemeData() {
  const mapSettingsDataToProps = settings => ({
    theme: settings.theme || DEFAULT_THEME
  })
  return withData(settingsActions, mapSettingsDataToProps)
}
