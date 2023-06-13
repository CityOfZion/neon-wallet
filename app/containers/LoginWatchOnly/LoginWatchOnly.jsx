// @flow
import React from 'react'
import { FormattedMessage } from 'react-intl'
import { type ProgressState } from 'spunky'

import Button from '../../components/Button'
import LoginIcon from '../../assets/icons/login.svg'
import styles from '../Home/Home.scss'
import TextInput from '../../components/Inputs/TextInput'
import GridIcon from '../../assets/icons/grid.svg'
import QrCodeScanner from '../../components/QrCodeScanner'
import Close from '../../assets/icons/close.svg'

type Props = {
  watchOnlyLogin: ({ address: string, chain: string }) => void,
  chain: string,
  cameraAvailable: boolean,
  progress: ProgressState,
}

type State = {
  address: string,
  scannerActive: boolean,
}

export default class LoginPrivateKey extends React.Component<Props, State> {
  state = {
    address: '',
    scannerActive: false,
  }

  toggleScanner = () => {
    this.setState(prevState => ({ scannerActive: !prevState.scannerActive }))
  }

  render = () => {
    const { watchOnlyLogin, chain, cameraAvailable, progress } = this.props
    const { address, scannerActive } = this.state

    return (
      <div id="loginPrivateKey" className={styles.flexContainer}>
        <form
          onSubmit={e => {
            e.preventDefault()
            watchOnlyLogin({ address, chain })
          }}
        >
          {scannerActive ? (
            <React.Fragment>
              <div className={styles.scannerContainer}>
                <QrCodeScanner
                  callback={a => {
                    watchOnlyLogin({ address: a, chain })
                  }}
                  callbackProgress={progress}
                  width="316"
                  height="178"
                />
              </div>
              <div className={styles.loginButtonRowScannerActive}>
                <Button
                  id="scan-private-key-qr-button"
                  renderIcon={Close}
                  onClick={this.toggleScanner}
                  primary
                >
                  <FormattedMessage id="auth.cancel" />
                </Button>
              </div>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <div className={styles.centeredInput}>
                <FormattedMessage id="authWatchPlaceholder">
                  {translation => (
                    <TextInput
                      placeholder={translation}
                      value={address}
                      onChange={(e: Object) =>
                        this.setState({ address: e.target.value })
                      }
                      autoFocus
                    />
                  )}
                </FormattedMessage>
              </div>
              <div className={styles.loginButtonRow}>
                <Button
                  id="scan-private-key-qr-button"
                  primary
                  renderIcon={GridIcon}
                  onClick={this.toggleScanner}
                  disabled={!cameraAvailable}
                >
                  <FormattedMessage id="authScanQRButton" />
                </Button>
                <Button
                  id="loginButton"
                  primary
                  type="submit"
                  renderIcon={LoginIcon}
                  disabled={address.length < 10}
                  shouldCenterButtonLabelText
                >
                  <FormattedMessage id="authLogin" />
                </Button>
              </div>
            </React.Fragment>
          )}
        </form>
      </div>
    )
  }
}
