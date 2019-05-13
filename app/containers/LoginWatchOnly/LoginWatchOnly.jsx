// @flow
import React from 'react'
import { type ProgressState } from 'spunky'

import QrCodeScanner from '../../components/QrCodeScanner'
import Button from '../../components/Button'
// import PasswordInput from '../../components/Inputs/PasswordInput/PasswordInput'
import LoginIcon from '../../assets/icons/login.svg'
import GridIcon from '../../assets/icons/grid.svg'
import Close from '../../assets/icons/close.svg'
import styles from '../Home/Home.scss'
import TextInput from '../../components/Inputs/TextInput'

type Props = {
  watchOnlyLogin: (content: string) => void,
}

type State = {
  address: string,
}

export default class LoginPrivateKey extends React.Component<Props, State> {
  state = {
    address: '',
  }

  render = () => {
    const { watchOnlyLogin } = this.props
    const { address } = this.state

    return (
      <div id="loginPrivateKey" className={styles.flexContainer}>
        <form
          onSubmit={e => {
            e.preventDefault()
            watchOnlyLogin(address)
          }}
        >
          <React.Fragment>
            <div className={styles.centeredInput}>
              <TextInput
                textInputClassName={styles.privateKeyInput}
                placeholder="Enter a public key here"
                value={address}
                onChange={(e: Object) =>
                  this.setState({ address: e.target.value })
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
                disabled={address.length < 10}
              >
                Login
              </Button>
            </div>
          </React.Fragment>
        </form>
      </div>
    )
  }
}
