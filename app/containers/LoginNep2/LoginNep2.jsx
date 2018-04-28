// @flow
import React, { Component } from 'react'

import Button from '../../components/Button'
import PasswordInput from '../../components/Inputs/PasswordInput'
import Login from '../../images/icons/Login.svg'

import loginStyles from '../../styles/login.scss'

type Props = {
  loginNep2: Function
}

type State = {
  encryptedWIF: string,
  passphrase: string
}

export default class LoginNep2 extends Component<Props, State> {
  state = {
    encryptedWIF: '',
    passphrase: ''
  }

  render() {
    const { loginNep2 } = this.props
    const { encryptedWIF, passphrase } = this.state
    const loginButtonDisabled = encryptedWIF === '' || passphrase === ''

    return (
      <div className={loginStyles.flexContainer}>
        <form
          onSubmit={e => {
            e.preventDefault()
            loginNep2(passphrase, encryptedWIF)
          }}
        >
          <div className={loginStyles.loginForm}>
            <div style={{ marginBottom: 10 }}>
              <PasswordInput
                placeholder="Enter your passphrase here"
                onChange={e => this.setState({ passphrase: e.target.value })}
                value={passphrase}
                autoFocus
              />
            </div>
            <PasswordInput
              placeholder="Enter your encrypted key here"
              onChange={e => this.setState({ encryptedWIF: e.target.value })}
              value={encryptedWIF}
            />
          </div>
          <div>
            <Button
              renderIcon={() => <Login />}
              icon="login"
              style={{ marginTop: 20 }}
              id="loginButton"
              primary
              type="submit"
              disabled={loginButtonDisabled}
            >
              Login
            </Button>
          </div>
        </form>
      </div>
    )
  }
}
