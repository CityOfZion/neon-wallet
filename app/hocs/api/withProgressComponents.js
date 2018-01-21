// @flow
import React from 'react'
import { omit } from 'lodash'
import { compose, setDisplayName, wrapDisplayName } from 'recompose'

import defaultStrategy from './progressStrategies/defaultStrategy'
import withProgressProp from './withProgressProp'
import { type Actions } from '../../values/api'
import { type ProgressState } from '../../values/state'

type Props = {
  [key: string]: ProgressState
}

type Mapping = {
  [key: ProgressState]: Class<React.Component<*>>
}

type Options = {
  strategy?: (Array<Object>) => ProgressState,
  prefix?: string,
  propName?: string
}

const PROGRESS_PROP: string = '__progress__'

export default function withProgressComponents (
  actions: Actions,
  mapping: Mapping = {},
  { strategy = defaultStrategy, prefix = 'api', propName = PROGRESS_PROP }: Options = {}
) {
  return (Component: Class<React.Component<*>>): Class<React.Component<*>> => {
    class ComponentWithProgressComponents extends React.Component<Props> {
      static displayName = 'ComponentWithProgressComponents'

      render = () => {
        const MappedComponent = mapping[this.props[propName]] || Component
        const passDownProps = omit(this.props, propName)
        return <MappedComponent {...passDownProps} />
      }
    }

    return compose(
      withProgressProp(actions, { strategy, prefix, propName }),
      setDisplayName(wrapDisplayName(Component, 'withProgressComponents'))
    )(ComponentWithProgressComponents)
  }
}
