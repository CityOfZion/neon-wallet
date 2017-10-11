// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { decryptWIF } from 'neon-js'
import { noop } from 'lodash'
import { login } from '../modules/account'
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
  // TODO: changed back to only WIF login for now, getting weird errors with private key hex login
  dispatch(sendEvent(true, 'Decrypting encoded key...'))
  setTimeout(() => {
    const encWifValue = wif
    decryptWIF(encWifValue, passphrase).then((wif) => {
      dispatch(login(wif))
      history.push('/dashboard')
      dispatch(clearTransactionEvent())
    }).catch(() => {
      dispatch(sendEvent(false, 'Wrong passphrase or invalid encrypted key'))
      setTimeout(() => dispatch(clearTransactionEvent()), 5000)
    })
  }, 500)
}

type Props = {
    dispatch: DispatchType,
    history: Object,
    decrypting: boolean
}

type State = {
  showKey: boolean
}

let LoginNep2 = class LoginNep2 extends Component<Props, State> {
  wifInput: ?HTMLInputElement
  passphraseInput: ?HTMLInputElement

  state = {
    showKey: false
  }

  toggleKeyVisibility = () => {
    this.setState(prevState => ({
      showKey: !prevState.showKey
    }))
  }

  render () {
    const { dispatch, decrypting, history } = this.props
    const { showKey } = this.state
    const passpharse = this.passphraseInput && this.passphraseInput.value
    const wif = this.wifInput && this.wifInput.value

    return (
      <div id='loginPage'>
        <div className='login'>
          <div className='logo'><img src={logo} width='60px' /></div>
          <div className='loginForm'>
            <input type={showKey ? 'text' : 'password'} placeholder='Enter your passphrase here' ref={(node) => { this.passphraseInput = node }} />
            {showKey
              ? <FaEyeSlash className='viewKey' onClick={this.toggleKeyVisibility} />
              : <FaEye className='viewKey' onClick={this.toggleKeyVisibility} />
            }
            <input type='text' placeholder='Enter your encrypted key here' ref={(node) => { this.wifInput = node }} />
          </div>
          <div className='loginButtons'>
            <button className='loginButton' onClick={(e) => passpharse && wif ? onWifChange(dispatch, history, passpharse, wif) : noop}>Login</button>
            <Link to='/'><button className='altButton'>Home</button></Link>
          </div>
          {decrypting && <div className='decrypting'>Decrypting keys...</div>}
          <div id='footer'>Created by Ethan Fast and COZ. Donations: Adr3XjZ5QDzVJrWvzmsTTchpLRRGSzgS5A</div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  decrypting: state.account.decrypting
})

LoginNep2 = connect(mapStateToProps)(LoginNep2)

export default LoginNep2
