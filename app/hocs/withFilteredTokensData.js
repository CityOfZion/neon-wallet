// @flow
import { compose } from 'recompose'
import { withData } from 'spunky'

import withNetworkData from './withNetworkData'
import withSettingsCall from './withSettingsCall'
import settingsActions from '../actions/settingsActions'

export default function withFilteredTokensData (key: string = 'tokens') {
  const mapSettingsDataToProps = (settings, props: Object) => ({
    [key]: settings.tokens.filter(({ networkId }) => networkId === props.networkId)
  })

  return compose(
    withNetworkData(),
    withSettingsCall(),
    withData(settingsActions, mapSettingsDataToProps)
  )
}
