// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { login, setKeys } from '../modules/account'
import { decryptWIF } from 'neon-js'
import storage from 'electron-json-storage'
import { map, noop } from 'lodash'
// TODO: these event messages should be refactored from transactions
import { sendEvent, clearTransactionEvent } from '../modules/transactions'
import FaEye from 'react-icons/lib/fa/eye'
import FaEyeSlash from 'react-icons/lib/fa/eye-slash'
import { validatePassphrase } from '../core/wallet'

const logo = require('../images/neon-logo2.png')

const onWifChange = (dispatch: DispatchType, history: Object, passphrase: string, wif: WIFType) => {
  if (!validatePassphrase(passphrase)) {
    dispatch(sendEvent(false, 'Passphrase too short'))
    setTimeout(() => dispatch(clearTransactionEvent()), 5000)
    return
  }
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

type Props = {
  dispatch: DispatchType,
  history: Object,
  decrypting: boolean,
  accountKeys: Object,
}

type State = {
  showKey: boolean
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

  toggleKeyVisibility = () => {
    this.setState(prevState => ({
      showKey: !prevState.showKey
    }))
  }

  render () {
    const { dispatch, accountKeys, decrypting, history } = this.props
    const { showKey } = this.state
    const passpharse = this.passphraseInput && this.passphraseInput.value
    const wif = this.wifInput && this.wifInput.value

    return (<div id='loginPage'>
      <div className='login'>
        <div className='logo'><img src={logo} width='60px' /></div>
        <div className='loginForm'>
          <input type={showKey ? 'text' : 'password'} placeholder='Enter your passphrase here' ref={(node) => { this.passphraseInput = node }} />

          {showKey
            ? <FaEyeSlash className='viewKey' onClick={this.toggleKeyVisibility} />
            : <FaEye className='viewKey' onClick={this.toggleKeyVisibility} />
          }

          <div className='selectBox'>
            <label>Wallet:</label>
            <select ref={(node) => { this.wifInput = node }}>
              <option selected='selected' disabled='disabled'>Select a wallet</option>
              {map(accountKeys, (value, key) => <option value={value}>{key}</option>)}
            </select>
          </div>
        </div>
        <div className='loginButtons'>
          { Object.keys(accountKeys).length === 0
            ? <button className='disabled' disabled='disabled'>Login</button>
            : <button onClick={(e) => passpharse && wif ? onWifChange(dispatch, history, passpharse, wif) : noop}>Login</button> }
          <Link to='/'><button className='altButton'>Home</button></Link>
        </div>
        {decrypting && <div className='decrypting'>Decrypting keys...</div>}
        <div id='footer'>Created by Ethan Fast and COZ. Donations: Adr3XjZ5QDzVJrWvzmsTTchpLRRGSzgS5A</div>
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
