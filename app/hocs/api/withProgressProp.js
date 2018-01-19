// @flow
import { get } from 'lodash'
import { connect, type MapStateToProps } from 'react-redux'
import { compose, setDisplayName, wrapDisplayName } from 'recompose'

import { type Actions } from '../../values/api'
import { INITIAL, type ProgressState } from '../../values/state'

const PROGRESS_PROP: string = '__progress__'

export default function withProgressProp (actions: Actions, propName: string = PROGRESS_PROP) {
  const mapProgressToProps = (progressState: ProgressState) => ({ [propName]: progressState })

  const mapStateToProps: MapStateToProps<*, *, *> = (state: Object): Object => {
    const progressState = get(state, `api.${actions.id}.state`) || INITIAL
    return mapProgressToProps(progressState)
  }

  return (Component: Class<React.Component<*>>) => {
    return compose(
      connect(mapStateToProps),
      setDisplayName(wrapDisplayName(Component, 'withProgressProp'))
    )(Component)
  }
}
