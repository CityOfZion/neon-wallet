// @flow
import { withData } from 'spunky'

import settingsActions from '../actions/settingsActions'

export default function withSoundEnabledData() {
  const mapSettingsDataToProps = settings => ({
    soundEnabled: settings && settings.soundEnabled
  })
  return withData(settingsActions, mapSettingsDataToProps)
}
