// @flow
import React from 'react'
import NeoQR from 'neo-qrcode'
import Instascan from 'instascan'

import BaseModal from '../BaseModal'
import Button from '../../Button'
import TextInput from '../../Inputs/TextInput'
import styles from './style.scss'
import GridIcon from '../../../assets/icons/grid.svg'

type Props = {
  hideModal: Function,
  walletName: string,
  address: string,
  asset: string,
  amount: string,
  description: string
}

type State = {
  scannerInstance: ?Object
}

export default class SendModal extends React.Component<Props, State> {
  scanPreviewElement: ?HTMLVideoElement

  state = {
    scannerInstance: null
  }

  componentWillUnmount () {
    const { scannerInstance } = this.state
    scannerInstance && scannerInstance.stop()
  }

  toggleScanner () {
    const { scannerInstance } = this.state

    if (scannerInstance) {
      scannerInstance.stop()
      this.setState(prevState => ({scannerInstance: null}))
      return
    }

    const { callback } = this.props
    const newScannerInstance = new Instascan.Scanner({ video: this.scanPreviewElement })
    
    // newScannerInstance.addListener('scan', content => {
    //   newScannerInstance.stop()
    //   this.setState(prevState => ({scannerInstance: null}))
    //   callback(content)
    // })

    Instascan.Camera.getCameras().then((cameras: Array<Object>) => {
      if (cameras.length > 0) {
        newScannerInstance.start(cameras[0])
      } else {
        console.error('No cameras found.')
      }
    }).catch(e => console.error(e))

    this.setState(prevState => ({ scannerInstance: newScannerInstance }))
  }

  render() {
    const {
      scannerInstance
    } = this.state;

    const {
      hideModal
    } = this.props

    return (
      <BaseModal
        title="Use a QR Code"
        hideModal={hideModal}
        style={{ content: { width: '775px', height: '830px' } }}
      >
        <div className={styles.contentContainer}>
          <div className={styles.header}>
            <GridIcon className={styles.icon} />
            <div className={styles.title}>Use a QR Code</div>
          </div>

          <div className={styles.subHeader}></div>
          <div className={styles.section}>
            <div className={styles.sectionContent}>
              So you've been sent a QR code? Hold it up to your camera or paste the image URL below:
            </div>
          </div>

          <div className={styles.section}>
            <div className={styles.sectionTitle}>CAPTURE QR CODE</div>
            <div className={styles.sectionContent}>
              <video ref={ref => { this.scanPreviewElement = ref }} />
              <Button onClick={() => this.toggleScanner()}>{!scannerInstance ? 'Capture' : 'Cancel'}</Button>
            </div>
          </div>

          <div className={styles.section}>
            <div className={styles.sectionTitle}>OR USE AN IMAGE URL</div>
            <div className={styles.sectionContent}>
              <TextInput
                placeholder="Paste a QR code image URL here..."
              />

              <Button primary>
                Use This Code
              </Button>
            </div>
          </div>
        </div>
      </BaseModal>
    )
  }
}
