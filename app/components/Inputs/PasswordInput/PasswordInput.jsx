// @flow
import React from 'react'
import FaEye from 'react-icons/lib/fa/eye'
import FaEyeSlash from 'react-icons/lib/fa/eye-slash'

import styles from './PasswordInput.scss'

type Props = {
  value?: string,
  onChange?: Function,
  placeholder?: string,
  autoFocus?: boolean
}

type State = {
  showKey: boolean
}

export default class PasswordInput extends React.Component<Props, State> {
  state = {
    showKey: false
  }

  render () {
    const { showKey } = this.state
    const Icon = showKey ? FaEyeSlash : FaEye

    return (
      <div className={styles.passwordField}>
        <input type={showKey ? 'text' : 'password'} {...this.props} />
        <Icon className={styles.viewKey} onClick={this.handleToggleVisibility} />
      </div>
    )
  }

  handleToggleVisibility = () => {
    this.setState(prevState => ({
      showKey: !prevState.showKey
    }))
  }
}
