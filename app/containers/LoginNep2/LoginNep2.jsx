// @flow
import React, { Component } from 'react'

import Button from '../../components/Button'
import PasswordInput from '../../components/Inputs/PasswordInput'
import LoginIcon from '../../assets/icons/login.svg'
import styles from '../Home/Home.scss'

type Props = {
  loginNep2: Function
}

type State = {
  encryptedWIF: string,
  passphrase: string
}

export default class LoginNep2 extends Component<Props, State> {
  state = {
    encryptedWIF: '',
    passphrase: ''
  }

  render () {
    const { loginNep2 } = this.props
    const { encryptedWIF, passphrase } = this.state
    const loginButtonDisabled = encryptedWIF === '' || passphrase === ''

    return (
      <div id="loginNep2" className={styles.flexContainer}>
        <form
          onSubmit={e => {
            e.preventDefault()
            loginNep2(passphrase, encryptedWIF)
          }}
        >
          <div className={styles.inputMargin}>
            <PasswordInput
              placeholder="Enter your encrypted key here"
              onChange={e => this.setState({ encryptedWIF: e.target.value })}
              value={encryptedWIF}
            />
          </div>
          <PasswordInput
            placeholder="Enter your passphrase here"
            onChange={e => this.setState({ passphrase: e.target.value })}
            value={passphrase}
            autoFocus
          />
          <Button
            id="loginButton"
            primary
            type="submit"
            className={styles.loginButtonMargin}
            renderIcon={LoginIcon}
            disabled={loginButtonDisabled}
          >
            Login
          </Button>
        </form>
      </div>
    )
  }
}
