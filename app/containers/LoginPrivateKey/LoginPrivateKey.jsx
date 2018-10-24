// @flow
import React from 'react'
import Instascan from 'instascan'
import classNames from 'classnames'

import Button from '../../components/Button'
import PasswordInput from '../../components/Inputs/PasswordInput/PasswordInput'
import LoginIcon from '../../assets/icons/login.svg'
import GridIcon from '../../assets/icons/grid.svg'
import Close from '../../assets/icons/close.svg'
import styles from '../Home/Home.scss'

type Props = {
  loginWithPrivateKey: Function
}

type State = {
  wif: string,
  scannerActive: boolean,
  loading: boolean
}

export default class LoginPrivateKey extends React.Component<Props, State> {
  scannerInstance: Instascan

  scanPreviewElement: ?HTMLVideoElement

  state = {
    wif: '',
    scannerActive: false,
    loading: false
  }

  componentWillUnmount() {
    this.stopScanner()
  }

  render = () => {
    const { loginWithPrivateKey } = this.props
    const { wif, scannerActive } = this.state

    return (
      <div id="loginPrivateKey" className={styles.flexContainer}>
        <form
          onSubmit={e => {
            e.preventDefault()
            loginWithPrivateKey(wif)
          }}
        >
          {scannerActive ? (
            <React.Fragment>
              <div className={styles.scannerContainer}>
                {/* eslint-disable-next-line */}
                <video
                  ref={ref => {
                    this.scanPreviewElement = ref
                  }}
                />
              </div>
              <div className={styles.privateKeyLoginButtonRowScannerActive}>
                <Button
                  id="scan-private-key-qr-button"
                  renderIcon={Close}
                  onClick={this.toggleScanner}
                  shouldCenterButtonLabelText
                >
                  Cancel
                </Button>
              </div>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <div className={styles.centeredInput}>
                <PasswordInput
                  placeholder="Enter your private key here"
                  value={wif}
                  onChange={(e: Object) =>
                    this.setState({ wif: e.target.value })
                  }
                  autoFocus
                />
              </div>
              <div className={styles.privateKeyLoginButtonRow}>
                <Button
                  id="loginButton"
                  primary
                  type="submit"
                  renderIcon={LoginIcon}
                  disabled={wif.length < 10}
                >
                  Login
                </Button>
                <Button
                  id="scan-private-key-qr-button"
                  primary
                  renderIcon={GridIcon}
                  onClick={this.toggleScanner}
                >
                  Scan QR
                </Button>
              </div>
            </React.Fragment>
          )}
        </form>
      </div>
    )
  }

  toggleScanner = () => {
    this.setState(
      prevState => ({ scannerActive: !prevState.scannerActive }),
      () => {
        if (this.state.scannerActive) return this.startScanner()
        return this.stopScanner()
      }
    )
  }

  stopScanner() {
    if (this.scannerInstance) this.scannerInstance.stop()
  }

  startScanner() {
    const { loginWithPrivateKey } = this.props
    this.scannerInstance = new Instascan.Scanner({
      video: this.scanPreviewElement
    })

    this.scannerInstance.addListener('scan', content => {
      loginWithPrivateKey(content)
    })

    this.setState({ loading: true })
    Instascan.Camera.getCameras()
      .then((cameras: Array<Object>) => {
        this.setState(prevState => ({
          loading: prevState.loading
        }))
        if (cameras.length > 0) {
          this.scannerInstance.start(cameras[0])
        } else {
          console.error('No cameras found.')
        }
      })
      .catch(e => console.error(e))
  }
}
