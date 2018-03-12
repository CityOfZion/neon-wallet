// @flow
import { compose } from 'recompose'

import withData from './api/withData'
import withNetworkData from './withNetworkData'
import settingsActions from '../actions/settingsActions'

export default function withFilteredTokensData (key: string = 'tokens') {
  const mapSettingsDataToProps = (settings, props: Object) => ({
    [key]: settings.tokens.filter(({ networkId }) => networkId === props.networkId)
  })

  return compose(
    withNetworkData(),
    withData(settingsActions, mapSettingsDataToProps)
  )
}
