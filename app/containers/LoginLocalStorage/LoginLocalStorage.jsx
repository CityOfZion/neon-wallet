// @flow
import React, { Component } from 'react'
import { cloneDeep } from 'lodash-es'

import PasswordInput from '../../components/Inputs/PasswordInput'
import Button from '../../components/Button'
import StyledReactSelect from '../../components/Inputs/StyledReactSelect/StyledReactSelect'

import LoginIcon from '../../assets/icons/login.svg'
import styles from '../Home/Home.scss'

type Props = {
  loading: boolean,
  loginNep2: Function,
  accounts: Object
}

type State = {
  passphrase: string,
  selectedAccount: Object | null,
  mappedAccounts: Array<Object>
}

export default class LoginLocalStorage extends Component<Props, State> {
  state = {
    passphrase: '',
    selectedAccount: null,
    mappedAccounts:
      this.props.accounts.length &&
      this.props.accounts.map(account => {
        const clonedAccount = cloneDeep(account)
        clonedAccount.value = account.label
        return clonedAccount
      })
  }

  render() {
    const { loading, accounts } = this.props
    const { passphrase, selectedAccount, mappedAccounts } = this.state

    return (
      <div id="loginLocalStorage" className={styles.flexContainer}>
        <form onSubmit={this.handleSubmit}>
          <div className={styles.selectMargin}>
            <StyledReactSelect
              disabled={!accounts.length}
              value={selectedAccount}
              onChange={this.handleChange}
              options={mappedAccounts}
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

  handleChange = (selectedAccount: Object) => {
    this.setState({ selectedAccount })
  }

  handleSubmit = (event: Object) => {
    const { loading, loginNep2, accounts } = this.props
    const { passphrase, selectedAccount } = this.state
    if (selectedAccount) {
      const accountInStorage = accounts.find(
        account => account.label === selectedAccount.value
      )

      event.preventDefault()

      if (!loading) {
        loginNep2(passphrase, accountInStorage.key)
      }
    }
  }

  isValid = () => !!this.state.selectedAccount && this.state.passphrase !== ''
}
