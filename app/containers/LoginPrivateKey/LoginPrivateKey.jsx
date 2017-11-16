// @flow
import React, { Component } from 'react'
import FaEye from 'react-icons/lib/fa/eye'
import FaEyeSlash from 'react-icons/lib/fa/eye-slash'
import Page from '../../components/Page'
import HomeButtonLink from '../../components/HomeButtonLink'
import loginStyles from '../../styles/login.scss'

type Props = {
    loginWithPrivateKey: Function,
    history: Object
}

type State = {
  showKey: boolean,
  wif: string,
}

export default class LoginPrivateKey extends Component<Props, State> {
  state = {
    showKey: false,
    wif: ''
  }

  toggleKeyVisibility = () => {
    this.setState(prevState => ({
      showKey: !prevState.showKey
    }))
  }

  render () {
    const { history, loginWithPrivateKey } = this.props
    const { showKey, wif } = this.state
    const loginButtonDisabled = wif === ''

    return (
      <Page id='loginPage' className={loginStyles.loginPage}>
        <div className={loginStyles.title}>Login using a private key:</div>
        <div className={loginStyles.loginForm}>
          <input
            type={showKey ? 'text' : 'password'}
            placeholder='Enter your private key here (WIF)'
            onChange={(e) => this.setState({ wif: e.target.value })}
            autoFocus
          />

          {showKey
            ? <FaEyeSlash className={loginStyles.viewKey} onClick={this.toggleKeyVisibility} />
            : <FaEye className={loginStyles.viewKey} onClick={this.toggleKeyVisibility} />
          }
        </div>
        <div>
          <button
            onClick={() => loginWithPrivateKey(wif, history)}
            disabled={loginButtonDisabled}
            className={loginButtonDisabled ? 'disabled' : ''}>Login</button>
          <HomeButtonLink />
        </div>
      </Page>
    )
  }
}
