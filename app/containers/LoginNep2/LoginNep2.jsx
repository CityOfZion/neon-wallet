// @flow
import React, { Component } from 'react'
import Page from '../../components/Page'
import HomeButtonLink from '../../components/HomeButtonLink'
import PasswordField from '../../components/PasswordField'
import classNames from 'classnames'
import loginStyles from '../../styles/login.scss'

type Props = {
  loginNep2: Function,
  history: Object
}

type State = {
  wif: string,
  passphrase: string
}

export default class LoginNep2 extends Component<Props, State> {
  state = {
    wif: '',
    passphrase: ''
  }

  render () {
    const { loginNep2, history } = this.props
    const { wif, passphrase } = this.state
    const loginButtonDisabled = wif === '' || passphrase === ''

    return (
      <Page id='loginPage' className={loginStyles.loginPage}>
        <div className={loginStyles.title}>Login using an encrypted key:</div>
        <div className={loginStyles.loginForm}>
          <PasswordField
            placeholder='Enter your passphrase here'
            onChange={(e) => this.setState({ passphrase: e.target.value })}
            onEnterKey={(t) => loginButtonDisabled || loginNep2(passphrase, wif, history)}
            value={passphrase}
            autoFocus
          />
          <PasswordField
            placeholder='Enter your encrypted key here'
            onChange={(e) => this.setState({ wif: e.target.value })}
            onEnterKey={(t) => loginButtonDisabled || loginNep2(passphrase, wif, history)}
            value={wif}
          />
        </div>
        <div>
          <button
            className={classNames('loginButton', { disabled: loginButtonDisabled })}
            onClick={() => loginNep2(passphrase, wif, history)}
            disabled={loginButtonDisabled}>Login</button>
          <HomeButtonLink />
        </div>
      </Page>
    )
  }
}
