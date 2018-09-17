// @flow
import React from 'react'
import classNames from 'classnames'
import FaEye from 'react-icons/lib/fa/eye'
import FaEyeSlash from 'react-icons/lib/fa/eye-slash'

import TextInput from '../TextInput'
import styles from './PasswordInput.scss'

type Props = {
  className?: string,
  value?: string,
  onChange?: Function,
  placeholder?: string,
  autoFocus?: boolean
}

type State = {
  showPassword: boolean
}

export default class PasswordInput extends React.Component<Props, State> {
  state = {
    showPassword: false
  }

  render() {
    return (
      <TextInput
        className={classNames(styles.passwordInput, this.props.className)}
        type={this.state.showPassword ? 'text' : 'password'}
        renderAfter={this.renderAfter}
        {...this.props}
      />
    )
  }

  renderAfter = () => {
    const Icon = this.state.showPassword ? FaEyeSlash : FaEye

    return (
      <Icon className={styles.icon} onClick={this.handleToggleVisibility} />
    )
  }

  handleToggleVisibility = () => {
    // TODO: fix me! (Use callback in setState when referencing the previous state)
    this.setState({ showPassword: !this.state.showPassword }) // eslint-disable-line
  }
}
