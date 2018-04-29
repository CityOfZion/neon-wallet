// @flow
import React, { Component } from 'react'
import Button from '../../components/Button'
import Login from '../../images/icons/Login.svg'
import PasswordInput from '../../components/Inputs/PasswordInput/PasswordInput'

import styles from '../Home/Home.scss'

type Props = {
  loginWithPrivateKey: Function
}

type State = {
  wif: string
}

export default class LoginPrivateKey extends Component<Props, State> {
  state = {
    wif: ''
  }

  render = () => {
    console.log(this.props)
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
          <PasswordInput
            placeholder="Enter your private key here"
            value={wif}
            onChange={(e: Object) => this.setState({ wif: e.target.value })}
            autoFocus
          />
          <Button
            renderIcon={() => <Login />}
            icon="login"
            style={{ marginTop: 20 }}
            type="submit"
            primary
            disabled={wif.length < 10}
          >
            Login
          </Button>
        </form>
      </div>
    )
  }
}
