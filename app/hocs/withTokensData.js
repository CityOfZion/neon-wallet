// @flow
import { withData, withRecall, withReset } from 'spunky'
import { compose } from 'recompose'

import settingsActions from '../actions/settingsActions'
import icoTokensActions from '../actions/icoTokensActions'
import balancesActions from '../actions/balancesActions'

export default function withTokensData(key: string = 'tokens') {
  return compose(
    withData(settingsActions, settings => ({ [key]: settings.tokens })),
    withRecall(icoTokensActions, ['tokens']),
    withReset(balancesActions, ['tokens'])
  )
}
