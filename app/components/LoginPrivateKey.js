import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { login } from '../modules/account'
import { sendEvent, clearTransactionEvent } from '../modules/transactions'
import { getAccountFromWIFKey } from 'neon-js'
import FaEye from 'react-icons/lib/fa/eye'
import FaEyeSlash from 'react-icons/lib/fa/eye-slash'

class LoginPrivateKey extends Component {
  state = {
    showKey: false,
    wif: ''
  }

  toggleKeyVisibility = () => {
    this.setState(prevState => ({
      showKey: !prevState.showKey
    }))

  handleInputChange = (e) => {
    const value = e.target.value

    this.setState({
      wif: value
    })
  }

  handleVerify = () => {
    const { onWifChange, dispatch, verifyPrivateKey, history } = this.props
    const { wif } = this.state

    onWifChange(dispatch, verifyPrivateKey, history, wif)
  }

  render () {
    const { showKey } = this.state
    const logo = require('../images/neon-logo2.png')

    return (
      <div id='loginPage'>
        <div className='login'>
          <div className='loginForm'>
            <div className='logo'><img src={logo} width='60px' /></div>
            <input type={showKey ? 'text' : 'password'} placeholder='Enter your private key here (WIF)' onChange={this.handleInputChange} />

            {showKey
              ? <FaEyeSlash className='viewKey' onClick={this.toggleKeyVisibility} />
              : <FaEye className='viewKey' onClick={this.toggleKeyVisibility} />
            }
          </div>
          <div className='loginButtons'>
            <button onClick={this.handleVerify}>Login</button>
            <Link to='/'><button className='altButton'>Home</button></Link>
          </div>
          <div id='footer'>Created by Ethan Fast and COZ. Donations: Adr3XjZ5QDzVJrWvzmsTTchpLRRGSzgS5A</div>
        </div>
      </div>
    )
  }
}

LoginPrivateKey.propTypes = {
  dispatch: PropTypes.func.isRequired,
  onWifChange: PropTypes.func.isRequired,
  verifyPrivateKey: PropTypes.func.isRequired,
  history: PropTypes.object
}

const mapStateToProps = (state) => ({
  loggedIn: state.account.loggedIn,
  wif: state.account.wif
})

const mapActionCreators = (dispatch) => {
  return {
    dispatch,
    // TODO: move to neon-js
    verifyPrivateKey: (wif) => {
      try {
        // TODO: better check
        // eslint-disable-next-line
        getAccountFromWIFKey(wif).address
      } catch (e) {
        return false
      }
      return true
    },
    onWifChange: (dispatch, verifyPrivateKey, history, wif) => {
      // TODO: changed back to only WIF login for now, getting weird errors with private key hex login
      if (verifyPrivateKey(wif) === true) {
        dispatch(login(wif))
        history.push('/dashboard')
      } else {
        dispatch(sendEvent(false, 'That is not a valid private key'))
        setTimeout(() => dispatch(clearTransactionEvent()), 5000)
      }
    }
  }
}

export default connect(mapStateToProps, mapActionCreators)(LoginPrivateKey)
