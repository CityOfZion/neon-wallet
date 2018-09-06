// @flow
import { withData } from 'spunky'

import settingsActions from '../actions/settingsActions'

export default function withThemeData() {
  const mapSettingsDataToProps = settings => ({
    theme: settings.theme
  })
  return withData(settingsActions, mapSettingsDataToProps)
}
