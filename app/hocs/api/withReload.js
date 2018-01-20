// @flow
import React from 'react'
import { compose, setDisplayName, wrapDisplayName } from 'recompose'
import { isEqual, some, castArray } from 'lodash'

import withActions from './withActions'
import withoutProps from '../withoutProps'
import { type Actions } from '../../values/api'

type Props = {
  [key: string]: Function
}

type ShouldReload = Array<string> | string | Function

function createShouldReload (shouldReloadDefinition: ShouldReload) {
  if (typeof shouldReloadDefinition === 'function') {
    return shouldReloadDefinition
  } else {
    const shouldReloadProps = castArray(shouldReloadDefinition)

    return (prevProps: Object, props: Object): boolean => {
      return some(shouldReloadProps, (key) => !isEqual(prevProps[key], props[key]))
    }
  }
}

export default function withReload (actions: Actions, shouldReloadDefinition: ShouldReload, propName: string = 'performAction'): Function {
  const shouldReload = createShouldReload(shouldReloadDefinition)

  const mapActionsToProps = (actions: Actions, props: Object): Object => ({
    [propName]: (...args: Array<any>) => actions.request(...args)
  })

  return (Component: Class<React.Component<*>>) => {
    const WrappedComponent = withoutProps(propName)(Component)

    class ComponentWithReload extends React.Component<Props> {
      static displayName = 'ComponentWithFetch'

      componentDidUpdate = (prevProps) => {
        if (shouldReload(prevProps, this.props)) {
          this.props[propName](this.props)
        }
      }

      render = () => {
        return <WrappedComponent {...this.props} />
      }
    }

    return compose(
      withActions(actions, mapActionsToProps),
      setDisplayName(wrapDisplayName(Component, 'withReload'))
    )(ComponentWithReload)
  }
}
