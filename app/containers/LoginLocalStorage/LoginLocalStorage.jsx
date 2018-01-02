// @flow
import React, { Component } from 'react'
import storage from 'electron-json-storage'
import { map } from 'lodash'

import PasswordField from '../../components/PasswordField'
import HomeButtonLink from '../../components/HomeButtonLink'
import Button from '../../components/Button'

import styles from './LoginLocalStorage.scss'
import loginStyles from '../../styles/login.scss'

type Props = {
  setAccounts: Function,
  loginNep2: Function,
  history: Object,
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

  componentDidMount () {
    const { setAccounts } = this.props
    // eslint-disable-next-line
    storage.get('userWallet', (error, data) => {
      setAccounts(data.accounts)
    })
  }

  render () {
    const { accounts, history, loginNep2 } = this.props
    const { passphrase, encryptedWIF } = this.state
    const loginButtonDisabled = Object.keys(accounts).length === 0 || encryptedWIF === '' || passphrase === ''

    return (
      <div id='loginPage' className={loginStyles.loginPage}>
        <div className={loginStyles.title}>Login using a saved wallet:</div>
        <form onSubmit={(e) => { e.preventDefault(); loginNep2(passphrase, encryptedWIF, history) }}>
          <select
            className={styles.selectWallet}
            value={encryptedWIF}
            onChange={(e) => this.setState({ encryptedWIF: e.target.value })}
          >
            <option value=''>Select a wallet</option>
            {map(accounts, (account, index) => <option value={account.key} key={`wallet${account.label}`}>{account.label}</option>)}
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
            <Button type='submit' disabled={loginButtonDisabled}>Login</Button>
            <HomeButtonLink />
          </div>
        </form>
      </div>
    )
  }
}
