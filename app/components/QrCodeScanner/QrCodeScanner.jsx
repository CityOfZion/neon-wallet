// @flow
import React, { Component } from 'react'
import Instascan from 'instascan'

type Props = {
  callback: (content: string) => any
}

export default class QrCodeScanner extends Component<Props, State> {
  scanPreviewElement: ?HTMLVideoElement

  componentDidMount () {
    this.startScanner();
  }

  componentWillUnmount () {
    this.stopScanner();
  }

  startScanner () {
    const { callback } = this.props
    this.scannerInstance = new Instascan.Scanner({ video: this.scanPreviewElement })
    
    this.scannerInstance.addListener('scan', content => {
      callback(content, this.stopScanner.bind(this));
    })

    Instascan.Camera.getCameras().then((cameras: Array<Object>) => {
      if (cameras.length > 0) {
        this.scannerInstance.start(cameras[0])
      } else {
        console.error('No cameras found.')
      }
    }).catch(e => console.error(e))
  }

  stopScanner () {
    this.scannerInstance && this.scannerInstance.stop()
  }

  render () {
    return (
      <video ref={ref => { this.scanPreviewElement = ref }} />
    )
  }
}