// @flow
import React, { Component } from 'react'
import { Link } from 'react-router'
import FaEye from 'react-icons/lib/fa/eye'
import FaEyeSlash from 'react-icons/lib/fa/eye-slash'
import Logo from '../../components/Logo'
import Footer from '../../components/Footer'

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
      <div id='loginPage'>
        <div className='login'>
          <div className='loginForm'>
            <Logo />
            <input
              type={showKey ? 'text' : 'password'}
              placeholder='Enter your private key here (WIF)'
              onChange={(e) => this.setState({ wif: e.target.value })}
              autoFocus
            />

            {showKey
              ? <FaEyeSlash className='viewKey' onClick={this.toggleKeyVisibility} />
              : <FaEye className='viewKey' onClick={this.toggleKeyVisibility} />
            }
          </div>
          <div className='loginButtons'>
            <button
              onClick={() => loginWithPrivateKey(wif, history)}
              disabled={loginButtonDisabled}
              className={loginButtonDisabled && 'disabled'}>Login</button>
            <Link to='/'><button className='altButton'>Home</button></Link>
          </div>
          <Footer />
        </div>
      </div>
    )
  }
}
