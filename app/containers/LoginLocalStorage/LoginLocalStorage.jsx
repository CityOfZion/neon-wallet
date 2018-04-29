// @flow
import React, { Component } from 'react'

import PasswordInput from '../../components/Inputs/PasswordInput'
import Button from '../../components/Button'
import SelectInput from '../../components/Inputs/SelectInput/SelectInput'
import Login from '../../images/icons/Login.svg'
import styles from '../Home/Home.scss'

type Props = {
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

  render () {
    const { accounts } = this.props
    const { passphrase, encryptedWIF } = this.state

    const options = accounts.map(account => account.label)

    return (
      <div id="loginLocalStorage" className={styles.flexContainer}>
        <form onSubmit={this.handleSubmit}>
          <div style={{ marginBottom: 10 }}>
            <SelectInput
              items={options}
              value={encryptedWIF}
              placeholder="Select account"
              onChange={encryptedWIF => this.setState({ encryptedWIF })}
              getItemValue={item => item}
            />
          </div>
          <div style={{ marginBottom: 10 }}>
            <PasswordInput
              placeholder="Enter your passphrase here"
              value={passphrase}
              onChange={e => this.setState({ passphrase: e.target.value })}
            />
          </div>
          <div>
            <Button
              id="loginButton"
              primary
              type="submit"
              style={{ marginTop: 20 }}
              renderIcon={() => <Login />}
              disabled={!this.isValid()}
            >
              Login
            </Button>
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
