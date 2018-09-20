// @flow
import React from 'react'
import { string } from 'prop-types'
import {
  withCall,
  withProgress,
  progressValues,
  type Actions,
  type Progress
} from 'spunky'
import { omit } from 'lodash-es'

import pureStrategy from './helpers/pureStrategy'

const { INITIAL } = progressValues

const PROGRESS_PROP = '__progress__'

type Options = {
  propName: string,
  strategy: (Array<Object>) => Progress
}

function defaultMapPropsToAction(props) {
  return props
}

const withInitialCall = (
  actions: Actions,
  mapPropsToAction: Function = defaultMapPropsToAction,
  {
    propName = PROGRESS_PROP,
    strategy = pureStrategy,
    ...options
  }: Options = {}
) => (Component: Class<React.Component<*>>): Class<React.Component<*>> => {
  type Props = {
    [propName: string]: string
  }

  class ConditionalCallComponent extends React.Component<Props> {
    static propTypes = {
      [propName]: string.isRequired
    }

    componentWillMount() {
      // $FlowFixMe
      this.Component = this.createComponent(this.props)
    }

    componentWillReceiveProps(nextProps) {
      const progress = this.props[propName]
      const nextProgress = nextProps[propName]

      if (
        progress !== nextProgress &&
        (progress === INITIAL || nextProgress === INITIAL)
      ) {
        // $FlowFixMe
        this.Component = this.createComponent(nextProps)
      }
    }

    render() {
      // $FlowFixMe
      const { Component } = this
      return <Component {...omit(this.props, propName)} />
    }

    createComponent = props => {
      if (props[propName] === INITIAL) {
        return withCall(actions, mapPropsToAction)(Component)
      }
      return Component
    }
  }

  return withProgress(actions, { propName, strategy, ...options })(
    ConditionalCallComponent
  )
}

export default withInitialCall
