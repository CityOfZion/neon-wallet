// @flow
import React, { Component } from 'react'

import Button from '../../components/Button'
import HomeButtonLink from '../../components/HomeButtonLink'
import PasswordField from '../../components/PasswordField'

import { ROUTES } from '../../core/constants'

import loginStyles from '../../styles/login.scss'

type Props = {
  loginWithPrivateKey: Function,
  history: Object
}

type State = {
  wif: string
}

export default class LoginTokenSale extends Component<Props, State> {
  state = {
    wif: ''
  }

  render () {
    const { history, loginWithPrivateKey } = this.props
    const { wif } = this.state
    const loginButtonDisabled = wif === ''

    return (
      <div id='loginPage' className={loginStyles.loginPage}>
        <div className={loginStyles.title}>Participate in Token Sale:</div>
        <form onSubmit={(e) => { e.preventDefault(); loginWithPrivateKey(wif, history, ROUTES.TOKEN_SALE) }}>
          <div className={loginStyles.loginForm}>
            <PasswordField
              placeholder='Enter your private key here (WIF)'
              onChange={(e) => this.setState({ wif: e.target.value })}
              value={wif}
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
