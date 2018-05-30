// @flow
import React, { Component } from 'react'

import Button from '../Button'
import Instascan from 'instascan'

import qrCodeScannerStyles from './QrCodeScanner.scss'

type Props = {
  callback: Function,
}

type State = {
  scanner: Object
}

class QrCodeScanner extends Component<Props, State> {
  scanPreviewElement: HTMLVideoElement | null

  state = {
    scanner: {}
  }

  toggleScanner () {
    const { scanner } = this.state

    if (scanner.stop) {
      scanner.stop()
      this.setState(prevState => ({scanner: {}}))
      return
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
        <Button onClick={() => this.toggleScanner()}>{scanner ? 'Cancel' : 'Scan'}</Button>
        <video ref={ref => { this.scanPreviewElement = ref }} />
      </div>
    )
  }

  componentWillUnmount () {
    const { scanner } = this.state
    scanner && scanner.stop()
  }
}

export default QrCodeScanner
