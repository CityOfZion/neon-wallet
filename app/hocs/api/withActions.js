// @flow
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { compose, setDisplayName, wrapDisplayName } from 'recompose'

import { type Actions } from '../../values/api'

const defaultMapActionsToProps = (actions: Actions, props: Object): Object => ({
  request: actions.request,
  retry: actions.retry,
  cancel: actions.cancel,
  reset: actions.reset
})

const createMapDispatchToProps = (actions: Actions, mapActionsToProps: Function): Object => {
  return (dispatch, props) => bindActionCreators(mapActionsToProps(actions, props), dispatch)
}

export default function withActions (actions: Actions, mapActionsToProps: Function = defaultMapActionsToProps): Class<React.Component<*>> {
  const mapDispatchToProps = createMapDispatchToProps(actions, mapActionsToProps)

  return (Component: Class<React.Component<*>>) => {
    return compose(
      connect(null, mapDispatchToProps),
      setDisplayName(wrapDisplayName(Component, 'withActions'))
    )(Component)
  }
}
