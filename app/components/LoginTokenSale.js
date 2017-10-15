// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { login } from '../modules/account'
import { sendEvent, clearTransactionEvent } from '../modules/transactions'
import Logo from './Logo'
import Footer from './Footer'
import { verifyPrivateKey } from '../core/wallet'

type Props = {
  dispatch: DispatchType,
  history: Object
}

type State = {
  wif: string
}

class LoginTokenSale extends Component<Props, State> {
  state = {
    wif: ''
  }
  onWifChange = () => {
    const { dispatch, history } = this.props
    const { wif } = this.state

    if (verifyPrivateKey(wif)) {
      dispatch(login(wif))
      history.push('/tokenSale')
    } else {
      dispatch(sendEvent(false, 'That is not a valid private key'))
      setTimeout(() => dispatch(clearTransactionEvent()), 5000)
    }
  }

  render () {
    const { wif } = this.state
    return (
      <div id='loginPage'>
        <div className='login'>
          <div className='loginForm'>
            <Logo />
            <input
              type='text'
              placeholder='Enter your private key here (WIF)'
              onChange={(e) => this.setState({ wif: e.target.value })}
              value={wif}
            />
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
