// @flow
import React, { Component } from 'react'
import { isNil } from 'lodash'

import PasswordField from '../../components/PasswordField'
import DisplayWalletKeys from '../../components/DisplayWalletKeys'
import Page from '../../components/Page'
import HomeButtonLink from '../../components/HomeButtonLink'

type Props = {
    generateNewWallet: Function,
    saveKey: Function,
    resetKey: Function,
    address: string,
    wif: string,
    encryptedWIF: string,
    passphrase: string
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

  createWallet = (e: SyntheticMouseEvent<*>) => {
    e.preventDefault()
    const { passphrase, passphrase2, wif } = this.state
    const { generateNewWallet } = this.props
    generateNewWallet(passphrase, passphrase2, wif).catch(() => {
      this.resetFields()
    })
  }

  resetFields () {
    this.setState({
      passphrase: '',
      passphrase2: '',
      wif: ''
    })
  }

  render () {
    const { address, encryptedWIF, saveKey, resetKey } = this.props
    const passphraseFromProps = this.props.passphrase
    const wifFromProps = this.props.wif
    const { passphrase, passphrase2, wif } = this.state
    const disabledButton = passphrase === '' || passphrase2 === '' || wif === ''

    return (
      <Page id='newWallet'>
        {isNil(wifFromProps) ? (
          <div>
            <div className='info'>
              Choose a passphrase to encrypt your existing private key:
            </div>
            <form onSubmit={this.createWallet}>
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
              <PasswordField
                value={wif}
                onChange={(e) => this.setState({ wif: e.target.value })}
                placeholder='Enter existing WIF here'
              />
              <button type='submit' disabled={disabledButton} className={disabledButton ? 'disabled' : ''}> Generate encrypted key </button>
              <HomeButtonLink />
            </form>
          </div>
        ) : (
          <DisplayWalletKeys
            address={address}
            wif={wifFromProps}
            passphrase={passphraseFromProps}
            passphraseKey={encryptedWIF}
            resetKey={resetKey}
            saveKey={saveKey}
          />
        )}
      </Page>
    )
  }
}
