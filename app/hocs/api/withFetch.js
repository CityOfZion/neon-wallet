// @flow
import React from 'react'
import { connect } from 'react-redux'
import { compose, setDisplayName, wrapDisplayName } from 'recompose'

import withoutProps from '../withoutProps'
import { type Actions } from '../../values/api'

type Props = {
  [key: string]: Function
}

function defaultMapPropsToAction (props: Object): Object {
  return props
}

export default function withFetch (actions: Actions, mapPropsToAction: Function = defaultMapPropsToAction, propName: string = 'performAction'): Function {
  function mapDispatchToProps (dispatch: DispatchType): Props {
    return {
      [propName]: (props: Object) => dispatch(actions.request(props))
    }
  }

  return (Component: Class<React.Component<*>>) => {
    const WrappedComponent = withoutProps(propName)(Component)

    class ComponentWithFetch extends React.Component<Props> {
      static displayName = 'ComponentWithFetch'

      componentWillMount = () => {
        this.props[propName](mapPropsToAction(this.props))
      }

      render = () => {
        return <WrappedComponent {...this.props} />
      }
    }

    return compose(
      connect(null, mapDispatchToProps),
      setDisplayName(wrapDisplayName(Component, 'withFetch'))
    )(ComponentWithFetch)
  }
}
