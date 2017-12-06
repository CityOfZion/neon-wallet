// @flow
import React, { Component } from 'react'
import storage from 'electron-json-storage'
import { map } from 'lodash'

import PasswordField from '../../components/PasswordField'
import HomeButtonLink from '../../components/HomeButtonLink'

import styles from './LoginLocalStorage.scss'
import loginStyles from '../../styles/login.scss'

type Props = {
  setKeys: Function,
  loginNep2: Function,
  history: Object,
  accountKeys: Object
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
    const { setKeys } = this.props
    // eslint-disable-next-line
    storage.get('keys', (error, data) => {
      setKeys(data)
    })
  }

  render () {
    const { accountKeys, history, loginNep2 } = this.props
    const { passphrase, encryptedWIF } = this.state
    const loginButtonDisabled = Object.keys(accountKeys).length === 0 || encryptedWIF === '' || passphrase === ''

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
            {map(accountKeys, (value, key) => <option value={value} key={`wallet${key}`}>{key}</option>)}
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
            <button
              type='submit'
              className={loginButtonDisabled ? 'disabled' : ''}
              disabled={loginButtonDisabled}>Login</button>
            <HomeButtonLink />
          </div>
        </form>
      </div>
    )
  }
}
