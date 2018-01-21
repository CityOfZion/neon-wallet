// @flow
import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { omit } from 'lodash'

import withError from './api/withError'
import withProgressProp from './api/withProgressProp'
import { type Actions } from '../values/api'
import { FAILED, type ProgressState } from '../values/state'
import { showErrorNotification } from '../modules/notifications'

type Props = {
  __error__: string,
  __progress__: ProgressState,
  __showErrorNotification__: Function
}

const ERROR_PROP = '__error__'
const PROGRESS_PROP = '__progress__'
const NOTIFICATION_PROP = '__showErrorNotification__'

export default function withFailureNotifications (actions: Actions) {
  const mapErrorToProps = (error) => ({ [ERROR_PROP]: error })

  const mapDisptchToProps = (dispatch, ownProps) => ({
    [NOTIFICATION_PROP]: (...args) => dispatch(showErrorNotification(...args))
  })

  return (Component: Class<React.Component<*>>): Class<React.Component<*>> => {
    const hasError = (props: Props) => !!props[ERROR_PROP]

    const progressChangedToError = (prevProps: Props, nextProps: Props) => {
      return prevProps[PROGRESS_PROP] !== FAILED && nextProps[PROGRESS_PROP] === FAILED
    }

    class ErrorNotifier extends React.Component<Props> {
      componentWillReceiveProps (nextProps) {
        if (hasError(nextProps) && (!hasError(this.props) || progressChangedToError(this.props, nextProps))) {
          const showErrorNotification = nextProps[NOTIFICATION_PROP]
          showErrorNotification({ message: nextProps[ERROR_PROP] })
        }
      }

      render () {
        const passDownProps = omit(this.props, ERROR_PROP, PROGRESS_PROP, NOTIFICATION_PROP)
        return <Component {...passDownProps} />
      }
    }

    return compose(
      connect(null, mapDisptchToProps),
      withError(actions, mapErrorToProps),
      withProgressProp(actions, { propName: PROGRESS_PROP })
    )(ErrorNotifier)
  }
}
