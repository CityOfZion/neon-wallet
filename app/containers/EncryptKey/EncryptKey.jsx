// @flow
import React, { Component } from 'react'
import { isNil } from 'lodash'
import DisplayWalletKeys from '../../components/DisplayWalletKeys'
import Page from '../../components/Page'
import HomeButtonLink from '../../components/HomeButtonLink'

type Props = {
    generateWalletFromWif: Function,
    saveKey: Function,
    resetKey: Function,
    address: string,
    generating: boolean,
    wif: string,
    encryptedWif: string,
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

  generateWalletFromWif = () => {
    const { passphrase, passphrase2, wif } = this.state
    const { generateWalletFromWif } = this.props
    generateWalletFromWif(passphrase, passphrase2, wif).catch(() => {
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
    const { generating, address, encryptedWif, saveKey, resetKey } = this.props
    const passphraseFromProps = this.props.passphrase
    const wifFromProps = this.props.wif
    const { passphrase, passphrase2, wif } = this.state
    const disabledButton = passphrase === '' || passphrase2 === '' || wif === ''

    const passphraseDiv = (
      <div>
        <div className='info'>
          Choose a passphrase to encrypt your existing private key:
        </div>
        <input
          type='text'
          value={passphrase}
          onChange={(e) => this.setState({ passphrase: e.target.value })}
          placeholder='Enter passphrase here'
          autoFocus
        />
        <input
          type='text'
          value={passphrase2}
          onChange={(e) => this.setState({ passphrase2: e.target.value })}
          placeholder='Enter passphrase again'
        />
        <input
          type='text'
          value={wif}
          onChange={(e) => this.setState({ wif: e.target.value })}
          placeholder='Enter existing WIF here'
        />
        <button disabled={disabledButton} className={disabledButton ? 'disabled' : ''} onClick={this.generateWalletFromWif}> Generate encrypted key </button>
        <HomeButtonLink />
      </div>
    )
    return (
      <Page id='newWallet'>
        {isNil(wifFromProps) && passphraseDiv}
        {generating && <div className='generating'>Generating keys...</div>}
        {!generating && !isNil(wifFromProps) &&
          <DisplayWalletKeys
            address={address}
            wif={wifFromProps}
            passphrase={passphraseFromProps}
            passphraseKey={encryptedWif}
            resetKey={resetKey}
            saveKey={saveKey}
          />
        }
      </Page>
    )
  }
}
