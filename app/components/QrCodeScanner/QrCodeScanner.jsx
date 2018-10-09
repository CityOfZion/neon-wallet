// @flow
import React, { Component } from 'react'
import Instascan from 'instascan'

type Props = {
  callback: (content: string) => any
}

type State = {
  scannerInstance: ?Object
}

export default class QrCodeScanner extends Component<Props, State> {
  static defaultProps = {
    placeholder: () => null
  }

  scanPreviewElement: ?HTMLVideoElement

  state = {
    scannerInstance: null
  }

  componentWillUnmount () {
    this.destroyScanner();
  }

  componentDidMount () {
    this.initializeScanner();
  }

  initializeScanner () {
    const { callback } = this.props
    const newScannerInstance = new Instascan.Scanner({ video: this.scanPreviewElement })
    
    newScannerInstance.addListener('scan', content => {
      this.destroyScanner();
      callback(content)
    })

    Instascan.Camera.getCameras().then((cameras: Array<Object>) => {
      if (cameras.length > 0) {
        newScannerInstance.start(cameras[0])
      } else {
        console.error('No cameras found.')
      }
    }).catch(e => console.error(e))

    this.setState({ scannerInstance: newScannerInstance })
  }

  destroyScanner () {
    const { scannerInstance } = this.state
    scannerInstance.stop()
  }

  render () {
    return (
      <video ref={ref => { this.scanPreviewElement = ref }} />
    )
  }
}