// @flow
import React, { Component } from 'react'
import { map } from 'lodash'

import PasswordField from '../../components/PasswordField'
import HomeButtonLink from '../../components/HomeButtonLink'
import Button from '../../components/Button'

import styles from './LoginLocalStorage.scss'
import loginStyles from '../../styles/login.scss'

type Props = {
  loginNep2: Function,
  accounts: Object
}

type State = {
  passphrase: string,
  encryptedWIF: string,
}

export default class LoginLocalStorage extends Component<Props, State> {
  state = {
    passphrase: '',
    encryptedWIF: ''
  }

  render () {
    const { accounts } = this.props
    const { passphrase, encryptedWIF } = this.state

    return (
      <div id='loginPage' className={loginStyles.loginPage}>
        <div className={loginStyles.title}>Login using a saved wallet:</div>
        <form onSubmit={this.handleSubmit}>
          <select
            className={styles.selectWallet}
            value={encryptedWIF}
            onChange={(e) => this.setState({ encryptedWIF: e.target.value })}
          >
            <option value=''>Select a wallet</option>
            {map(accounts, (account, index) => (
              <option value={account.key} key={`wallet${account.label}`}>{account.label}</option>
            ))}
          </select>
          <div className={loginStyles.loginForm}>
            <PasswordField
              placeholder='Enter your passphrase here'
              value={passphrase}
              onChange={(e) => this.setState({ passphrase: e.target.value })}
              autoFocus
            />
          </div>
          <div>
            <Button type='submit' disabled={!this.isValid()}>Login</Button>
            <HomeButtonLink />
          </div>
        </form>
      </div>
    )
  }

  handleSubmit = (event: Object) => {
    const { loginNep2 } = this.props
    const { passphrase, encryptedWIF } = this.state

    event.preventDefault()
    loginNep2(passphrase, encryptedWIF)
  }

  isValid = () => {
    return this.state.encryptedWIF !== '' && this.state.passphrase !== ''
  }
}
