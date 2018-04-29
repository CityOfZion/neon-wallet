// @flow
import React from 'react'
import { progressValues } from 'spunky'

import Button from '../../components/Button'
import Login from '../../images/icons/Login.svg'
import styles from '../Home/Home.scss'

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

  componentDidMount() {
    this.intervalId = setInterval(this.props.connect, POLL_FREQUENCY)
  }

  componentWillUnmount() {
    if (this.intervalId) {
      clearInterval(this.intervalId)
    }
  }

  render() {
    return (
      <div id="loginLedgerNanoS" className={styles.flexContainer}>
        <div className={styles.loginForm}>
          <div>
            <Button
              renderIcon={() => <Login />}
              icon="login"
              style={{ marginTop: 10 }}
              id="loginButton"
              primary
              type="submit"
              disabled={!this.canLogin()}
              onClick={this.handleLogin}
            >
              Login
            </Button>
          </div>
          {this.renderStatus()}
        </div>
      </div>
    )
  }

  renderStatus() {
    const { progress, deviceInfo, error } = this.props

    if (progress === LOADED && deviceInfo) {
      return (
        <p style={{ fontWeight: 'lighter' }}>
          Found USB {deviceInfo.manufacturer} {deviceInfo.product}. NEO app
          found on hardward device. Click button above to login.
        </p>
      )
    }

    if (progress === FAILED && error) {
      return <p style={{ fontWeight: 'lighter', color: 'red' }}>{error}</p>
    }

    return (
      <p style={{ fontWeight: 'lighter' }}>
        Looking for USB Devices. Please plugin your device and login.
      </p>
    )
  }

  handleLogin = () => {
    this.props.login(this.props.publicKey)
  }

  canLogin() {
    return this.props.progress === LOADED
  }
}
