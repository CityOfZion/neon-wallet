// @flow
import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { omit, isFunction } from 'lodash-es'
import {
  withError,
  withProgress,
  progressValues,
  type Actions,
  type ProgressState,
} from 'spunky'
import { IntlShape, injectIntl } from 'react-intl'

import { showErrorNotification } from '../modules/notifications'

type Props = {
  __error__: string,
  __progress__: ProgressState,
  __showErrorNotification__: Function,
  intl: IntlShape,
}

type Message = string | Function

const ERROR_PROP = '__error__'
const PROGRESS_PROP = '__progress__'
const NOTIFICATION_PROP = '__showErrorNotification__'

const { FAILED } = progressValues

const defaultMessage = error => error

export default function withFailureNotification(
  actions: Actions,
  message: Message = defaultMessage,
  options: Object = {},
  isTranslation?: boolean,
) {
  const mapErrorToProps = (error: Error) => ({
    [ERROR_PROP]: isFunction(message) ? message(error) : message,
  })

  const mapDisptchToProps = dispatch => ({
    [NOTIFICATION_PROP]: (...args) => dispatch(showErrorNotification(...args)),
  })

  return (Component: Class<React.Component<*>>): Class<React.Component<*>> => {
    const hasError = (props: Props) => !!props[ERROR_PROP]

    const progressChangedToError = (prevProps: Props, nextProps: Props) =>
      prevProps[PROGRESS_PROP] !== FAILED && nextProps[PROGRESS_PROP] === FAILED

    class ErrorNotifier extends React.Component<Props> {
      componentWillReceiveProps(nextProps) {
        console.log(nextProps)
        const { intl } = this.props

        if (
          hasError(nextProps) &&
          progressChangedToError(this.props, nextProps)
        ) {
          const showErrorNotification = nextProps[NOTIFICATION_PROP]

          let dynamicMessage = nextProps[ERROR_PROP]

          if (isTranslation) {
            dynamicMessage = intl.formatMessage({ id: message })
          }

          showErrorNotification({ message: dynamicMessage })
        }
      }

      render() {
        const passDownProps = omit(
          this.props,
          ERROR_PROP,
          PROGRESS_PROP,
          NOTIFICATION_PROP,
        )
        return <Component {...passDownProps} />
      }
    }

    return compose(
      connect(
        null,
        mapDisptchToProps,
      ),
      withError(actions, mapErrorToProps),
      withProgress(actions, { ...options, propName: PROGRESS_PROP }),
      injectIntl,
    )(ErrorNotifier)
  }
}
