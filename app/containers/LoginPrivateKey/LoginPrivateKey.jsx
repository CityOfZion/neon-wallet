// @flow
import React, { Component } from 'react'

import PasswordField from '../../components/PasswordField'
import HomeButtonLink from '../../components/HomeButtonLink'
import Button from '../../components/Button'

import loginStyles from '../../styles/login.scss'

type Props = {
  loginWithPrivateKey: Function
}

type State = {
  wif: string,
}

export default class LoginPrivateKey extends Component<Props, State> {
  state = {
    wif: ''
  }

  render () {
    const { loginWithPrivateKey } = this.props
    const { wif } = this.state
    const loginButtonDisabled = wif === ''

    return (
      <div id='loginPage' className={loginStyles.loginPage}>
        <div className={loginStyles.title}>Login using a private key:</div>
        <form onSubmit={(e) => { e.preventDefault(); loginWithPrivateKey(wif) }}>
          <div className={loginStyles.loginForm}>
            <PasswordField
              placeholder='Enter your private key here (WIF)'
              onChange={(e) => this.setState({ wif: e.target.value })}
              autoFocus
            />
          </div>
          <div>
            <Button type='submit' disabled={loginButtonDisabled}>Login</Button>
            <HomeButtonLink />
          </div>
        </form>
      </div>
    )
  }
}
