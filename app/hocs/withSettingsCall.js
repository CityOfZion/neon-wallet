// @flow
import { compose } from 'recompose'
import { withProgressComponents, progressValues } from 'spunky'

import withInitialCall from './withInitialCall'
import settingsActions from '../actions/settingsActions'
import DefaultLoading from '../components/Loader'
import DefaultFailed from '../containers/App/Failed'

const { LOADING, FAILED } = progressValues

type Options = {
  Loading: Class<React.Component<*>>,
  Failed: Class<React.Component<*>>
}

export default function withSettingsCall ({ Loading = DefaultLoading, Failed = DefaultFailed }: Options = {}) {
  return compose(
    withInitialCall(settingsActions),
    withProgressComponents(settingsActions, {
      [LOADING]: Loading,
      [FAILED]: Failed
    })
  )
}
