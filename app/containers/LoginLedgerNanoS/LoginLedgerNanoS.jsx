// @flow
import React, { Component } from 'react'
import { Link } from 'react-router'
import Logo from '../../components/Logo'
import Footer from '../../components/Footer'

type Props = {
  ledgerNanoSGetLogin: Function,
  ledgerNanoSGetInfoAsync: Function,
  hardwareDeviceInfo: string,
  hardwarePublicKeyInfo: string,
  hardwarePublicKey: string,
  history: Object
}

export default class LoginLedgerNanoS extends Component<Props> {
  componentDidMount () {
    this._componentDidMount()
  }

  _componentDidMount = async () => {
    // process.stdout.write('started componentDidMount  \n')
    await this.props.ledgerNanoSGetInfoAsync()
    // process.stdout.write('success componentDidMount  \n')
  }

  onLedgerNanoSChange = () => {
    const { ledgerNanoSGetLogin, hardwarePublicKey, history } = this.props
    if (hardwarePublicKey !== undefined) {
      ledgerNanoSGetLogin(hardwarePublicKey)
      history.push('/dashboard')
    }
  }

  render () {
    const { hardwareDeviceInfo, hardwarePublicKeyInfo } = this.props
    return (
      <div id='loginPage'>
        <div className='login'>
          <div className='loginForm'>
            <Logo />
          </div>
          <div className='loginButtons'>
            <button onClick={this.onLedgerNanoSChange}>Use Ledger Nano S</button>
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
