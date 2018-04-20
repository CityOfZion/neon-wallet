// @flow
import { compose } from 'recompose'
import { withData } from 'spunky'

import withSettingsCall from './withSettingsCall'
import settingsActions from '../actions/settingsActions'

export default function withExplorerData (key: string = 'explorer') {
  const mapSettingsDataToProps = (settings) => ({ [key]: settings.blockExplorer })

  return compose(
    withSettingsCall(),
    withData(settingsActions, mapSettingsDataToProps)
  )
}
