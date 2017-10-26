// @flow
import React, { Component } from 'react'
import { Link } from 'react-router'
import FaEye from 'react-icons/lib/fa/eye'
import FaEyeSlash from 'react-icons/lib/fa/eye-slash'
import Page from '../../components/Page'
import { ROUTES } from '../../core/constants'

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
    const loginButtonDisabled = wif === '' || passphrase === '' ? 'disabled' : ''

    return (
      <Page id='loginPage'>
        <div className='login'>
          <div className='loginForm'>
            <input
              type={showKey ? 'text' : 'password'}
              placeholder='Enter your passphrase here'
              onChange={(e) => this.setState({ passphrase: e.target.value })}
              value={passphrase}
              autoFocus
            />
            {showKey
              ? <FaEyeSlash className='viewKey' onClick={this.toggleKeyVisibility} />
              : <FaEye className='viewKey' onClick={this.toggleKeyVisibility} />
            }
            <input
              type='text'
              placeholder='Enter your encrypted key here'
              onChange={(e) => this.setState({ wif: e.target.value })}
              value={wif}
            />
          </div>
          <div className='loginButtons'>
            <button
              className={`loginButton ${loginButtonDisabled}`}
              onClick={() => loginNep2(passphrase, wif, history)}
              disabled={loginButtonDisabled}>Login</button>
            <Link to={ROUTES.HOME}><button className='altButton'>Home</button></Link>
          </div>
        </div>
      </Page>
    )
  }
}
