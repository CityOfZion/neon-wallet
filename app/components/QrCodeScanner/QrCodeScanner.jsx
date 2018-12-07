// @flow
import React, { Component, Fragment } from 'react'
import Instascan from 'instascan'
import { get } from 'lodash-es'

import Loading, { ANIMATION_DURATION } from '../../containers/App/Loading'
import { ConditionalLink } from '../../util/ConditionalLink'
import ErrorIcon from '../../assets/icons/error.svg'

import styles from './QrCodeScanner.scss'

type ScannerError = {
  message: string,
  details?: React$Element<*>
}

type Props = {
  callback: (content: string, scannerInstance: any) => any,
  theme: string
}

type State = {
  loading: boolean,
  error: ?ScannerError
}

export default class QrCodeScanner extends Component<Props, State> {
  state = {
    loading: false,
    error: null
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
        if (!cameras.length) {
          // shouldn't happen, case covered by withCameraAvailability
          throw new Error('No cameras found.')
        }
        return this.scannerInstance.start(cameras[0])
      })
      .catch(err => {
        this.setState({ error: this.constructor.getScannerError(err) })
      })
      .finally(() => {
        this.setState({ loading: false })
      })
  }

  stopScanner() {
    if (this.scannerInstance) this.scannerInstance.stop()
    this.setState({ error: null }) // clear error
  }

  static getScannerError(err: Error) {
    const scanErr: ScannerError = {
      message: 'Could not connect to camera'
    }

    if (err.name === 'TrackStartError') {
      // get link info by user os, defaults to nothing
      const docs = {
        darwin: [
          'https://support.apple.com/en-il/guide/mac-help/mh32356/10.14/mac',
          'MacOS User Guide: Change Privacy preferences'
        ],
        win32: [
          'https://support.microsoft.com/en-ca/help/10557/windows-10-app-permissions',
          'Windows Support: App permissions'
        ],
        linux: [
          'https://wiki.ubuntu.com/SecurityPermissions',
          'Ubuntu Wiki: Security Permissions'
        ]
      }
      const [link, title] = get(docs, process.platform, [])

      scanErr.details = (
        <div>
          Make sure your camera is not already in use by another program and
          that{' '}
          <ConditionalLink href={link} tooltip={title}>
            camera access
          </ConditionalLink>{' '}
          is granted to Neon.
        </div>
      )
    }
    return scanErr
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
    const { error } = this.state
    if (error) {
      return (
        <div className={styles.error}>
          <div className={styles.heading}>
            <ErrorIcon /> {error.message}
          </div>
          <div className={styles.desc}>{error.details}</div>
        </div>
      )
    }

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
