// @flow
import { get, mapValues } from 'lodash'
import { connect, type MapStateToProps } from 'react-redux'
import { compose, setDisplayName, wrapDisplayName } from 'recompose'

import { type Error, type Actions, type ActionStateMap } from '../../values/api'

type Options = {
  prefix: string
}

const mapRequestErrorToProps: Function = (error: Error): any => error

const mapBatchErrorToProps: Function = (state: Object, id: string, mapping: ActionStateMap, prefix: string): Object => {
  return mapValues(mapping, (key) => mapErrorToProps(state, key, prefix))
}

const mapErrorToProps: Function = (state: Object, id: string, prefix: string): any => {
  const actionState = get(state, `${prefix}.${id}`)

  if (!actionState) {
    return null
  } else if (actionState.batch) {
    return mapBatchErrorToProps(state, id, actionState.mapping, prefix)
  } else {
    return mapRequestErrorToProps(actionState.error)
  }
}

const defaultMapper = mapRequestErrorToProps

export default function withError (
  actions: Actions,
  mapper: Function = defaultMapper,
  { prefix = 'api' }: Options = {}
): Class<React.Component<*>> {
  const mapStateToProps: MapStateToProps<*, *, *> = (state: Object, ownProps: Object): Object => {
    return mapper(mapErrorToProps(state, actions.id, prefix), ownProps)
  }

  return (Component: Class<React.Component<*>>) => {
    return compose(
      connect(mapStateToProps),
      setDisplayName(wrapDisplayName(Component, 'withError'))
    )(Component)
  }
}
