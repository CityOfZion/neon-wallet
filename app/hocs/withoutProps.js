// @flow
import { omit } from 'lodash-es'
import React from 'react'
import { compose, setDisplayName, wrapDisplayName } from 'recompose'

export default function withoutProps(...propNames: Array<string>): Function {
  return (Component: Class<React.Component<*>>): Class<React.Component<*>> => {
    const ComponentWithoutProps = (props: Object) => {
      const passDownProps = omit(props, ...propNames)
      return <Component {...passDownProps} />
    }

    return compose(setDisplayName(wrapDisplayName(Component, 'withoutProps')))(
      ComponentWithoutProps
    )
  }
}
