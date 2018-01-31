// @flow
import React, { Component } from 'react'

import HomeButtonLink from '../../components/HomeButtonLink'
import Button from '../../components/Button'
import styles from '../../styles/login.scss'

type DeviceInfo = {
  manufacturer: string,
  product: string
}

type Props = {
  login: Function,
  connect: Function,
  deviceInfo: ?DeviceInfo,
  publicKey: ?string,
  error: ?string
}

const POLL_FREQUENCY = 1000

export default class LoginLedgerNanoS extends Component<Props> {
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
            <Button disabled={!this.canLogin()} onClick={this.props.login}>
              Use Ledger Nano S
            </Button>
            <HomeButtonLink />
          </div>
          {this.renderDeviceInfo()}
          {this.renderStatus()}
          {this.renderError()}
        </div>
      </div>
    )
  }

  renderDeviceInfo () {
    const { deviceInfo } = this.props

    if (deviceInfo) {
      return <p>Found USB ${deviceInfo.manufacturer} ${deviceInfo.product}</p>
    } else {
      return <p>Looking for USB Devices. Please plugin your device and login.</p>
    }
  }

  renderStatus () {
    const { publicKey } = this.props

    if (publicKey) {
      return <p>Success. NEO app found on hardware device. Click button above to login.</p>
    }
  }

  renderError () {
    const { error } = this.props

    if (error) {
      return <p>{error}</p>
    }
  }

  canLogin () {
    return !!this.props.publicKey
  }
}
