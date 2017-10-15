// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { login } from '../modules/account'
import { sendEvent, clearTransactionEvent } from '../modules/transactions'
import FaEye from 'react-icons/lib/fa/eye'
import FaEyeSlash from 'react-icons/lib/fa/eye-slash'
import Logo from './Logo'
import Footer from './Footer'
import { verifyPrivateKey } from '../core/wallet'

type Props = {
    dispatch: DispatchType,
    onWifChange: Function,
    history: Object
}

type State = {
  showKey: boolean,
  wif: string,
}

class LoginPrivateKey extends Component<Props, State> {
  state = {
    showKey: false,
    wif: ''
  }

  toggleKeyVisibility = () => {
    this.setState(prevState => ({
      showKey: !prevState.showKey
    }))
  }

  handleInputChange = (e) => {
    const value = e.target.value

    this.setState({
      wif: value
    })
  }

  handleVerify = () => {
    const { onWifChange, dispatch, history } = this.props
    const { wif } = this.state

    onWifChange(dispatch, history, wif)
  }

  render () {
    const { showKey } = this.state

    return (
      <div id='loginPage'>
        <div className='login'>
          <div className='loginForm'>
            <Logo />
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
          <Footer />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  loggedIn: state.account.loggedIn,
  wif: state.account.wif
})

const mapActionCreators = (dispatch: DispatchType) => {
  return {
    dispatch,
    onWifChange: (dispatch: DispatchType, history: Object, wif: string) => {
      if (verifyPrivateKey(wif)) {
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
