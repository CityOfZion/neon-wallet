// @flow
import React, { Component } from 'react'

import Button from '../../components/Button'
import PasswordInput from '../../components/Inputs/PasswordInput'
import LoginIcon from '../../assets/icons/login.svg'
import styles from '../Home/Home.scss'

type Props = {
  loading: boolean,
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

  render() {
    const { loading } = this.props
    const { encryptedWIF, passphrase } = this.state

    return (
      <div id="loginNep2" className={styles.flexContainer}>
        <form onSubmit={this.handleSubmit}>
          <div className={styles.inputMargin}>
            <PasswordInput
              placeholder="Encrypted Key"
              autoFocus
              value={encryptedWIF}
              disabled={loading}
              onChange={e => this.setState({ encryptedWIF: e.target.value })}
            />
          </div>
          <PasswordInput
            placeholder="Password"
            value={passphrase}
            disabled={loading}
            onChange={e => this.setState({ passphrase: e.target.value })}
          />
          <Button
            id="loginButton"
            primary
            type="submit"
            className={styles.loginButtonMargin}
            renderIcon={LoginIcon}
            disabled={loading || !this.isValid()}
            shouldCenterButtonLabelText
          >
            Login
          </Button>
        </form>
      </div>
    )
  }

  handleSubmit = (event: Object) => {
    const { loading, loginNep2 } = this.props
    const { passphrase, encryptedWIF } = this.state

    event.preventDefault()

    if (!loading) {
      loginNep2(passphrase, encryptedWIF)
    }
  }

  isValid = () => this.state.encryptedWIF !== '' && this.state.passphrase !== ''
}
