import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { ledgerNanoSGetLogin } from '../modules/account'

import { ledgerNanoSGetAsynchGetInfo, ledgerNanoSGetPublicKey, ledgerNanoSGetDeviceInfo, ledgerNanoSGetPublicKeyInfo } from '../modules/ledgerNanoS'

const logo = require('../images/neon-logo2.png')

const onLedgerNanoSChange = (dispatch, history) => {
  if (ledgerNanoSGetPublicKey !== undefined) {
    dispatch(ledgerNanoSGetLogin())
    history.push('/dashboard')
  }
}

let LoginLedgerNanoS = class LoginLedgerNanoS extends Component {
    componentDidMount = () => {
      const self = this
      process.stdout.write('started componentDidMount  \n')
      var thenFn = function () {
        process.stdout.write('started componentDidMount.forceUpdate  \n')
        self.forceUpdate()
        process.stdout.write('success componentDidMount.forceUpdate  \n')
      }
      var catchFn = function (reason) {
        process.stdout.write('componentDidMount error reason ' + reason + '\n')
      }
      ledgerNanoSGetAsynchGetInfo().then(thenFn).catch(catchFn)
      process.stdout.write('success componentDidMount  \n')
    }
    render = () => {
      const dispatch = this.props.dispatch
      const history = this.props.history
      return (
        <div id='loginPage'>
          <div className='login'>
            <div className='loginForm'>
              <div className='logo'><img src={logo} width='60px' /></div>
            </div>
            <div className='loginButtons'>
              <button onClick={(e) => onLedgerNanoSChange(dispatch, history)}>Use Ledger Nano S</button>
              <Link to='/'><button className='altButton'>Home</button></Link>
            </div>
            <div id='ledger_device_info'>{ledgerNanoSGetDeviceInfo}</div>
            <div id='ledger_app_info'>{ledgerNanoSGetPublicKeyInfo}</div>
            <div id='footer'>Created by Ethan Fast and COZ. Ledger Integration by Coranos. Donations: Adr3XjZ5QDzVJrWvzmsTTchpLRRGSzgS5A</div>
          </div>
        </div>
      )
    }
}

const mapStateToProps = (state) => ({
})

LoginLedgerNanoS.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.object
}
LoginLedgerNanoS = connect(mapStateToProps)(LoginLedgerNanoS)

export default LoginLedgerNanoS
