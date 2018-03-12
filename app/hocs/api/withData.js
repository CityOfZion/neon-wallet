// @flow
import { get, mapValues } from 'lodash'
import { connect, type MapStateToProps } from 'react-redux'
import { compose, setDisplayName, wrapDisplayName } from 'recompose'

import { type Data, type Actions, type ActionStateMap } from '../../values/api'

type Options = {
  prefix: string
}

const mapRequestDataToProps: Function = (data: Data): any => data

const mapBatchDataToProps: Function = (state: Object, id: string, mapping: ActionStateMap, prefix: string): Object => {
  return mapValues(mapping, (key) => mapDataToProps(state, key, prefix))
}

const mapDataToProps: Function = (state: Object, id: string, prefix: string): any => {
  const actionState = get(state, `${prefix}.${id}`)

  if (!actionState) {
    return null
  } else if (actionState.batch) {
    return mapBatchDataToProps(state, id, actionState.mapping, prefix)
  } else {
    return mapRequestDataToProps(actionState.data)
  }
}

const defaultMapper = mapRequestDataToProps

export default function withData (
  actions: Actions,
  mapper: Function = defaultMapper,
  { prefix = 'api' }: Options = {}
): Class<React.Component<*>> {
  const mapStateToProps: MapStateToProps<*, *, *> = (state: Object, ownProps: Object): Object => {
    return mapper(mapDataToProps(state, actions.id, prefix), ownProps)
  }

  return (Component: Class<React.Component<*>>) => {
    return compose(
      connect(mapStateToProps),
      setDisplayName(wrapDisplayName(Component, 'withData'))
    )(Component)
  }
}
