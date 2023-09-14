import { compose, withProps } from 'recompose'
import {
  withActions,
  withProgressComponents,
  recentlyCompletedStrategy,
  progressValues,
} from 'spunky'

import LoadingPanel from '../components/LoadingPanel'

const { LOADING, FAILED } = progressValues

const mapActionsToProps = (action, props) => ({
  onRetry: () => action.call(props),
})

export default function withProgressPanel(
  actions,
  { title, strategy = recentlyCompletedStrategy, ...options } = {},
) {
  const Loading = withProps({ title })(LoadingPanel)

  return compose(
    withActions(actions, mapActionsToProps),
    withProgressComponents(
      actions,
      {
        [LOADING]: Loading,
      },
      {
        strategy,
        ...options,
      },
    ),
  )
}
