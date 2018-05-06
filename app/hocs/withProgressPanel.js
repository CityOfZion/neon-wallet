import { withProps } from 'recompose'
import { withProgressComponents, alreadyLoadedStrategy, progressValues } from 'spunky'

import LoadingPanel from '../components/LoadingPanel'
import FailedPanel from '../components/FailedPanel'

const { LOADING, FAILED } = progressValues

export default function withProgressPanel (actions, { title, strategy = alreadyLoadedStrategy, ...options } = {}) {
  const Loading = withProps({ title })(LoadingPanel)
  const Failed = withProps({ title })(FailedPanel)

  return withProgressComponents(actions, {
    [LOADING]: Loading,
    [FAILED]: Failed
  }, {
    strategy,
    ...options
  })
}
