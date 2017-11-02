// @flow
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Page from '../../components/Page'

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
    // process.stdout.write('started componentDidMount  \n')
    await getInfoAsync()
    // process.stdout.write('success componentDidMount  \n')
  }

  onLedgerNanoSChange = () => {
    const { ledgerNanoSGetLogin, publicKey, history } = this.props
    if (publicKey) {
      ledgerNanoSGetLogin()
      history.push('/dashboard')
    }
  }

  render () {
    const { hardwareDeviceInfo, hardwarePublicKeyInfo } = this.props
    return (
      <Page id='loginPage'>
        <div className='login'>
          <p>Login using the Ledger Nano S:</p>
          <div className='loginForm'>
            <div className='loginButtons'>
              <button onClick={this.onLedgerNanoSChange}>Use Ledger Nano S</button>
              <Link to='/'><button className='altButton'>Home</button></Link>
            </div>
            <div id='ledger_device_info'>{hardwareDeviceInfo}</div>
            <div id='ledger_app_info'>{hardwarePublicKeyInfo}</div>
          </div>
        </div>
      </Page>
    )
  }
}
