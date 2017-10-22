// @flow
import React, { Component } from 'react'
import { generateEncryptedWif } from 'neon-js'
import { isNil } from 'lodash'
import { Link } from 'react-router'
import DisplayWalletKeys from '../../components/DisplayWalletKeys'
import { validatePassphrase } from '../../core/wallet'
import Logo from '../../components/Logo'

type Props = {
    newWallet: Function,
    sendEvent: Function,
    clearTransactionEvent: Function,
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
    const { clearTransactionEvent, sendEvent, newWallet } = this.props

    if (!passphrase || !passphrase2) return null

    if (passphrase !== passphrase2) {
      sendEvent(false, 'Passphrases do not match')
      setTimeout(() => clearTransactionEvent(), 5000)
      return
    }
    if (validatePassphrase(passphrase)) {
      // TODO: for some reason this blocks, so giving time to processes the earlier
      // dispatch to display "generating" text, should fix this in future
      sendEvent(true, 'Generating encoded key...')
      setTimeout(() => {
        generateEncryptedWif(passphrase).then((result) => {
          newWallet(result)
          clearTransactionEvent()
        })
      }, 500)
    } else {
      sendEvent(false, 'Please choose a longer passphrase')
      setTimeout(() => clearTransactionEvent(), 5000)
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
    const { generating, address, encryptedWif, resetKey, clearTransactionEvent, sendEvent } = this.props
    const { passphrase, passphrase2 } = this.state

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
        />
        <input
          type='text'
          placeholder='Repeat passphrase here'
          value={passphrase2}
          onChange={(e) => this.setState({ passphrase2: e.target.value })}
        />
        <button onClick={this.generateNewWallet} > Generate keys </button>
        <Link to='/'><button className='altButton'>Home</button></Link>
      </div>
    )

    return (
      <div id='newWallet'>
        <Logo />
        {isNil(this.props.wif) ? passphraseDiv : <div />}
        {generating && <div className='generating'>Generating keys...</div>}
        {!generating && !isNil(this.props.wif) &&
        <DisplayWalletKeys
          address={address}
          wif={this.props.wif}
          passphrase={this.props.passphrase}
          passphraseKey={encryptedWif}
          resetKey={resetKey}
          sendEvent={sendEvent}
          clearTransactionEvent={clearTransactionEvent}
        />
        }
      </div>
    )
  }
}
