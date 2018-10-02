// @flow
import React from 'react'
import { progressValues } from 'spunky'

import Button from '../../components/Button'
import LoginIcon from '../../assets/icons/login.svg'
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
    // $FlowFixMe
    this.intervalId = setInterval(this.props.connect, POLL_FREQUENCY)
  }

  componentWillUnmount() {
    if (this.intervalId) {
      // $FlowFixMe
      clearInterval(this.intervalId)
    }
  }

  render() {
    return (
      <div id="loginLedgerNanoS" className={styles.flexContainer}>
        <form>
          {this.renderStatus()}
          <Button
            id="loginButton"
            primary
            type="submit"
            className={styles.loginButtonMargin}
            renderIcon={LoginIcon}
            disabled={!this.canLogin()}
            onClick={this.handleLogin}
            shouldCenterButtonLabelText
          >
            Login
          </Button>
        </form>
      </div>
    )
  }

  renderStatus = () => {
    const { progress, deviceInfo, error } = this.props

    if (progress === LOADED && deviceInfo) {
      return (
        <p className={styles.ledgerStatusText}>
          Found USB {deviceInfo.manufacturer} {deviceInfo.product}. NEO app
          found on hardward device. Click button above to login.
        </p>
      )
    }

    if (progress === FAILED && error) {
      return <p className={styles.ledgerStatusTextError}>{error}</p>
    }

    return (
      <p className={styles.ledgerStatusText}>
        Looking for USB Devices. Please plugin your device and login.
      </p>
    )
  }

  handleLogin = () => {
    this.props.login(this.props.publicKey)
  }

  canLogin = () => this.props.progress === LOADED
}
