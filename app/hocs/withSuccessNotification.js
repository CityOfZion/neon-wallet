// @flow
import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { omit, isFunction } from 'lodash-es'
import {
  withProgress,
  progressValues,
  type Actions,
  type ProgressState,
} from 'spunky'
import { injectIntl, IntlShape } from 'react-intl'

import { showSuccessNotification } from '../modules/notifications'

type Props = {
  __progress__: ProgressState,
  __showSuccessNotification__: Function,
  intl: IntlShape,
}

type Message = string | Function

const PROGRESS_PROP = '__progress__'
const NOTIFICATION_PROP = '__showSuccessNotification__'

const { LOADED } = progressValues

export default function withSuccessNotification(
  actions: Actions,
  message: Message,
  options: Object = {},
  isTranslation?: boolean,
) {
  const mapDispatchToProps = (dispatch: DispatchType) => ({
    [NOTIFICATION_PROP]: (...args) =>
      dispatch(showSuccessNotification(...args)),
  })

  return (Component: Class<React.Component<*>>): Class<React.Component<*>> => {
    const progressChangedToLoaded = (prevProps: Props, nextProps: Props) =>
      prevProps[PROGRESS_PROP] !== LOADED && nextProps[PROGRESS_PROP] === LOADED

    class LoadedNotifier extends React.Component<Props> {
      componentWillReceiveProps(nextProps) {
        if (progressChangedToLoaded(this.props, nextProps)) {
          const { intl } = this.props
          const showSuccessNotification = nextProps[NOTIFICATION_PROP]

          let dynamicMessage = isFunction(message)
            ? message(nextProps)
            : message

          if (isTranslation) {
            dynamicMessage = intl.formatMessage({ id: message })
          }

          showSuccessNotification({
            message: dynamicMessage,
          })
        }
      }

      render() {
        const passDownProps = omit(this.props, PROGRESS_PROP, NOTIFICATION_PROP)
        return <Component {...passDownProps} />
      }
    }

    return compose(
      connect(
        null,
        mapDispatchToProps,
      ),
      withProgress(actions, { ...options, propName: PROGRESS_PROP }),
      injectIntl,
    )(LoadedNotifier)
  }
}
