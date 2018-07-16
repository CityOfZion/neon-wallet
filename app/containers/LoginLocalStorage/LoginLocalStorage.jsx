// @flow
import React, { Component } from 'react'

import PasswordInput from '../../components/Inputs/PasswordInput'
import Button from '../../components/Button'
import SelectInput from '../../components/Inputs/SelectInput/SelectInput'
import LoginIcon from '../../assets/icons/login.svg'
import styles from '../Home/Home.scss'

type Props = {
  loading: boolean,
  loginNep2: Function,
  accounts: Object
}

type State = {
  passphrase: string,
  encryptedWIF: string
}

export default class LoginLocalStorage extends Component<Props, State> {
  state = {
    passphrase: '',
    encryptedWIF: ''
  }

  render() {
    const { loading, accounts } = this.props
    const { passphrase, encryptedWIF } = this.state
    const { label } =
      (Array.isArray(accounts) &&
        accounts.find(account => account.key === encryptedWIF)) ||
      {}

    return (
      <div id="loginLocalStorage" className={styles.flexContainer}>
        <form onSubmit={this.handleSubmit}>
          <div className={styles.inputMargin}>
            <SelectInput
              items={
                Array.isArray(accounts) &&
                accounts.map(account => account.label)
              }
              value={label || ''}
              placeholder="Select Account"
              disabled={loading}
              onChange={value => this.setState({ encryptedWIF: value })}
              getItemValue={value =>
                Array.isArray(accounts) &&
                accounts.find(account => account.label === value).key
              }
            />
          </div>
          <div className={styles.inputMargin}>
            <PasswordInput
              placeholder="Password"
              value={passphrase}
              disabled={loading}
              onChange={e => this.setState({ passphrase: e.target.value })}
            />
          </div>

          <Button
            id="loginButton"
            primary
            type="submit"
            className={styles.loginButtonMargin}
            disabled={loading || !this.isValid()}
            renderIcon={() => <LoginIcon />}
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
