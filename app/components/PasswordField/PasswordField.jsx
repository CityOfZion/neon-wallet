// @flow
import React, { Component } from 'react'

import { omit } from 'lodash'

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

  constructor () {
    super()
    this._handleKeyPress = this._handleKeyPress.bind(this)
  }

  _handleKeyPress (target) {
    if (target.charCode === 13) {
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
          onKeyPress={this._handleKeyPress}
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
