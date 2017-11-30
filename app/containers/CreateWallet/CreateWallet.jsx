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
    passphrase: string,
}

type State = {
  passphrase: string,
  passphrase2: string,
}

export default class CreateWallet extends Component<Props, State> {
  state = {
    passphrase: '',
    passphrase2: ''
  }

  createWallet = (e: SyntheticMouseEvent<*>) => {
    e.preventDefault()
    const { passphrase, passphrase2 } = this.state
    const { generateNewWallet } = this.props
    generateNewWallet(passphrase, passphrase2).catch(() => {
      this.resetFields()
    })
  }

  resetFields () {
    this.setState({
      passphrase: '',
      passphrase2: ''
    })
  }

  render () {
    const { address, encryptedWIF, resetKey, saveKey, wif } = this.props
    const passphraseFromProps = this.props.passphrase
    const { passphrase, passphrase2 } = this.state
    const disabledButton = passphrase === '' || passphrase2 === ''

    return (
      <Page id='newWallet'>
        {isNil(wif) ? (
          <div>
            <div className='info'>
              Choose a passphrase to encrypt your private key:
            </div>
            <form onSubmit={this.createWallet}>
              <PasswordField
                placeholder='Enter passphrase here'
                value={passphrase}
                onChange={(e) => this.setState({ passphrase: e.target.value })}
                autoFocus
              />
              <PasswordField
                placeholder='Repeat passphrase here'
                value={passphrase2}
                onChange={(e) => this.setState({ passphrase2: e.target.value })}
              />
              <button type='submit' disabled={disabledButton} className={disabledButton ? 'disabled' : ''}> Generate keys </button>
              <HomeButtonLink />
            </form>
          </div>
        )
          : (
            <DisplayWalletKeys
              address={address}
              wif={wif}
              passphrase={passphraseFromProps}
              passphraseKey={encryptedWIF}
              resetKey={resetKey}
              saveKey={saveKey}
            />)
        }
      </Page>
    )
  }
}
