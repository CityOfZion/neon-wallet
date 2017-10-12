// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { getAccountFromWIFKey } from 'neon-js'
import { login } from '../modules/account'
import { sendEvent, clearTransactionEvent } from '../modules/transactions'
import Logo from './Logo'
import Footer from './Footer'

const verifyPrivateKey = (wif: string) => {
  try {
    // eslint-disable-next-line
    getAccountFromWIFKey(wif).address
  } catch (e) {
    return false
  }
  return true
}

type Props = {
  dispatch: DispatchType,
  history: Object
}

let LoginTokenSale = class LoginTokenSale extends Component<Props> {
  wifInput: ?HTMLInputElement

  onWifChange = () => {
    const { dispatch, history } = this.props
    const wif = this.wifInput && this.wifInput.value

    // TODO: changed back to only WIF login for now, getting weird errors with private key hex login
    if (wif && verifyPrivateKey(wif) === true) {
      dispatch(login(wif))
      history.push('/tokenSale')
    } else {
      dispatch(sendEvent(false, 'That is not a valid private key'))
      setTimeout(() => dispatch(clearTransactionEvent()), 5000)
    }
  }

  render () {
    return (
      <div id='loginPage'>
        <div className='login'>
          <div className='loginForm'>
            <Logo />
            <input type='text' placeholder='Enter your private key here (WIF)' ref={(node) => { this.wifInput = node }} />
          </div>
          <div className='loginButtons'>
            <button onClick={this.onWifChange}>Login</button>
            <Link to='/'><button className='altButton'>Home</button></Link>
          </div>
          <Footer />
        </div>
      </div>
    )
  }
}

export default connect()(LoginTokenSale)
