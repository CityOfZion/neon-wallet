// @flow
import React, { Component } from 'react'

import PasswordInput from '../../components/Inputs/PasswordInput'
import Button from '../../components/Button'
import SelectInput from '../../components/Inputs/SelectInput/SelectInput'
import LoginIcon from '../../assets/icons/login.svg'
import styles from '../Home/Home.scss'

type Props = {
  loginNep2: Function,
  accounts: Object
}

type State = {
  passphrase: string,
  encryptedWIF: string,
  selectedLabel: string
}

export default class LoginLocalStorage extends Component<Props, State> {
  state = {
    passphrase: '',
    encryptedWIF: '',
    selectedLabel: ''
  }

  render () {
    const { accounts } = this.props
    const { passphrase, selectedLabel } = this.state
    return (
      <div id="loginLocalStorage" className={styles.flexContainer}>
        <form onSubmit={this.handleSubmit}>
          <div className={styles.inputMargin}>
            <SelectInput
              items={accounts.map(account => account.label)}
              value={selectedLabel}
              placeholder="Select account"
              onChange={value =>
                this.setState({
                  encryptedWIF: value,
                  selectedLabel: accounts.find(account => account.key === value)
                    .label
                })
              }
              getItemValue={value =>
                accounts.find(account => account.label === value).key
              }
            />
          </div>
          <div className={styles.inputMargin}>
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
              className={styles.loginButtonMargin}
              renderIcon={LoginIcon}
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
