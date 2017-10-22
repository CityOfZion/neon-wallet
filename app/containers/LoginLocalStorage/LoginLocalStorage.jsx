// @flow
import React, { Component } from 'react'
import { Link } from 'react-router'
import classNames from 'classnames'
import storage from 'electron-json-storage'
import { map, noop } from 'lodash'
import FaEye from 'react-icons/lib/fa/eye'
import FaEyeSlash from 'react-icons/lib/fa/eye-slash'
import Logo from '../../components/Logo'
import Footer from '../../components/Footer'
import { ROUTES } from '../../core/constants'

type Props = {
  setKeys: Function,
  loginNep2: Function,
  history: Object,
  decrypting: boolean,
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
    const { accountKeys, decrypting, history, loginNep2 } = this.props
    const { showKey, passphrase, wif } = this.state
    const isLoginButtonDisabled = Object.keys(accountKeys).length === 0 || !wif

    return (
      <div id='loginPage'>
        <div className='login'>
          <Logo />
          <div className='loginForm'>
            <input
              type={showKey ? 'text' : 'password'}
              placeholder='Enter your passphrase here'
              value={passphrase}
              onChange={(e) => this.setState({ passphrase: e.target.value })}
              autoFocus
            />

            {showKey
              ? <FaEyeSlash className='viewKey' onClick={this.toggleKeyVisibility} />
              : <FaEye className='viewKey' onClick={this.toggleKeyVisibility} />
            }

            <div className='selectBox'>
              <label>Wallet:</label>
              <select value={wif} onChange={(e) => this.setState({ wif: e.target.value })}>
                <option value=''>Select a wallet</option>
                {map(accountKeys, (value, key) => <option value={value} key={`wallet${key}`}>{key}</option>)}
              </select>
            </div>
          </div>
          <div className='loginButtons'>
            <button
              className={classNames({'disabled': isLoginButtonDisabled})}
              onClick={() => isLoginButtonDisabled ? noop : loginNep2(passphrase, wif, history)}
              disabled={isLoginButtonDisabled}>Login</button>
            <Link to={ROUTES.HOME}><button className='altButton'>Home</button></Link>
          </div>
          {decrypting && <div className='decrypting'>Decrypting keys...</div>}
          <Footer />
        </div>
      </div>
    )
  }
}
