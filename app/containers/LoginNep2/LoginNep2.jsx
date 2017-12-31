// @flow
import React, { Component } from 'react'

import Button from '../../components/Button'
import HomeButtonLink from '../../components/HomeButtonLink'
import PasswordField from '../../components/PasswordField'

import loginStyles from '../../styles/login.scss'

type Props = {
  loginNep2: Function,
  history: Object
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

  render () {
    const { loginNep2, history } = this.props
    const { encryptedWIF, passphrase } = this.state
    const loginButtonDisabled = encryptedWIF === '' || passphrase === ''

    return (
      <div id='loginPage' className={loginStyles.loginPage}>
        <div className={loginStyles.title}>Login using an encrypted key:</div>
        <form onSubmit={(e) => { e.preventDefault(); loginNep2(passphrase, encryptedWIF, history) }}>
          <div className={loginStyles.loginForm}>
            <PasswordField
              placeholder='Enter your passphrase here'
              onChange={(e) => this.setState({ passphrase: e.target.value })}
              value={passphrase}
              autoFocus
            />
            <PasswordField
              placeholder='Enter your encrypted key here'
              onChange={(e) => this.setState({ encryptedWIF: e.target.value })}
              value={encryptedWIF}
            />
          </div>
          <div>
            <Button
              id='loginButton'
              type='submit'
              disabled={loginButtonDisabled}>Login</Button>
            <HomeButtonLink />
          </div>
        </form>
      </div>
    )
  }
}
