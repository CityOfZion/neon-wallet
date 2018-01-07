// @flow
import React, { Component } from 'react'

import FaEye from 'react-icons/lib/fa/eye'
import FaEyeSlash from 'react-icons/lib/fa/eye-slash'

import passwordFieldStyles from './PasswordField.scss'

type Props = {
  value?: string,
  onChange?: Function,
  placeholder?: string,
  autoFocus?: boolean
}

type State = {
  showKey: boolean
}

class PasswordField extends Component<Props, State> {
  state = {
    showKey: false
  }

  toggleVisibility = () => {
    this.setState(prevState => ({
      showKey: !prevState.showKey
    }))
  }

  render () {
    const { showKey } = this.state
    return (
      <div className={passwordFieldStyles.passwordField}>
        <input
          type={showKey ? 'text' : 'password'}
          {...this.props}
        />
        { showKey
          ? <FaEyeSlash className={passwordFieldStyles.viewKey} onClick={this.toggleVisibility} />
          : <FaEye className={passwordFieldStyles.viewKey} onClick={this.toggleVisibility} />
        }
      </div>
    )
  }
}

export default PasswordField
