// @flow
import React, { Component } from 'react'
import { Link } from 'react-router'
import FaEye from 'react-icons/lib/fa/eye'
import FaEyeSlash from 'react-icons/lib/fa/eye-slash'

import { KEYS } from '../../core/constants'
import Logo from '../../components/Logo'
import Footer from '../../components/Footer'

type Props = {
    onWifChange: Function,
    history: Object
}

type State = {
  showKey: boolean,
  wif: string,
}

export default class LoginPrivateKey extends Component<Props, State> {
  state = {
    showKey: false,
    wif: ''
  }

  toggleKeyVisibility = () => {
    this.setState(prevState => ({
      showKey: !prevState.showKey
    }))
  }

  handleInputChange = (e: SyntheticInputEvent<*>) => {
    const value = e.target.value

    this.setState({
      wif: value
    })
  }

  handleVerify = () => {
    const { onWifChange, history } = this.props
    const { wif } = this.state

    onWifChange(history, wif)
  }

  handleKeyPress = (e: SyntheticInputEvent<*>) => {
    if (e.key === KEYS.ENTER) {
      this.handleVerify()
    }
  }
    
  render () {
    const { showKey } = this.state

    return (
      <div id='loginPage'>
        <div className='login'>
          <div className='loginForm'>
            <Logo />

            <input type={showKey ? 'text' : 'password'} placeholder='Enter your private key here (WIF)' onChange={this.handleInputChange} onKeyDown={this.handleKeyPress} />

            <input type={showKey ? 'text' : 'password'} placeholder='Enter your private key here (WIF)' onChange={this.handleInputChange} />

            {showKey
              ? <FaEyeSlash className='viewKey' onClick={this.toggleKeyVisibility} />
              : <FaEye className='viewKey' onClick={this.toggleKeyVisibility} />
            }
          </div>
          <div className='loginButtons'>
            <button className='loginButton' onClick={this.handleVerify}>Login</button>

            <button onClick={this.handleVerify}>Login</button>

            <Link to='/'><button className='altButton'>Home</button></Link>
          </div>
          <Footer />
        </div>
      </div>
    )
  }
}
