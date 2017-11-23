// @flow
import React, { Component } from 'react'
import PasswordField from '../../components/PasswordField'
import Page from '../../components/Page'
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
      <Page id='loginPage' className={loginStyles.loginPage}>
        <div className={loginStyles.title}>Login using a private key:</div>
        <div className={loginStyles.loginForm}>
          <PasswordField
            placeholder='Enter your private key here (WIF)'
            onChange={(e) => this.setState({ wif: e.target.value })}
            onEnterKey={(t) => loginButtonDisabled || loginWithPrivateKey(wif, history)}
            autoFocus
          />
        </div>
        <div>
          <button
            onClick={() => loginWithPrivateKey(wif, history)}
            disabled={loginButtonDisabled}
            className={loginButtonDisabled ? 'disabled' : ''}>Login</button>
          <HomeButtonLink />
        </div>
      </Page>
    )
  }
}
