// @flow
import React, { Component } from 'react'

import PasswordField from '../../components/PasswordField'
import HomeButtonLink from '../../components/HomeButtonLink'
import Button from '../../components/Button'

type Props = {
    encryptWIF: boolean,
    generateNewWalletAccount: Function,
    history: Object
}

type State = {
  passphrase: string,
  passphrase2: string,
  wif: string,
}

export default class EncryptKey extends Component<Props, State> {
  state = {
    passphrase: '',
    passphrase2: '',
    wif: ''
  }

  createWalletAccount = (e: SyntheticMouseEvent<*>) => {
    e.preventDefault()
    const { encryptWIF, history } = this.props
    const { passphrase, passphrase2, wif } = this.state
    const { generateNewWalletAccount } = this.props
    if (!generateNewWalletAccount(passphrase, passphrase2, encryptWIF ? wif : null, history)) {
      // this.resetFields()
    }
  }

  resetFields () {
    this.setState({
      passphrase: '',
      passphrase2: '',
      wif: ''
    })
  }

  render () {
    const { encryptWIF } = this.props
    const { passphrase, passphrase2, wif } = this.state
    let disabledButton
    let title

    if (encryptWIF) {
      disabledButton = passphrase === '' || passphrase2 === '' || wif === ''
      title = 'Choose a passphrase to encrypt your existing private key:'
    } else {
      disabledButton = passphrase === '' || passphrase2 === ''
      title = 'Choose a passphrase to encrypt your private key:'
    }

    return (
      <div id='newWallet'>
        <div className='info'>{title}</div>
        <form onSubmit={this.createWalletAccount}>
          <PasswordField
            value={passphrase}
            onChange={(e) => this.setState({ passphrase: e.target.value })}
            placeholder='Enter passphrase here'
            autoFocus
          />
          <PasswordField
            value={passphrase2}
            onChange={(e) => this.setState({ passphrase2: e.target.value })}
            placeholder='Enter passphrase again'
          />
          {encryptWIF &&
          <PasswordField
            value={wif}
            onChange={(e) => this.setState({ wif: e.target.value })}
            placeholder='Enter existing WIF here'
          />
          }
          <Button type='submit' disabled={disabledButton}>Generate keys</Button>
          <HomeButtonLink />
        </form>
      </div>
    )
  }
}
