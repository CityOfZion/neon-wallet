// @flow
import React, { Component } from 'react'

import Button from '../../components/Button'
import HomeButtonLink from '../../components/HomeButtonLink'
import PasswordField from '../../components/PasswordField'
import { showSuccessNotification } from '../../modules/notifications'

import loginStyles from '../../styles/login.scss'

type Props = {
  loginNep2: Function,
  updateAccounts: Function,
  dispatch: Function
}

type State = {
  encryptedWIF: string,
  passphrase: string,
  label: string,
  save: false
}

export default class LoginNep2 extends Component<Props, State> {
  state = {
    encryptedWIF: '',
    passphrase: '',
    label: '',
    save: false
  }

  render () {
    const { loginNep2, updateAccounts, dispatch } = this.props
    const { encryptedWIF, passphrase, label, save } = this.state
    const loginButtonDisabled = encryptedWIF === '' || passphrase === '' || (save && !label)

    return (
      <div id='loginPage' className={loginStyles.loginPage}>
        <div className={loginStyles.title}>Login using an encrypted key:</div>
        <form onSubmit={async (e) => {
          e.preventDefault()
          loginNep2(passphrase, encryptedWIF, save && label, accounts => {
            dispatch(showSuccessNotification({ message: 'Account saved!' }))
            updateAccounts(accounts)
          })
        }}>
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
            <input type='checkbox' onClick={event => this.setState({save: event.target.checked})} /> Save Account
            {save && <input
              type='text'
              placeholder='Name this account'
              className={loginStyles.accountLabel}
              onChange={(e) => this.setState({ label: e.target.value })}
              value={label}
            />}
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
