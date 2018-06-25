// @flow
import React, { Component } from 'react'
import QRCode from 'qrcode/lib/browser'

import TextInput from '../../components/Inputs/TextInput'
import Button from '../../components/Button'
import CopyToClipboard from '../../components/CopyToClipboard'
import { ROUTES } from '../../core/constants'
import styles from './DisplayWalletAccounts.scss'
import homeStyles from '../Home/Home.scss'

import HomeLayout from '../Home/HomeLayout'
import BackButton from '../../components/BackButton'

type Props = {
  walletName: string,
  address: string,
  wif: string,
  encryptedWIF: string,
  passphrase: string
}

class DisplayWalletAccounts extends Component<Props> {
  publicCanvas: ?HTMLCanvasElement

  encryptedCanvas: ?HTMLCanvasElement

  privateCanvas: ?HTMLCanvasElement

  componentDidMount() {
    const { address, encryptedWIF, wif } = this.props
    QRCode.toCanvas(this.publicCanvas, address, { version: 5 }, err => {
      if (err) console.log(err)
    })
    QRCode.toCanvas(this.encryptedCanvas, encryptedWIF, { version: 5 }, err => {
      if (err) console.log(err)
    })
    QRCode.toCanvas(this.privateCanvas, wif, { version: 5 }, err => {
      if (err) console.log(err)
    })
  }

  render() {
    const { passphrase, address, encryptedWIF, wif, walletName } = this.props
    const fields = [
      { label: 'Passphrase', value: passphrase },
      { label: 'Public Address', value: address },
      { label: 'Encrypted Key', value: encryptedWIF },
      { label: 'Private Key', value: wif }
    ]
    walletName && fields.push({ label: 'Wallet Name', value: walletName })
    return (
      <HomeLayout
        excludeLogo
        renderNavigation={() => (
          <div className={homeStyles.backButton}>
            <BackButton routeTo={ROUTES.HOME} />
          </div>
        )}
      >
        <div id="newWallet" className={styles.newWalletContainer}>
          <div className={styles.disclaimer}>
            You must save and backup the keys below.{' '}
            <b>If you lose them, you lose access to your assets.</b> Verify that
            you can log in to the account and see the correct public address
            before sending anything to the address below!
          </div>
          <div className={styles.qrContainer}>
            <div className={styles.qrItem}>
              <canvas
                ref={node => {
                  this.publicCanvas = node
                }}
              />
              <div>
                <b>Public Address</b>
              </div>
            </div>
            <div className={styles.qrItem}>
              <canvas
                ref={node => {
                  this.encryptedCanvas = node
                }}
              />
              <div>
                <b>Encrypted Key</b>
              </div>
            </div>
            <div className={styles.qrItem}>
              <canvas
                ref={node => {
                  this.privateCanvas = node
                }}
              />
              <div>
                <b>Private Key</b>
              </div>
            </div>
          </div>
          <div className={styles.detailsContainer}>
            {fields.map(item => (
              <div key={item.label} className={styles.detailRow}>
                <span className={styles.label}>{item.label}:</span>
                <div className={styles.input}>
                  <TextInput value={item.value} disabled />
                </div>
                <CopyToClipboard
                  text={item.value}
                  tooltip={`Copy ${item.label}`}
                />
              </div>
            ))}
          </div>
          <div className={styles.buttonContainer}>
            <Button onClick={this.handlePrint}>Print</Button>
          </div>
        </div>
      </HomeLayout>
    )
  }

  handlePrint = () => {
    window.print()
  }
}

export default DisplayWalletAccounts
