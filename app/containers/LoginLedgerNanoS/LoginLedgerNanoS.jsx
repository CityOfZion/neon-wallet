// @flow
import React, { Component } from 'react'
import Page from '../../components/Page'
import loginStyles from '../../styles/login.scss'
import HomeButtonLink from '../../components/HomeButtonLink'
import { ROUTES } from '../../core/constants'

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
      history.push(ROUTES.DASHBOARD)
    }
  }

  render () {
    const { hardwareDeviceInfo, hardwarePublicKeyInfo, publicKey } = this.props
    return (
      <Page id='loginPage' className={loginStyles.loginPage}>
        <div className={loginStyles.title}>Login using the Ledger Nano S:</div>
        <div className={loginStyles.loginForm}>
          <div>
            <button className={!publicKey ? 'disabled' : ''} onClick={this.onLedgerNanoSChange}>Use Ledger Nano S</button>
            <HomeButtonLink />
          </div>
          <p>{hardwareDeviceInfo}</p>
          <p>{hardwarePublicKeyInfo}</p>
        </div>
      </Page>
    )
  }
}
