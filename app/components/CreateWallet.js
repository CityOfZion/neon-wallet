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

type State = {
  passphrase: string,
  passphrase2: string,
}

class CreateWallet extends Component<Props, State> {
  state = {
    passphrase: '',
    passphrase2: ''
  }

  generateNewWallet = () => {
    const { dispatch } = this.props
    const { passphrase, passphrase2 } = this.state

    if (!passphrase || !passphrase2) return null

    if (passphrase !== passphrase2) {
      dispatch(sendEvent(false, 'Passphrases do not match'))
      setTimeout(() => dispatch(clearTransactionEvent()), 5000)
      return
    }
    if (validatePassphrase(passphrase)) {
      // TODO: for some reason this blocks, so giving time to processes the earlier
      // dispatch to display "generating" text, should fix this in future
      dispatch(sendEvent(true, 'Generating encoded key...'))
      setTimeout(() => {
        generateEncryptedWif(passphrase).then((result) => {
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
    this.setState({
      passphrase: '',
      passphrase2: ''
    })
  }

  render () {
    const { generating, address, encryptedWif, dispatch } = this.props
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

export default connect(mapStateToProps)(CreateWallet)
