// @flow
import {
  withData
} from 'spunky'

import settingsActions from '../actions/settingsActions'

export default function withThemeData(key: string = 'theme') {
  const mapSettingsDataToProps = settings => ({
    [key]: settings.theme
  })
  return withData(settingsActions, mapSettingsDataToProps)
}
