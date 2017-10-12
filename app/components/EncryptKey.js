// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { isNil } from 'lodash'
import { newWallet } from '../modules/generateWallet'
import { Link } from 'react-router'
import DisplayWalletKeys from './DisplayWalletKeys'
import { encryptWifAccount } from 'neon-js'
import { sendEvent, clearTransactionEvent } from '../modules/transactions'
import { validatePassphrase } from '../core/wallet'
import Logo from './Logo'

type Props = {
    dispatch: DispatchType,
    address: string,
    generating: boolean,
    wif: string,
    encryptedWif: string,
    passphrase: string
}

let EncryptKey = class EncryptKey extends Component<Props> {
  passphraseInput: ?HTMLInputElement
  passphraseInput2: ?HTMLInputElement
  wifInput: ?HTMLInputElement

  generateNewWallet = () => {
    const { dispatch } = this.props
    if (!this.passphraseInput || !this.passphraseInput2 || !this.wifInput) { return null }

    const currentPhrase = this.passphraseInput.value
    const currentWif = this.wifInput.value
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
        encryptWifAccount(currentWif, currentPhrase).then((result) => {
          dispatch(newWallet(result))
          dispatch(clearTransactionEvent())
        }).catch(() => {
          dispatch(sendEvent(false, 'The private key is not valid'))
          setTimeout(() => dispatch(clearTransactionEvent()), 5000)
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
    const { dispatch, wif, generating, address, encryptedWif, passphrase } = this.props
    const passphraseDiv = (
      <div>
        <div className='info'>
          Choose a passphrase to encrypt your existing private key:
        </div>
        <input type='text' ref={(node) => { this.passphraseInput = node }} placeholder='Enter passphrase here' />
        <input type='text' ref={(node) => { this.passphraseInput2 = node }} placeholder='Enter passphrase again' />
        <input type='text' ref={(node) => { this.wifInput = node }} placeholder='Enter existing WIF here' />
        <button onClick={this.generateNewWallet()} > Generate encrypted key </button>
        <Link to='/'><button className='altButton'>Home</button></Link>
      </div>
    )
    return (
      <div id='newWallet'>
        <Logo />
        {isNil(wif) && passphraseDiv}
        {generating === true ? <div className='generating'>Generating keys...</div> : <div />}
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

EncryptKey = connect(mapStateToProps)(EncryptKey)

export default EncryptKey
