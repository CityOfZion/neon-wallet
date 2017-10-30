import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { login } from '../modules/account'
import { sendEvent, clearTransactionEvent } from '../modules/transactions'
import { getAccountFromWIFKey } from 'neon-js'

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

const onWifChange = (dispatch, history, wif) => {
  const value = wif.value
  // TODO: changed back to only WIF login for now, getting weird errors with private key hex login
  if (value && verifyPrivateKey(value) === true) {
    dispatch(login(value))
    history.push('/tokenSale')
  } else {
    dispatch(sendEvent(false, 'That is not a valid private key'))
    setTimeout(() => dispatch(clearTransactionEvent()), 5000)
  }
}

let LoginTokenSale = ({ dispatch, loggedIn, wif, history }) =>
  <div id='loginPage'>
    <div className='login'>
      <div className='loginForm'>
        <div className='logo'><img src={logo} width='60px' /></div>
        <input type='text' placeholder='Enter your private key here (WIF)' ref={(node) => { wif = node }} />
      </div>
      <div className='loginButtons'>
        <button onClick={(e) => onWifChange(dispatch, history, wif)}>Login</button>
        <Link to='/'><button className='altButton'>Home</button></Link>
      </div>
      <div id='footer'>Created by Ethan Fast and CoZ. Donations: Adr3XjZ5QDzVJrWvzmsTTchpLRRGSzgS5A</div>
    </div>
  </div>

const mapStateToProps = (state) => ({
  loggedIn: state.account.loggedIn,
  wif: state.account.wif
})

LoginTokenSale.propTypes = {
  dispatch: PropTypes.func.isRequired,
  loggedIn: PropTypes.bool,
  wif: PropTypes.string,
  history: PropTypes.object
}

LoginTokenSale = connect(mapStateToProps)(LoginTokenSale)

export default LoginTokenSale
