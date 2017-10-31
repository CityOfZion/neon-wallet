// @flow
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Logo from '../../components/Logo'
import Footer from '../../components/Footer'

type Props = {
  ledgerNanoSGetLogin: Function,
  ledgerNanoSGetInfoAsync: Function,
  hardwareDeviceInfo: string,
  hardwarePublicKeyInfo: string,
  publicKey: string,
  history: Object
}

export default class LoginLedgerNanoS extends Component<Props> {
  componentDidMount () {
    this._componentDidMount(this.props.ledgerNanoSGetInfoAsync)
  }

  _componentDidMount = async (getInfoAsync: Function) => {
    await getInfoAsync()
  }

  onLedgerNanoSChange = () => {
    const { ledgerNanoSGetLogin, publicKey, history } = this.props
    if (publicKey) {
      ledgerNanoSGetLogin()
      history.push('/dashboard')
    }
  }

  render () {
    const { hardwareDeviceInfo, hardwarePublicKeyInfo, publicKey } = this.props
    return (
      <div id='loginPage'>
        <div className='login'>
          <div className='loginForm'>
            <Logo />
          </div>
          <div className='loginButtons'>
            <button className={!publicKey && 'disabled'} onClick={this.onLedgerNanoSChange}>Use Ledger Nano S</button>
            <Link to='/'><button className='altButton'>Home</button></Link>
          </div>
          <div id='ledger_device_info'>{hardwareDeviceInfo}</div>
          <div id='ledger_app_info'>{hardwarePublicKeyInfo}</div>
          <Footer />
        </div>
      </div>
    )
  }
}
