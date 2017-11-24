// @flow
import React, { Component } from 'react'

import { omit } from 'lodash'
import { KEY_CODES } from '../../core/constants'

import FaEye from 'react-icons/lib/fa/eye'
import FaEyeSlash from 'react-icons/lib/fa/eye-slash'
import passwordFieldStyles from './PasswordField.scss'

type Props = {
  onEnterKey: Function
}

type State = {
  showKey: boolean
}

class PasswordField extends Component<Props, State> {
  state = {
    showKey: false
  }

  handleKeyPress = (target) => {
    if (target.charCode === KEY_CODES.ENTER) {
      if (this.props.onEnterKey) {
        this.props.onEnterKey(target)
      }
    }
  }

  toggleVisibility = () => {
    this.setState(prevState => ({
      showKey: !prevState.showKey
    }))
  }

  render () {
    const { showKey } = this.state
    const propsToPass = omit(this.props, 'onEnterKey')

    return (
      <div className={passwordFieldStyles.passwordField}>
        <input
          type={showKey ? 'text' : 'password'}
          onKeyPress={this.handleKeyPress}
          {...propsToPass}
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
