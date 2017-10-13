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

type State = {
  passphrase: string,
  passphrase2: string,
  wif: string,
}

class EncryptKey extends Component<Props, State> {
  state = {
    passphrase: '',
    passphrase2: '',
    wif: ''
  }

  generateNewWallet = () => {
    const { dispatch } = this.props
    const { passphrase, passphrase2, wif } = this.state
    if (!passphrase || !passphrase2 || !wif) { return null }

    const currentPhrase = passphrase
    const currentWif = wif
    if (passphrase !== passphrase2) {
      dispatch(sendEvent(false, 'Passphrases do not match'))
      setTimeout(() => dispatch(clearTransactionEvent()), 5000)
      return
    }
    if (currentWif) {
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
    } else {
      dispatch(sendEvent(false, 'That is not a valid private key'))
      setTimeout(() => dispatch(clearTransactionEvent()), 5000)
    }
  }

  resetPassphrases () {
    this.setState({
      passphrase: '',
      passphrase2: ''
    })
  }

  render () {
    const { dispatch, generating, address, encryptedWif } = this.props
    const { passphrase, passphrase2, wif } = this.state

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
        <button onClick={this.generateNewWallet()} > Generate encrypted key </button>
        <Link to='/'><button className='altButton'>Home</button></Link>
      </div>
    )
    return (
      <div id='newWallet'>
        <Logo />
        {isNil(this.props.wif) && passphraseDiv}
        {generating && <div className='generating'>Generating keys...</div>}
        {!generating && !isNil(this.props.wif) &&
          <DisplayWalletKeys
            address={address}
            wif={this.props.wif}
            passphrase={this.props.passphrase}
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

export default connect(mapStateToProps)(EncryptKey)
