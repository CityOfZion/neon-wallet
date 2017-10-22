// @flow
import React, { Component } from 'react'
import { Link } from 'react-router'
import Logo from '../../components/Logo'
import Footer from '../../components/Footer'
import { ROUTES } from '../../core/constants'

type Props = {
  loginWithPrivateKey: Function,
  history: Object
}

type State = {
  wif: string
}

export default class LoginTokenSale extends Component<Props, State> {
  state = {
    wif: ''
  }

  render () {
    const { history, loginWithPrivateKey } = this.props
    const { wif } = this.state
    const loginButtonDisabled = wif === ''

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
              autoFocus
            />
          </div>
          <div className='loginButtons'>
            <button
              onClick={() => loginWithPrivateKey(wif, history, ROUTES.TOKEN_SALE)}
              disabled={loginButtonDisabled}
              className={loginButtonDisabled && 'disabled'}>Login</button>
            <Link to={ROUTES.HOME}><button className='altButton'>Home</button></Link>
          </div>
          <Footer />
        </div>
      </div>
    )
  }
}
