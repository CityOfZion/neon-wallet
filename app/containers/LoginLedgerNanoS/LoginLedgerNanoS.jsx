// @flow
import React from 'react'
import { progressValues } from 'spunky'

import HomeButtonLink from '../../components/HomeButtonLink'
import Button from '../../components/Button'
import styles from '../../styles/login.scss'

const { LOADED, FAILED } = progressValues

type DeviceInfo = {
  manufacturer: string,
  product: string
}

type Props = {
  progress: string,
  login: Function,
  connect: Function,
  deviceInfo: ?DeviceInfo,
  publicKey: ?string,
  error: ?string
}

const POLL_FREQUENCY = 1000

export default class LoginLedgerNanoS extends React.Component<Props> {
  intervalId: ?number

  componentDidMount () {
    this.intervalId = setInterval(this.props.connect, POLL_FREQUENCY)
  }

  componentWillUnmount () {
    if (this.intervalId) {
      clearInterval(this.intervalId)
    }
  }

  render () {
    return (
      <div id='loginPage' className={styles.loginPage}>
        <div className={styles.title}>Login using the Ledger Nano S:</div>
        <div className={styles.loginForm}>
          <div>
            <Button disabled={!this.canLogin()} onClick={this.handleLogin}>
              Use Ledger Nano S
            </Button>
            <HomeButtonLink />
          </div>
          {this.renderStatus()}
        </div>
      </div>
    )
  }

  renderStatus () {
    const { progress, deviceInfo, error } = this.props

    if (progress === LOADED && deviceInfo) {
      return (
        <p>
          Found USB {deviceInfo.manufacturer} {deviceInfo.product}. NEO app found on hardward{' '}
          device. Click button above to login.
        </p>
      )
    }

    if (progress === FAILED && error) {
      return <p>{error}</p>
    }

    return <p>Looking for USB Devices. Please plugin your device and login.</p>
  }

  handleLogin = () => {
    this.props.login(this.props.publicKey)
  }

  canLogin () {
    return this.props.progress === LOADED
  }
}
