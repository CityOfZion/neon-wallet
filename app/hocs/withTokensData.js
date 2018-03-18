// @flow
import { withData } from 'spunky'

import settingsActions from '../actions/settingsActions'

export default function withTokensData (key: string = 'tokens') {
  return withData(settingsActions, (settings) => ({ [key]: settings.tokens }))
}
