// @flow
import React, { Component } from 'react'

import Button from '../Button'
import Instascan from 'instascan'

import styles from './QrCodeScanner.scss'

type Props = {
  callback: (content: string) => any,
}

type State = {
  scannerInstance: ?Object
}

class QrCodeScanner extends Component<Props, State> {
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
    newScannerInstance.addListener('scan', content => {
      newScannerInstance.stop()
      this.setState(prevState => ({scannerInstance: null}))
      callback(content)
    })
    Instascan.Camera.getCameras().then((cameras: Array<Object>) => {
      if (cameras.length > 0) {
        newScannerInstance.start(cameras[0])
      } else {
        console.error('No cameras found.')
      }
    }).catch(e => console.error(e))

    this.setState(prevState => ({scannerInstance: newScannerInstance}))
  }

  render () {
    const { scannerInstance } = this.state
    return (
      <div className={styles.qrCodeScannerContent}>
        <Button onClick={() => this.toggleScanner()}>{!scannerInstance ? 'Scan QR Code' : 'Cancel'}</Button>
        <div className={styles.qrcodeScannerPreviewContainer}>
          <video ref={ref => { this.scanPreviewElement = ref }} />
        </div>
      </div>
    )
  }
}

export default QrCodeScanner
