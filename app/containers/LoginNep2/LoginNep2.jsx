// @flow
import React, { Component } from 'react'
import FaEye from 'react-icons/lib/fa/eye'
import FaEyeSlash from 'react-icons/lib/fa/eye-slash'
import Page from '../../components/Page'
import HomeButtonLink from '../../components/HomeButtonLink'
import classNames from 'classnames'
import loginStyles from '../../styles/login.scss'

type Props = {
  loginNep2: Function,
  history: Object
}

type State = {
  showKey: boolean,
  wif: string,
  passphrase: string
}

export default class LoginNep2 extends Component<Props, State> {
  state = {
    showKey: false,
    wif: '',
    passphrase: ''
  }

  toggleKeyVisibility = () => {
    this.setState(prevState => ({
      showKey: !prevState.showKey
    }))
  }

  render () {
    const { loginNep2, history } = this.props
    const { showKey, wif, passphrase } = this.state
    const loginButtonDisabled = wif === '' || passphrase === ''

    return (
      <Page id='loginPage' className={loginStyles.loginPage}>
        <div className={loginStyles.title}>Login using an encrypted key:</div>
        <div className={loginStyles.loginForm}>
          <input
            type={showKey ? 'text' : 'password'}
            placeholder='Enter your passphrase here'
            onChange={(e) => this.setState({ passphrase: e.target.value })}
            value={passphrase}
            autoFocus
          />
          {showKey
            ? <FaEyeSlash className={loginStyles.viewKey} onClick={this.toggleKeyVisibility} />
            : <FaEye className={loginStyles.viewKey} onClick={this.toggleKeyVisibility} />
          }
          <input
            type='text'
            placeholder='Enter your encrypted key here'
            onChange={(e) => this.setState({ wif: e.target.value })}
            value={wif}
          />
        </div>
        <div>
          <button
            className={classNames('loginButton', { disabled: loginButtonDisabled })}
            onClick={() => loginNep2(passphrase, wif, history)}
            disabled={loginButtonDisabled}>Login</button>
          <HomeButtonLink />
        </div>
      </Page>
    )
  }
}
