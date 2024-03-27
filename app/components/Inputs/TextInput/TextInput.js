// @flow
import React from 'react'
import classNames from 'classnames'
import { omit } from 'lodash-es'

import ErrorIcon from '../../../assets/icons/errorRed.svg'

import styles from './TextInput.scss'

type Props = {
  className?: string,
  type: string,
  textInputClassName?: string,
  containerClassName?: string,
  activeStyles?: string,
  placeholder: string,
  error?: string,
  id: string,
  renderBefore?: Function,
  renderAfter?: Function,
  onFocus?: Function,
  onBlur?: Function,
  label: string,
  shouldRenderErrorIcon?: boolean,
  disabled?: boolean,
}

type State = {
  active: boolean,
}

export default class TextInput extends React.Component<Props, State> {
  static defaultProps = {
    type: 'text',
    shouldRenderErrorIcon: true,
  }

  state = {
    active: false,
  }

  render() {
    const passDownProps = omit(
      this.props,
      'className',
      'textInputClassName',
      'activeStyles',
      'renderBefore',
      'renderAfter',
      'shouldRenderErrorIcon',
      'containerClassName',
    )

    const {
      error,
      label,
      textInputClassName,
      activeStyles,
      containerClassName,
    } = this.props

    const className = classNames(styles.textInput, this.props.className, {
      [activeStyles || styles.active]: this.state.active,
      [styles.error]: !!error,
    })

    return (
      <div
        className={classNames(styles.textInputContainer, containerClassName)}
      >
        {label && <label className={styles.label}> {label} </label>}
        <div className={className}>
          {this.renderBefore()}
          <input
            {...passDownProps}
            className={classNames(styles.input, textInputClassName)}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
            disabled={this.props.disabled}
          />
          {error &&
            this.props.shouldRenderErrorIcon && (
              <ErrorIcon className={styles.errorIcon} />
            )}
          {error && <div className={styles.errorMessage}>{error}</div>}
          {this.renderAfter()}
        </div>
      </div>
    )
  }

  renderBefore = () => {
    if (!this.props.renderBefore) {
      return null
    }

    return (
      <div className={styles.beforeInput}>
        {this.props.renderBefore({ active: this.state.active })}
      </div>
    )
  }

  renderAfter = () => {
    if (!this.props.renderAfter) {
      return null
    }

    return (
      <div className={styles.afterInput}>
        {this.props.renderAfter({ active: this.state.active })}
      </div>
    )
  }

  handleFocus = (event: Object, ...args: Array<any>) => {
    this.setState({ active: true })
    event.persist()
    return this.props.onFocus && this.props.onFocus(event, ...args)
  }

  handleBlur = (event: Object, ...args: Array<any>) => {
    this.setState({ active: false })
    event.persist()
    return this.props.onBlur && this.props.onBlur(event, ...args)
  }
}
