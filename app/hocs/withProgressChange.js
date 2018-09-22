// @flow
import React from 'react'
import { compose } from 'recompose'
import { withData, withError, withProgress, type Actions } from 'spunky'
import { omit, castArray } from 'lodash-es'

const DATA_PROP: string = '__data__'
const ERROR_PROP: string = '__error__'
const PROGRESS_PROP: string = '__progress__'

type Props = {
  __data__: Object,
  __error__: string,
  __progress__: string
}

export default function withProgressChange(
  actions: Actions,
  progress: string,
  callback: Function
) {
  const progresses = castArray(progress)

  const mapDataToProps = data => ({
    [DATA_PROP]: data
  })

  const mapErrorToProps = error => ({
    [ERROR_PROP]: error
  })

  return (Component: Class<React.Component<*>>) => {
    class WrappedComponent extends React.Component<Props> {
      componentWillReceiveProps(nextProps) {
        if (
          !progresses.includes(this.props[PROGRESS_PROP]) &&
          progresses.includes(nextProps[PROGRESS_PROP])
        ) {
          callback(
            this.getCallbackState(nextProps),
            this.getCallbackProps(nextProps)
          )
        }
      }

      render() {
        const passDownProps = omit(this.props, DATA_PROP, PROGRESS_PROP)
        return <Component {...passDownProps} />
      }

      getCallbackState = props => ({
        data: props[DATA_PROP],
        error: props[ERROR_PROP]
      })

      getCallbackProps = props =>
        omit(props, DATA_PROP, ERROR_PROP, PROGRESS_PROP)
    }

    return compose(
      withProgress(actions, { propName: PROGRESS_PROP }),
      withData(actions, mapDataToProps),
      withError(actions, mapErrorToProps)
    )(WrappedComponent)
  }
}
