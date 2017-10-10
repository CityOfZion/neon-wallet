import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { login, setKeys } from '../modules/account'
import { decryptWIF } from 'neon-js'
import storage from 'electron-json-storage'
import { map } from 'lodash'
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
  
  if (wif_input.value !== 'Select a wallet') {
    dispatch(sendEvent(true, "Decrypting encoded key..."))
    setTimeout(() => {
      decryptWIF(wif_input.value, passphrase_input.value).then((wif) => {
        dispatch(login(wif));
        history.push('/dashboard')
        dispatch(clearTransactionEvent())
      }).catch(() => {
        dispatch(sendEvent(false, "Wrong passphrase"));
        setTimeout(() => dispatch(clearTransactionEvent()), 5000)
      })
    }, 500)
  } else {
    dispatch(sendEvent(false, "Please select a wallet"));
  }
}

class LoginLocalStorage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showKey: false,
    }

let LoginLocalStorage = class LoginLocalStorage extends Component {
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

    return (<div id='loginPage'>
      <div className='login'>
        <div className='logo'><img src={logo} width='60px' /></div>
        <div className='loginForm'>
          <input type={showKey ? 'text' : 'password'} placeholder='Enter your passphrase here' ref={(node) => { passphraseInput = node }} />

          {showKey
            ? <FaEyeSlash className='viewKey' onClick={this.toggleKeyVisibility} />
            : <FaEye className='viewKey' onClick={this.toggleKeyVisibility} />
          }

          <div className='selectBox'>
            <label>Wallet:</label>
            <select ref={(node) => { wifInput = node }}>
              <option selected='selected' disabled='disabled'>Select a wallet</option>
              {map(accountKeys, (value, key) => <option value={value}>{key}</option>)}
            </select>
          </div>
        </div>
        <div className='loginButtons'>
          { Object.keys(accountKeys).length === 0 ? <button className='disabled' disabled='disabled'>Login</button> : <button onClick={(e) => onWifChange(dispatch, history)}>Login</button> }
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

LoginLocalStorage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.object,
  decrypting: PropTypes.bool,
  accountKeys: PropTypes.any // TODO: Use correct shape
}

LoginLocalStorage = connect(mapStateToProps)(LoginLocalStorage)

export default LoginLocalStorage
