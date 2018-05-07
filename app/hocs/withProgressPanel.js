import { compose, withProps } from 'recompose'
import { withActions, withProgressComponents, alreadyLoadedStrategy, progressValues } from 'spunky'

import LoadingPanel from '../components/LoadingPanel'
import FailedPanel from '../components/FailedPanel'

const { LOADING, FAILED } = progressValues

const mapActionsToProps = (action, props) => ({
  onRetry: () => action.call(props)
})

export default function withProgressPanel (actions, { title, strategy = alreadyLoadedStrategy, ...options } = {}) {
  const Loading = withProps({ title })(LoadingPanel)
  const Failed = withProps((props) => ({ title, onRetry: props.onRetry }))(FailedPanel)

  return compose(
    withActions(actions, mapActionsToProps),
    withProgressComponents(actions, {
      [LOADING]: Loading,
      [FAILED]: Failed
    }, {
      strategy,
      ...options
    })
  )
}
