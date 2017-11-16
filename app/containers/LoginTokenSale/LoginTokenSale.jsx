// @flow
import React, { Component } from 'react'
import Page from '../../components/Page'
import HomeButtonLink from '../../components/HomeButtonLink'
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
      <Page id='loginPage' className={loginStyles.loginPage}>
        <div className={loginStyles.title}>Participate in Token Sale:</div>
        <div className={loginStyles.loginForm}>
          <input
            type='text'
            placeholder='Enter your private key here (WIF)'
            onChange={(e) => this.setState({ wif: e.target.value })}
            value={wif}
            autoFocus
          />
        </div>
        <div>
          <button
            onClick={() => loginWithPrivateKey(wif, history, ROUTES.TOKEN_SALE)}
            disabled={loginButtonDisabled}
            className={loginButtonDisabled ? 'disabled' : ''}>Login</button>
          <HomeButtonLink />
        </div>
      </Page>
    )
  }
}
