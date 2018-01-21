// @flow
import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { omit } from 'lodash'

import withError from './api/withError'
import { type Actions } from '../values/api'
import { showErrorNotification } from '../modules/notifications'

type Props = {
  __error__: string,
  __showErrorNotification__: Function
}

type Options = {
  errorPropName: string,
  notificationPropName: string
}

const ERROR_PROP = '__error__'
const NOTIFICATION_PROP = '__showErrorNotification__'

export default function withFailureNotifications (
  actions: Actions,
  { errorPropName = ERROR_PROP, notificationPropName = NOTIFICATION_PROP }: Options = {}
) {
  const mapErrorToProps = (error) => ({ [errorPropName]: error })

  const mapDisptchToProps = (dispatch, ownProps) => ({
    [notificationPropName]: (...args) => dispatch(showErrorNotification(...args))
  })

  return (Component: Class<React.Component<*>>): Class<React.Component<*>> => {
    class ErrorNotifier extends React.Component<Props> {
      componentWillReceiveProps (nextProps) {
        if (nextProps[errorPropName] && !this.props[errorPropName]) {
          const showErrorNotification = nextProps[notificationPropName]
          showErrorNotification({ message: nextProps[errorPropName] })
        }
      }

      render () {
        const passDownProps = omit(this.props, errorPropName)
        return <Component {...passDownProps} />
      }
    }

    return compose(
      connect(null, mapDisptchToProps),
      withError(actions, mapErrorToProps)
    )(ErrorNotifier)
  }
}
