// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { noop } from 'lodash'
import { Link } from 'react-router'
import { getAccountFromWIFKey } from 'neon-js'
import { login } from '../modules/account'
import { sendEvent, clearTransactionEvent } from '../modules/transactions'

// TODO: it is ridiculous that i just copy/pasted this file. we need some heavy refactoring...

const logo = require('../images/neon-logo2.png')

// TODO: move to neon-js
const verifyPrivateKey = (wif) => {
  try {
    // TODO: better check
    // eslint-disable-next-line
    getAccountFromWIFKey(wif).address
  } catch (e) {
    return false
  }
  return true
}

const onWifChange = (dispatch: DispatchType, history: Object, wif: WIFType) => {
  // TODO: changed back to only WIF login for now, getting weird errors with private key hex login
  if (verifyPrivateKey(wif) === true) {
    dispatch(login(wif))
    history.push('/tokenSale')
  } else {
    dispatch(sendEvent(false, 'That is not a valid private key'))
    setTimeout(() => dispatch(clearTransactionEvent()), 5000)
  }
}

type Props = {
  dispatch: DispatchType,
  history: Object
}

let LoginTokenSale = class LoginTokenSale extends Component<Props> {
  wifInput: ?HTMLInputElement

  render () {
    const { dispatch, history } = this.props
    const wif = this.wifInput && this.wifInput.value

    return (
      <div id='loginPage'>
        <div className='login'>
          <div className='loginForm'>
            <div className='logo'><img src={logo} width='60px' /></div>
            <input type='text' placeholder='Enter your private key here (WIF)' ref={(node) => { this.wifInput = node }} />
          </div>
          <div className='loginButtons'>
            <button onClick={(e) => wif ? onWifChange(dispatch, history, wif) : noop}>Login</button>
            <Link to='/'><button className='altButton'>Home</button></Link>
          </div>
          <div id='footer'>Created by Ethan Fast and CoZ. Donations: Adr3XjZ5QDzVJrWvzmsTTchpLRRGSzgS5A</div>
        </div>
      </div>
    )
  }
}

export default connect(LoginTokenSale)
