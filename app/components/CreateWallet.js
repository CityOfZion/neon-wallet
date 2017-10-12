// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { generateEncryptedWif } from 'neon-js'
import { isNil } from 'lodash'
import { Link } from 'react-router'
import { newWallet } from '../modules/generateWallet'
import DisplayWalletKeys from './DisplayWalletKeys'
import { sendEvent, clearTransactionEvent } from '../modules/transactions'
import { validatePassphrase } from '../core/wallet'
import Logo from './Logo'

type Props = {
    dispatch: DispatchType,
    address: string,
    generating: boolean,
    wif: string,
    encryptedWif: string,
    passphrase: string,
}

let CreateWallet = class CreateWallet extends Component<Props> {
  passphraseInput: ?HTMLInputElement
  passphraseInput2: ?HTMLInputElement

  generateNewWallet = () => {
    const { dispatch } = this.props

    if (!this.passphraseInput || !this.passphraseInput2) return null

    const currentPhrase = this.passphraseInput.value
    if (this.passphraseInput.value !== this.passphraseInput2.value) {
      dispatch(sendEvent(false, 'Passphrases do not match'))
      setTimeout(() => dispatch(clearTransactionEvent()), 5000)
      return
    }
    if (validatePassphrase(currentPhrase)) {
      // TODO: for some reason this blocks, so giving time to processes the earlier
      // dispatch to display "generating" text, should fix this in future
      dispatch(sendEvent(true, 'Generating encoded key...'))
      setTimeout(() => {
        generateEncryptedWif(currentPhrase).then((result) => {
          dispatch(newWallet(result))
          dispatch(clearTransactionEvent())
        })
      }, 500)
    } else {
      dispatch(sendEvent(false, 'Please choose a longer passphrase'))
      setTimeout(() => dispatch(clearTransactionEvent()), 5000)
      this.resetPassphrases()
    }
  }

  resetPassphrases () {
    if (this.passphraseInput) {
      this.passphraseInput.value = ''
    }
    if (this.passphraseInput2) {
      this.passphraseInput2.value = ''
    }
  }

  render () {
    const { wif, generating, address, encryptedWif, passphrase, dispatch } = this.props

    const passphraseDiv = (
      <div>
        <div className='info'>
          Choose a passphrase to encrypt your private key:
        </div>
        <input type='text' ref={(node) => { this.passphraseInput = node }} placeholder='Enter passphrase here' />
        <input type='text' ref={(node) => { this.passphraseInput2 = node }} placeholder='Repeat passphrase here' />
        <button onClick={this.generateNewWallet} > Generate keys </button>
        <Link to='/'><button className='altButton'>Home</button></Link>
      </div>
    )

    return (
      <div id='newWallet'>
        <Logo />
        {isNil(wif) ? passphraseDiv : <div />}
        {generating === true && <div className='generating'>Generating keys...</div>}
        {generating === false && wif !== null &&
        <DisplayWalletKeys
          address={address}
          wif={wif}
          passphrase={passphrase}
          passphraseKey={encryptedWif}
          dispatch={dispatch}
        />
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  wif: state.generateWallet.wif,
  address: state.generateWallet.address,
  encryptedWif: state.generateWallet.encryptedWif,
  passphrase: state.generateWallet.passphrase,
  generating: state.generateWallet.generating
})

CreateWallet = connect(mapStateToProps)(CreateWallet)

export default CreateWallet
