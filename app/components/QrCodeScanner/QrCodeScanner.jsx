// @flow
import React, { Component, Fragment } from 'react'
import jsqr from 'jsqr'
import { get, assign } from 'lodash-es'
import { type ProgressState, progressValues } from 'spunky'

import delay from '../../util/delay'
import Loading from '../../containers/App/Loading'
import { ConditionalLink } from '../../util/ConditionalLink'
import ErrorIcon from '../../assets/icons/error.svg'

import styles from './QrCodeScanner.scss'

const RESUME_DELAY = 1500
const JSQR_OPTIONS = { inversionAttempts: 'dontInvert' } // https://bit.ly/2EHM8ay
const { FAILED, LOADING } = progressValues

type ScannerError = {
  message: string,
  details?: React$Element<*>,
}

type Props = {
  callback: string => any,
  callbackProgress: ProgressState,
  theme: string,
  width: number,
  height: number,
}

type State = {
  loading: boolean,
  paused: boolean,
  error: ?ScannerError,
}

export default class QrCodeScanner extends Component<Props, State> {
  state = {
    loading: true,
    paused: false,
    error: null,
  }

  video: ?HTMLVideoElement

  canvas: HTMLCanvasElement = document.createElement('canvas')

  canvasCtx: CanvasRenderingContext2D = this.canvas.getContext('2d')

  stream: ?MediaStream

  rafId: ?AnimationFrameID

  lastCodeData: ?string

  componentDidMount() {
    const { width, height } = this.props
    assign(this.canvas, { width, height })
    this.start()
  }

  componentWillUnmount() {
    this.stop()
  }

  componentDidUpdate(prevProps: Props) {
    // resume if callback state changed to FAILED
    if (
      this.state.paused &&
      this.props.callbackProgress === FAILED &&
      prevProps.callbackProgress === LOADING
    ) {
      // UX related delay - let fail notification come in before resuming
      delay(RESUME_DELAY).then(() => this.resume())
    }
  }

  start() {
    const { video } = this
    if (video) {
      const { width, height } = this.props
      navigator.mediaDevices
        .getUserMedia({
          video: { mandatory: { minAspectRatio: width / height } },
        })
        .then(stream => {
          this.stream = stream // stored to later be stopped
          video.srcObject = stream
          video.play()
          this.scan()
        })
        .catch(err => {
          this.setState({ error: this.constructor.getScannerError(err) })
        })
        .finally(() => {
          this.setState({ loading: false })
        })
    }
  }

  stop() {
    // cancel scan
    window.cancelAnimationFrame(this.rafId)
    // stop media stream
    if (this.stream) {
      this.stream.getTracks().forEach(trk => trk.stop())
    }
  }

  pause(): Promise<void> {
    this.setState({ paused: true })

    const { video } = this
    if (video) {
      // allow "flash" animation (QrCodeScanner.scss) to conclude
      return new Promise(resolve => {
        // $FlowFixMe falsely rejects 'animationend'
        video.addEventListener('animationend', resolve)
        video.pause() // freeze frame and run animations
      })
    }

    return Promise.resolve()
  }

  async resume() {
    if (this.video) {
      await this.video.play()
    }
    this.setState({ paused: false })
    this.scan()
  }

  scan() {
    if (this.video) {
      try {
        // check readiness
        if (this.video.readyState !== this.video.HAVE_ENOUGH_DATA) {
          throw new Error('video not ready yet') // exit
        }

        // capture and scan image
        const { width: w, height: h } = this.props
        this.canvasCtx.drawImage(this.video, 0, 0, w, h)
        const { data, width, height } = this.canvasCtx.getImageData(0, 0, w, h)
        const code: { data: string } = jsqr(data, width, height, JSQR_OPTIONS)

        // code not found
        if (!code) {
          this.lastCodeData = null
          throw new Error('qr code not found') // exit
        }

        // protect against send loop
        if (code.data === this.lastCodeData) {
          throw new Error('duplicate code found')
        }

        // code found
        this.lastCodeData = code.data
        this.pause().then(() => {
          this.props.callback(code.data)
        })
      } catch (err) {
        this.rafId = requestAnimationFrame(this.scan.bind(this)) // continue scan
      }
    }
  }

  static getScannerError(err: Error) {
    console.error({ err })
    const scanErr: ScannerError = {
      message: 'Could not connect to camera',
    }

    if (err.name === 'TrackStartError') {
      // get link info by user os, defaults to nothing
      const docs = {
        darwin: [
          'https://support.apple.com/en-il/guide/mac-help/mh32356/10.14/mac',
          'MacOS User Guide: Change Privacy preferences',
        ],
        win32: [
          'https://support.microsoft.com/en-ca/help/10557/windows-10-app-permissions',
          'Windows Support: App permissions',
        ],
        linux: [
          'https://wiki.ubuntu.com/SecurityPermissions',
          'Ubuntu Wiki: Security Permissions',
        ],
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
    const { loading, paused } = this.state

    return loading || paused ? <Loading theme={theme} nobackground /> : null
  }

  renderScanner() {
    const { error, paused, loading } = this.state
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

    const { width, height } = this.props

    return (
      <div
        className={styles.videoWrapper}
        data-paused={paused}
        data-loading={loading}
      >
        {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
        <video
          ref={ref => {
            this.video = ref
          }}
          width={width}
          height={height}
        />
      </div>
    )
  }
}
