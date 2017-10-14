// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { decryptWIF } from 'neon-js'
import { login } from '../modules/account'
import { sendEvent, clearTransactionEvent } from '../modules/transactions'
import FaEye from 'react-icons/lib/fa/eye'
import FaEyeSlash from 'react-icons/lib/fa/eye-slash'
import { validatePassphrase } from '../core/wallet'
import Logo from './Logo'
import Footer from './Footer'

type Props = {
    dispatch: DispatchType,
    history: Object,
    decrypting: boolean
}

type State = {
  showKey: boolean,
  wif: string,
  passphrase: string
}

class LoginNep2 extends Component<Props, State> {
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

  onWifChange = () => {
    const { dispatch, history } = this.props
    const { wif, passphrase } = this.state

    if (!passphrase || !wif) { return null }

    if (!validatePassphrase(passphrase)) {
      dispatch(sendEvent(false, 'Passphrase too short'))
      setTimeout(() => dispatch(clearTransactionEvent()), 5000)
      return
    }
    // TODO: changed back to only WIF login for now, getting weird errors with private key hex login
    dispatch(sendEvent(true, 'Decrypting encoded key...'))
    const wrongPassphraseAction = () => {
      dispatch(sendEvent(false, 'Wrong passphrase or invalid encrypted key'))
      setTimeout(() => dispatch(clearTransactionEvent()), 5000)
    }
    setTimeout(() => {
      const encWifValue = wif
      try {
        decryptWIF(encWifValue, passphrase).then((wif) => {
          dispatch(login(wif))
          history.push('/dashboard')
          dispatch(clearTransactionEvent())
        }).catch(() => {
          wrongPassphraseAction()
        })
      } catch (e) {
        wrongPassphraseAction()
      }
    }, 500)
  }

  render () {
    const { decrypting } = this.props
    const { showKey, wif, passphrase } = this.state

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
            <button className='loginButton' onClick={this.onWifChange}>Login</button>
            <Link to='/'><button className='altButton'>Home</button></Link>
          </div>
          {decrypting && <div className='decrypting'>Decrypting keys...</div>}
          <Footer />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  decrypting: state.account.decrypting
})

export default connect(mapStateToProps)(LoginNep2)
