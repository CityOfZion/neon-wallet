// @flow
import React from 'react'

import QrCodeScanner from '../../components/QrCodeScanner'
import Button from '../../components/Button'
import PasswordInput from '../../components/Inputs/PasswordInput/PasswordInput'
import LoginIcon from '../../assets/icons/login.svg'
import GridIcon from '../../assets/icons/grid.svg'
import Close from '../../assets/icons/close.svg'
import styles from '../Home/Home.scss'

type Props = {
  loginWithPrivateKey: (content: string) => void,
  cameraAvailable: boolean,
}

type State = {
  wif: string,
  scannerActive: boolean,
}

export default class LoginPrivateKey extends React.Component<Props, State> {
  state = {
    wif: '',
    scannerActive: false,
  }

  toggleScanner = () => {
    this.setState(prevState => ({ scannerActive: !prevState.scannerActive }))
  }

  render = () => {
    const { loginWithPrivateKey, cameraAvailable } = this.props
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
                <QrCodeScanner
                  callback={loginWithPrivateKey}
                  width="316"
                  height="178"
                />
              </div>
              <div className={styles.privateKeyLoginButtonRowScannerActive}>
                <Button
                  id="scan-private-key-qr-button"
                  renderIcon={Close}
                  onClick={this.toggleScanner}
                >
                  Cancel
                </Button>
              </div>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <div className={styles.centeredInput}>
                <PasswordInput
                  textInputClassName={styles.privateKeyInput}
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
                  id="scan-private-key-qr-button"
                  primary
                  renderIcon={GridIcon}
                  onClick={this.toggleScanner}
                  disabled={!cameraAvailable}
                >
                  Scan QR
                </Button>
                <Button
                  id="loginButton"
                  primary
                  type="submit"
                  renderIcon={LoginIcon}
                  disabled={wif.length < 10}
                >
                  Login
                </Button>
              </div>
            </React.Fragment>
          )}
        </form>
      </div>
    )
  }
}
