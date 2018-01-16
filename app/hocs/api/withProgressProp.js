// @flow
import { get, map, castArray } from 'lodash'
import { connect, type MapStateToProps } from 'react-redux'
import { compose, setDisplayName, wrapDisplayName } from 'recompose'

import defaultStrategy from './progressStrategies/defaultStrategy'
import { type Actions, type ActionState } from '../../values/api'
import { type ProgressState } from '../../values/state'

const PROGRESS_PROP: string = '__progress__'

type Options = {
  strategy?: (Array<Object>) => ProgressState,
  prefix?: string,
  propName?: string
}

export default function withProgressProp (
  actions: Actions,
  { strategy = defaultStrategy, prefix = 'api', propName = PROGRESS_PROP }: Options = {}
) {
  const mapProgressToProps = (actionStates: Array<ActionState>) => ({ [propName]: strategy(actionStates) })

  const mapStateToProps: MapStateToProps<*, *, *> = (state: Object): Object => {
    const actionState = get(state, `${prefix}.${actions.id}`)

    // TODO: this doesn't account for batch within a batch, need to make this recursive
    const actionStates: Array<ActionState> = actionState.batch
      ? map(actionState.mapping, (key) => get(state, `${prefix}.${key}`))
      : castArray(actionState)

    return mapProgressToProps(actionStates)
  }

  return (Component: Class<React.Component<*>>) => {
    return compose(
      connect(mapStateToProps),
      setDisplayName(wrapDisplayName(Component, 'withProgressProp'))
    )(Component)
  }
}
