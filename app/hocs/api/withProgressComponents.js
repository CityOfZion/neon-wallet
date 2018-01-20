// @flow
import React from 'react'
import { compose, setDisplayName, wrapDisplayName } from 'recompose'

import withProgressProp from './withProgressProp'
import withoutProps from '../withoutProps'
import { type Actions } from '../../values/api'
import { type ProgressState } from '../../values/state'

type Props = {
  [key: string]: ProgressState
}

type Mapping = {
  [key: ProgressState]: Class<React.Component<*>>
}

const PROGRESS_PROP: string = '__progress__'

export default function withProgressComponents (actions: Actions, mapping: Mapping = {}, propName: string = PROGRESS_PROP) {
  return (Component: Class<React.Component<*>>): Class<React.Component<*>> => {
    class ComponentWithProgressComponents extends React.Component<Props> {
      static displayName = 'ComponentWithProgressComponents'

      render = () => {
        const MappedComponent = mapping[this.props[propName]] || Component
        const WrappedComponent = withoutProps(propName)(MappedComponent)
        return <WrappedComponent {...this.props} />
      }
    }

    return compose(
      withProgressProp(actions),
      setDisplayName(wrapDisplayName(Component, 'withProgressComponents'))
    )(ComponentWithProgressComponents)
  }
}
