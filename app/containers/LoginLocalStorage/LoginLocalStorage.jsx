// @flow
import React, { Component } from 'react'
import storage from 'electron-json-storage'
import { map } from 'lodash'
import FaEye from 'react-icons/lib/fa/eye'
import FaEyeSlash from 'react-icons/lib/fa/eye-slash'
import Page from '../../components/Page'
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
  showKey: boolean,
  passphrase: string,
  wif: string,
}

export default class LoginLocalStorage extends Component<Props, State> {
  state = {
    showKey: false,
    passphrase: '',
    wif: ''
  }

  componentDidMount () {
    const { setKeys } = this.props
    // eslint-disable-next-line
    storage.get('keys', (error, data) => {
      setKeys(data)
    })
  }

  toggleKeyVisibility = () => {
    this.setState(prevState => ({
      showKey: !prevState.showKey
    }))
  }

  render () {
    const { accountKeys, history, loginNep2 } = this.props
    const { showKey, passphrase, wif } = this.state
    const loginButtonDisabled = Object.keys(accountKeys).length === 0 || wif === '' || passphrase === ''

    return (
      <Page id='loginPage' className={loginStyles.loginPage}>
        <div className={loginStyles.title}>Login using a saved wallet:</div>
        <select
          className={styles.selectWallet}
          value={wif}
          onChange={(e) => this.setState({ wif: e.target.value })}
        >
          <option value=''>Select a wallet</option>
          {map(accountKeys, (value, key) => <option value={value} key={`wallet${key}`}>{key}</option>)}
        </select>
        <div className={loginStyles.loginForm}>
          <input
            type={showKey ? 'text' : 'password'}
            placeholder='Enter your passphrase here'
            value={passphrase}
            onChange={(e) => this.setState({ passphrase: e.target.value })}
            autoFocus
          />

          {showKey
            ? <FaEyeSlash className={loginStyles.viewKey} onClick={this.toggleKeyVisibility} />
            : <FaEye className={loginStyles.viewKey} onClick={this.toggleKeyVisibility} />
          }
        </div>
        <div>
          <button
            className={loginButtonDisabled ? 'disabled' : ''}
            onClick={() => loginNep2(passphrase, wif, history)}
            disabled={loginButtonDisabled}>Login</button>
          <HomeButtonLink />
        </div>
      </Page>
    )
  }
}
