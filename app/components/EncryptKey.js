import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { isNil } from 'lodash'
import { newWallet } from '../modules/generateWallet'
import { Link } from 'react-router'
import DisplayWalletKeys from './DisplayWalletKeys'
import { encryptWifAccount } from 'neon-js'
import { sendEvent, clearTransactionEvent } from '../modules/transactions'

const logo = require('../images/neon-logo2.png')

let wifInput, passphraseInput, passphraseInput2

// TODO: move to neon-js
// what is the correct length to check for?
const validatePassphrase = (passphrase) => {
  return passphrase.length >= 4
}

const generateNewWallet = (dispatch) => {
  const currentPhrase = passphraseInput.value
  const currentWif = wifInput.value
  if (passphraseInput.value !== passphraseInput2.value) {
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
      passphraseInput.value = ''
      passphraseInput2.value = ''
    }
  } else {
    dispatch(sendEvent(false, 'That is not a valid private key'))
    setTimeout(() => dispatch(clearTransactionEvent()), 5000)
  }
}

let EncryptKey = class EncryptKey extends Component {
  render () {
    const { dispatch, wif, generating, address, encryptedWif, passphrase } = this.props
    const passphraseDiv = (
      <div>
        <div className='info'>
          Choose a passphrase to encrypt your existing private key:
        </div>
        <input type='text' ref={(node) => { passphraseInput = node }} placeholder='Enter passphrase here' />
        <input type='text' ref={(node) => { passphraseInput2 = node }} placeholder='Enter passphrase again' />
        <input type='text' ref={(node) => { wifInput = node }} placeholder='Enter existing WIF here' />
        <button onClick={() => generateNewWallet(dispatch)} > Generate encrypted key </button>
        <Link to='/'><button className='altButton'>Home</button></Link>
      </div>
    )
    return (
      <div id='newWallet'>
        <div className='logo'><img src={logo} width='60px' /></div>
        {isNil(wif) && passphraseDiv}
        {generating === true ? <div className='generating'>Generating keys...</div> : <div />}
        {generating === false && wif !== null &&
          <DisplayWalletKeys
            address={address}
            wif={wif}
            passphrase={passphrase}
            passphraseKey={encryptedWif}
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

EncryptKey.propTypes = {
  dispatch: PropTypes.func.isRequired,
  address: PropTypes.string,
  generating: PropTypes.bool,
  wif: PropTypes.string,
  encryptedWif: PropTypes.string,
  passphrase: PropTypes.string
}

EncryptKey = connect(mapStateToProps)(EncryptKey)

export default EncryptKey
