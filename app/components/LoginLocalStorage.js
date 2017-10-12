// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { login, setKeys } from '../modules/account'
import { decryptWIF } from 'neon-js'
import storage from 'electron-json-storage'
import { map } from 'lodash'
import { sendEvent, clearTransactionEvent } from '../modules/transactions'
import FaEye from 'react-icons/lib/fa/eye'
import FaEyeSlash from 'react-icons/lib/fa/eye-slash'
import { validatePassphrase } from '../core/wallet'
import Logo from './Logo'
import Footer from './Footer'

type Props = {
  dispatch: DispatchType,
  history: Object,
  decrypting: boolean,
  accountKeys: Object,
}

let LoginLocalStorage = class LoginLocalStorage extends Component<Props, State> {
  wifInput: ?HTMLInputElement
  passphraseInput: ?HTMLInputElement

  state = {
    showKey: false
  }

  componentDidMount () {
    const { dispatch } = this.props
    // eslint-disable-next-line
    storage.get('keys', (error, data) => {
      dispatch(setKeys(data))
    })
  }

  onWifChange = () => {
    const { dispatch, history } = this.props

    const passphrase = this.passphraseInput && this.passphraseInput.value
    const wif = this.wifInput && this.wifInput.value

    if (!passphrase || !wif) { return null }

    if (!validatePassphrase(passphrase)) {
      dispatch(sendEvent(false, 'Passphrase too short'))
      setTimeout(() => dispatch(clearTransactionEvent()), 5000)
      return
    }
    if (wif !== 'Select a wallet') {
      dispatch(sendEvent(true, 'Decrypting encoded key...'))
      setTimeout(() => {
        decryptWIF(wif, passphrase).then((wif) => {
          dispatch(login(wif))
          history.push('/dashboard')
          dispatch(clearTransactionEvent())
        }).catch(() => {
          dispatch(sendEvent(false, 'Wrong passphrase'))
          setTimeout(() => dispatch(clearTransactionEvent()), 5000)
        })
      }, 500)
    }
  }

  toggleKeyVisibility = () => {
    this.setState(prevState => ({
      showKey: !prevState.showKey
    }))
  }

  render () {
    const { accountKeys, decrypting } = this.props
    const { showKey } = this.state

    return (<div id='loginPage'>
      <div className='login'>
        <Logo />
        <div className='loginForm'>
          <input type={showKey ? 'text' : 'password'} placeholder='Enter your passphrase here' ref={(node) => { this.passphraseInput = node }} />

          {showKey
            ? <FaEyeSlash className='viewKey' onClick={this.toggleKeyVisibility} />
            : <FaEye className='viewKey' onClick={this.toggleKeyVisibility} />
          }

          <div className='selectBox'>
            <label>Wallet:</label>
            <select defaultValue='' ref={(node) => { this.wifInput = node }}>
              <option value='' disabled='disabled'>Select a wallet</option>
              {map(accountKeys, (value, key) => <option value={value} key={`wallet${key}`}>{key}</option>)}
            </select>
          </div>
        </div>
        <div className='loginButtons'>
          { Object.keys(accountKeys).length === 0
            ? <button className='disabled' disabled='disabled'>Login</button>
            : <button onClick={this.onWifChange}>Login</button> }
          <Link to='/'><button className='altButton'>Home</button></Link>
        </div>
        {decrypting && <div className='decrypting'>Decrypting keys...</div>}
        <Footer />
      </div>
    </div>)
  }
}

const mapStateToProps = (state) => ({
  loggedIn: state.account.loggedIn,
  wif: state.account.wif,
  decrypting: state.account.decrypting,
  accountKeys: state.account.accountKeys
})

LoginLocalStorage = connect(mapStateToProps)(LoginLocalStorage)

export default LoginLocalStorage
