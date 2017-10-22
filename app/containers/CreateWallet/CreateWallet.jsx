// @flow
import React, { Component } from 'react'
import { isNil } from 'lodash'
import { Link } from 'react-router'
import DisplayWalletKeys from '../../components/DisplayWalletKeys'
import Logo from '../../components/Logo'
import { ROUTES } from '../../core/constants'

type Props = {
    generateNewWallet: Function,
    saveKey: Function,
    resetKey: Function,
    address: string,
    generating: boolean,
    wif: string,
    encryptedWif: string,
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

  generateNewWallet = () => {
    const { passphrase, passphrase2 } = this.state
    const { generateNewWallet } = this.props
    const result = generateNewWallet(passphrase, passphrase2)
    if (!result) {
      this.resetPassphrases()
    }
  }

  resetPassphrases () {
    this.setState({
      passphrase: '',
      passphrase2: ''
    })
  }

  render () {
    const { generating, address, encryptedWif, resetKey, saveKey, wif } = this.props
    const passphraseFromProps = this.props.passphrase
    const { passphrase, passphrase2 } = this.state
    const disabledButton = passphrase === '' || passphrase2 === ''

    const passphraseDiv = (
      <div>
        <div className='info'>
          Choose a passphrase to encrypt your private key:
        </div>
        <input
          type='text'
          placeholder='Enter passphrase here'
          value={passphrase}
          onChange={(e) => this.setState({ passphrase: e.target.value })}
          autoFocus
        />
        <input
          type='text'
          placeholder='Repeat passphrase here'
          value={passphrase2}
          onChange={(e) => this.setState({ passphrase2: e.target.value })}
        />
        <button disabled={disabledButton} className={disabledButton && 'disabled'} onClick={this.generateNewWallet}> Generate keys </button>
        <Link to={ROUTES.HOME}><button className='altButton'>Home</button></Link>
      </div>
    )

    return (
      <div id='newWallet'>
        <Logo />
        {isNil(wif) ? passphraseDiv : <div />}
        {generating && <div className='generating'>Generating keys...</div>}
        {!generating && !isNil(wif) &&
        <DisplayWalletKeys
          address={address}
          wif={wif}
          passphrase={passphraseFromProps}
          passphraseKey={encryptedWif}
          resetKey={resetKey}
          saveKey={saveKey}
        />
        }
      </div>
    )
  }
}
