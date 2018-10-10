// @flow
import React from 'react'

import Button from '../../components/Button'
import PasswordInput from '../../components/Inputs/PasswordInput/PasswordInput'
import LoginIcon from '../../assets/icons/login.svg'
import styles from '../Home/Home.scss'

type Props = {
  loginWithPrivateKey: Function
}

type State = {
  wif: string
}

export default class LoginPrivateKey extends React.Component<Props, State> {
  state = {
    wif: ''
  }

  render = () => {
    const { loginWithPrivateKey } = this.props
    const { wif } = this.state

    return (
      <div id="loginPrivateKey" className={styles.flexContainer}>
        <form
          onSubmit={e => {
            e.preventDefault()
            loginWithPrivateKey(wif)
          }}
        >
          <div className={styles.centeredInput}>
            <PasswordInput
              placeholder="Enter your private key here"
              value={wif}
              onChange={(e: Object) => this.setState({ wif: e.target.value })}
              autoFocus
            />
          </div>
          <Button
            id="loginButton"
            primary
            type="submit"
            className={styles.loginButtonMargin}
            renderIcon={LoginIcon}
            disabled={wif.length < 10}
            shouldCenterButtonLabelText
          >
            Login
          </Button>
        </form>
      </div>
    )
  }
}
