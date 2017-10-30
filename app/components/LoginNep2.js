import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { login } from '../modules/account'
import { decryptWIF } from 'neon-js'
// TODO: these event messages should be refactored from transactions
import { sendEvent, clearTransactionEvent } from '../modules/transactions'
import FaEye from 'react-icons/lib/fa/eye'
import FaEyeSlash from 'react-icons/lib/fa/eye-slash'

const logo = require('../images/neon-logo2.png')

let wifInput
let passphraseInput

const onWifChange = (dispatch, history) => {
  if (passphraseInput.value.length < 4) {
    dispatch(sendEvent(false, 'Passphrase too short'))
    setTimeout(() => dispatch(clearTransactionEvent()), 5000)
    return
  }
  // TODO: changed back to only WIF login for now, getting weird errors with private key hex login
  dispatch(sendEvent(true, 'Decrypting encoded key...'))
  setTimeout(() => {
    const encWifValue = wifInput.value
    decryptWIF(encWifValue, passphraseInput.value).then((wif) => {
      dispatch(login(wif))
      history.push('/dashboard')
      dispatch(clearTransactionEvent())
    }).catch(() => {
      dispatch(sendEvent(false, 'Wrong passphrase or invalid encrypted key'))
      setTimeout(() => dispatch(clearTransactionEvent()), 5000)
    })
  }, 500)
}

let LoginNep2 = class LoginNep2 extends Component {
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

    return (
      <div id='loginPage'>
        <div className='login'>
          <div className='logo'><img src={logo} width='60px' /></div>
          <div className='loginForm'>
            <input type={showKey ? 'text' : 'password'} placeholder='Enter your passphrase here' ref={(node) => { passphraseInput = node }} />
            {showKey
              ? <FaEyeSlash className='viewKey' onClick={this.toggleKeyVisibility} />
              : <FaEye className='viewKey' onClick={this.toggleKeyVisibility} />
            }
            <input type='text' placeholder='Enter your encrypted key here' ref={(node) => { wifInput = node }} />
          </div>
          <div className='loginButtons'>
            <button className='loginButton' onClick={(e) => onWifChange(dispatch, history)}>Login</button>
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

LoginNep2.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.object,
  decrypting: PropTypes.bool
}

LoginNep2 = connect(mapStateToProps)(LoginNep2)

export default LoginNep2
