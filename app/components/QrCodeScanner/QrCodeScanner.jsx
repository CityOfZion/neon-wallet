// @flow
import React, { Component } from 'react'

import Button from '../Button'
import Instascan from 'instascan';

import qrCodeScannerStyles from './QrCodeScanner.scss'

type Props = {
  callback: Function,
}

class QrCodeScanner extends Component<Props, State> {
  state = {
    scanner: null,
  }

  toggleScanner () {
    const { scanner } = this.state

    if (scanner) {
      scanner.stop()
      this.setState(prevState => ({scanner: null}))
      return;
    }

    const { callback } = this.props
    const scannerInstance = new Instascan.Scanner({ video: this.scanPreviewElement })
    scannerInstance.addListener('scan', function (content) {
      scannerInstance.stop()
      callback(content)
    })
    Instascan.Camera.getCameras().then(function (cameras) {
      if (cameras.length > 0) {
        scannerInstance.start(cameras[0])
      } else {
        console.error('No cameras found.')
      }
    }).catch(e => console.error(e))

    this.setState(prevState => ({scanner: scannerInstance}))
  }

  render () {
    const { scanner } = this.state
    return (
      <div className={qrCodeScannerStyles.qrCodeScannerContent}>
        <Button onClick={this.toggleScanner.bind(this)}>{scanner ? 'Cancel' : 'Scan'}</Button>
        <video ref={ref => this.scanPreviewElement = ref}></video>
      </div>
    )
  }
}

export default QrCodeScanner
