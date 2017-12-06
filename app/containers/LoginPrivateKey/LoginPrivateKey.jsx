// @flow
import React, { Component } from 'react'

import PasswordField from '../../components/PasswordField'
import HomeButtonLink from '../../components/HomeButtonLink'

import loginStyles from '../../styles/login.scss'

type Props = {
    loginWithPrivateKey: Function,
    history: Object
}

type State = {
  wif: string,
}

export default class LoginPrivateKey extends Component<Props, State> {
  state = {
    wif: ''
  }

  render () {
    const { history, loginWithPrivateKey } = this.props
    const { wif } = this.state
    const loginButtonDisabled = wif === ''

    return (
      <div id='loginPage' className={loginStyles.loginPage}>
        <div className={loginStyles.title}>Login using a private key:</div>
        <form onSubmit={(e) => { e.preventDefault(); loginWithPrivateKey(wif, history) }}>
          <div className={loginStyles.loginForm}>
            <PasswordField
              placeholder='Enter your private key here (WIF)'
              onChange={(e) => this.setState({ wif: e.target.value })}
              autoFocus
            />
          </div>
          <div>
            <button
              type='submit'
              disabled={loginButtonDisabled}
              className={loginButtonDisabled ? 'disabled' : ''}>Login</button>
            <HomeButtonLink />
          </div>
        </form>
      </div>
    )
  }
}
