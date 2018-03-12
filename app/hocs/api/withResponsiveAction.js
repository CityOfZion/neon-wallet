// @flow
import React from 'react'
import { wrapDisplayName } from 'recompose'
import { isEqual, some, castArray } from 'lodash'

import withActions from './withActions'
import withoutProps from '../withoutProps'
import { type Actions } from '../../values/api'

type Props = {
  [key: string]: Function
}

type ActionName = 'request' | 'retry' | 'cancel' | 'reset'

type Options = {
  propName?: string
}

export type ShouldPerform = Array<string> | string | Function

function createShouldPerform (shouldPerformDefinition: ShouldPerform) {
  if (typeof shouldPerformDefinition === 'function') {
    return shouldPerformDefinition
  } else {
    const shouldPerformProps = castArray(shouldPerformDefinition)

    return (prevProps: Object, props: Object): boolean => {
      return some(shouldPerformProps, (key) => !isEqual(prevProps[key], props[key]))
    }
  }
}

export default function withResponsiveAction (
  actions: Actions,
  actionName: ActionName,
  shouldPerformDefinition: ShouldPerform,
  { propName = 'performAction' }: Options = {}
): Function {
  const shouldPerform = createShouldPerform(shouldPerformDefinition)

  const mapActionsToProps = (actions: Actions, props: Object): Object => ({
    [propName]: (...args: Array<any>) => actions[actionName](...args)
  })

  return (Component: Class<React.Component<*>>) => {
    const WrappedComponent = withoutProps(propName)(Component)

    class ComponentWithResponsiveAction extends React.Component<Props> {
      static displayName = wrapDisplayName(Component, 'withResponsiveAction')

      componentDidUpdate = (prevProps) => {
        if (shouldPerform(prevProps, this.props)) {
          this.props[propName](this.props)
        }
      }

      render = () => {
        return <WrappedComponent {...this.props} />
      }
    }

    return withActions(actions, mapActionsToProps)(ComponentWithResponsiveAction)
  }
}
