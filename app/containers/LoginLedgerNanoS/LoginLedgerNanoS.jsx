// @flow
import React, { Component } from 'react'

import HomeButtonLink from '../../components/HomeButtonLink'
import Button from '../../components/Button'

import { ROUTES, FINDING_LEDGER_NOTICE } from '../../core/constants'

import loginStyles from '../../styles/login.scss'

type Props = {
  ledgerNanoSGetLogin: Function,
  ledgerNanoSGetInfoAsync: Function,
  hardwareDeviceInfo: string,
  hardwarePublicKeyInfo: string,
  publicKey: string,
  history: Object
}
type State = {
  intervalId: any
}

export default class LoginLedgerNanoS extends Component<Props, State> {
  state = {
    intervalId: null
  }

  componentDidMount () {
    const { ledgerNanoSGetInfoAsync } = this.props
    const intervalId = setInterval(async () => {
      await ledgerNanoSGetInfoAsync()
    }, 1000)
    this.setState({ intervalId })
  }

  shouldComponentUpdate (nextProps: Props) {
    const { publicKey, hardwarePublicKeyInfo, hardwareDeviceInfo } = this.props
    if (
      nextProps.publicKey !== publicKey ||
      nextProps.hardwarePublicKeyInfo !== hardwarePublicKeyInfo ||
      (nextProps.hardwareDeviceInfo === FINDING_LEDGER_NOTICE &&
        hardwareDeviceInfo === null)
    ) { return true }
    return false
  }

  componentWillUnmount () {
    const { intervalId } = this.state
    if (intervalId) {
      clearInterval(intervalId)
    }
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
      <div id='loginPage' className={loginStyles.loginPage}>
        <div className={loginStyles.title}>Login using the Ledger Nano S:</div>
        <div className={loginStyles.loginForm}>
          <div>
            <Button disabled={!publicKey} onClick={this.onLedgerNanoSChange}>
              Use Ledger Nano S
            </Button>
            <HomeButtonLink />
          </div>
          <p>{hardwareDeviceInfo}</p>
          <p>{hardwarePublicKeyInfo}</p>
        </div>
      </div>
    )
  }
}
