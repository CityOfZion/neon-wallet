// @flow
import React, { Component, Fragment } from 'react'
import Instascan from 'instascan'

import Loading, { ANIMATION_DURATION } from '../../containers/App/Loading'

type Props = {
  callback: (content: string, scannerInstance: any) => any,
  theme: string
}

type State = {
  loading: boolean
}

export default class QrCodeScanner extends Component<Props, State> {
  state = {
    loading: false
  }

  scanPreviewElement: ?HTMLVideoElement

  scannerInstance: Instascan

  componentDidMount() {
    this.startScanner()
  }

  componentWillUnmount() {
    this.stopScanner()
  }

  startScanner() {
    const { callback } = this.props
    this.scannerInstance = new Instascan.Scanner({
      video: this.scanPreviewElement
    })

    this.scannerInstance.addListener('scan', content => {
      callback(content, this.stopScanner.bind(this))
    })

    // since the browser halts while getting usermedia
    // let the loading animation finish one round and only then continue
    this.setState({ loading: true })
    new Promise(resolve => setTimeout(resolve, ANIMATION_DURATION))
      .then(() => Instascan.Camera.getCameras())
      .then((cameras: Array<Object>) => {
        if (cameras.length === 0) {
          // shouldn't happen, case covered by withCameraAvailability
          throw new Error('No cameras found.')
        }
        return this.scannerInstance.start(cameras[0])
      })
      .catch(e => console.error(e))
      .finally(() => {
        this.setState({ loading: false })
      })
  }

  stopScanner() {
    if (this.scannerInstance) this.scannerInstance.stop()
  }

  render() {
    return (
      <Fragment>
        {this.renderLoadingIndicator()}
        {this.renderScanner()}
      </Fragment>
    )
  }

  renderLoadingIndicator() {
    const { theme } = this.props
    const { loading } = this.state

    return loading ? <Loading theme={theme} nobackground /> : null
  }

  renderScanner() {
    return (
      /* eslint-disable-next-line jsx-a11y/media-has-caption */
      <video
        ref={ref => {
          this.scanPreviewElement = ref
        }}
      />
    )
  }
}
