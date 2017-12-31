// @flow
import React, { Component } from 'react'
import QRCode from 'qrcode/lib/browser'

import Button from '../../components/Button'
import CopyToClipboard from '../../components/CopyToClipboard'
import { ROUTES } from '../../core/constants'

type Props = {
  resetKey: Function,
  saveAccount: Function,
  address: string,
  wif: string,
  encryptedWIF: string,
  passphrase: string,
  history: Object
}

type State = {
  keyName: string
}

class DisplayWalletAccounts extends Component<Props, State> {
  state = {
    keyName: ''
  }

  publicCanvas: ?HTMLCanvasElement
  privateCanvas: ?HTMLCanvasElement

  componentDidMount () {
    const { address, encryptedWIF } = this.props
    QRCode.toCanvas(this.publicCanvas, address, { version: 5 }, (err) => {
      if (err) console.log(err)
    })
    QRCode.toCanvas(this.privateCanvas, encryptedWIF, { version: 5 }, (err) => {
      if (err) console.log(err)
    })
  }

  render () {
    const { passphrase, address, encryptedWIF, wif, saveAccount } = this.props
    const { keyName } = this.state
    return (
      <div id='newWallet'>
        <div className='disclaimer'>
          You must save and backup the keys below. If you lose them, you lose access to your assets.
          You can click "Save Key" to save the encrypted key in local application storage.
          Verify that you can log in to the account and see the correct public address before sending anything to the address below!
        </div>
        <div className='addressBox'>
          <canvas ref={(node) => { this.publicCanvas = node }} />
          <div>Public Address</div>
        </div>
        <div className='privateKeyBox'>
          <canvas ref={(node) => { this.privateCanvas = node }} />
          <div>Encrypted Private Key</div>
        </div>
        <div className='keyList'>
          <div className='keyListItem'>
            <span className='label'>Passphrase:</span>
            <span className='key'>{passphrase}</span>
            <CopyToClipboard text={passphrase} tooltip='Copy Passphrase' />
          </div>
          <br />
          <div className='keyListItem'>
            <span className='label'>Public Address:</span>
            <span className='key'>{address}</span>
            <CopyToClipboard text={address} tooltip='Copy Public Address' />
          </div>
          <div className='keyListItem'>
            <span className='label'>Encrypted key:</span>
            <span className='key'>{encryptedWIF}</span>
            <CopyToClipboard text={encryptedWIF} tooltip='Copy Encrypted Key' />
          </div>
          <div className='keyListItem'>
            <span className='label'>Private Key:</span>
            <span className='key'>{wif}</span>
            <CopyToClipboard text={wif} tooltip='Copy Private Key' />
          </div>
        </div>
        <div className='saveAccount'>
          <input autoFocus type='text' placeholder='Name this account' value={keyName} onChange={(e) => this.setState({ keyName: e.target.value })} />
          <Button onClick={() => saveAccount(keyName, address, encryptedWIF)}>Save Account</Button>
        </div>
        <Button onClick={this.handleBack}>Back</Button>
        <Button onClick={this.handlePrint}>Print</Button>
      </div>
    )
  }

  handleBack = () => {
    const { resetKey, history } = this.props
    resetKey()
    history.push(ROUTES.HOME)
  }

  handlePrint = () => {
    window.print()
  }
}

export default DisplayWalletAccounts
