// @flow
import React, { Component } from 'react'
import { Link } from 'react-router'
import FaEye from 'react-icons/lib/fa/eye'
import FaEyeSlash from 'react-icons/lib/fa/eye-slash'
import Logo from '../../components/Logo'
import Footer from '../../components/Footer'
import { ROUTES } from '../../core/constants'

type Props = {
    loginNep2: Function,
    history: Object,
    decrypting: boolean
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
    const { decrypting, loginNep2, history } = this.props
    const { showKey, wif, passphrase } = this.state
    const loginButtonDisabled = wif === '' || passphrase === ''

    return (
      <div id='loginPage'>
        <div className='login'>
          <Logo />
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
              className={loginButtonDisabled && 'disabled'}
              onClick={() => loginNep2(passphrase, wif, history)}
              disabled={loginButtonDisabled}>Login</button>
            <Link to={ROUTES.HOME}><button className='altButton'>Home</button></Link>
          </div>
          {decrypting && <div className='decrypting'>Decrypting keys...</div>}
          <Footer />
        </div>
      </div>
    )
  }
}
