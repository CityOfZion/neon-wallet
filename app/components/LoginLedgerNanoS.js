// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { ledgerNanoSGetLogin } from '../modules/account'
import Logo from './Logo'
import Footer from './Footer'
import {
  ledgerNanoSGetAsynchGetInfo,
  ledgerNanoSGetPublicKey,
  ledgerNanoSGetDeviceInfo,
  ledgerNanoSGetPublicKeyInfo
} from '../modules/ledgerNanoS'

type Props = {
  dispatch: DispatchType,
  history: Object
}

class LoginLedgerNanoS extends Component<Props> {
  componentDidMount () {
    process.stdout.write('started componentDidMount  \n')
    const thenFn = () => {
      process.stdout.write('started componentDidMount.forceUpdate  \n')
      this.forceUpdate()
      process.stdout.write('success componentDidMount.forceUpdate  \n')
    }
    const catchFn = function (reason) {
      process.stdout.write('componentDidMount error reason ' + reason + '\n')
    }
    ledgerNanoSGetAsynchGetInfo().then(thenFn).catch(catchFn)
    process.stdout.write('success componentDidMount  \n')
  }

    onLedgerNanoSChange = () => {
      const { dispatch, history } = this.props
      if (ledgerNanoSGetPublicKey !== undefined) {
        dispatch(ledgerNanoSGetLogin())
        history.push('/dashboard')
      }
    }

    render () {
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
            <div id='ledger_device_info'>{ledgerNanoSGetDeviceInfo}</div>
            <div id='ledger_app_info'>{ledgerNanoSGetPublicKeyInfo}</div>
            <Footer />
          </div>
        </div>
      )
    }
}

export default connect()(LoginLedgerNanoS)
