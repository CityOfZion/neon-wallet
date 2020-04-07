// @flow
import React from 'react'
import { filter } from 'lodash-es'
import { cancellablePoll as poll } from '../util/poll'
import type { CancellableType } from '../util/poll'

const POLL_FREQUENCY = 1000

type State = {
  avail: boolean,
}

type Props = {}

// $FlowFixMe
export default function withCameraAvailability(Component) {
  class CameraAvailability extends React.Component<Props, State> {
    config = { frequency: POLL_FREQUENCY }

    cancellable: CancellableType

    state = {
      avail: false,
    }

    componentDidMount() {
      // start wait for available camera
      this.awaitAvailable()
    }

    componentDidUpdate(_: Props, prevState: State) {
      // cleanup
      this.cancellable.cancel()

      // if camera found, wait until no longer available
      // if no camera found, wait until available
      if (prevState.avail) {
        this.awaitNotAvailable()
      } else {
        this.awaitAvailable()
      }
    }

    componentWillUnmount() {
      // cancel current poll
      this.cancellable.cancel()
    }

    // wait till camera is available
    awaitAvailable = async (): Promise<*> => {
      // register poll to allow cancellation
      this.cancellable = poll(this.isCameraAvailable, this.config)

      // once resolved, update the avail state
      return this.cancellable.promise.then(() => {
        this.setState({ avail: true })
      })
    }

    // wait till camera is no longer available
    awaitNotAvailable = async (): Promise<*> => {
      // register poll to allow cancellation
      this.cancellable = poll(this.noCameraAvailable, this.config)

      // once resolved, update the avail state
      return this.cancellable.promise.then(() => {
        this.setState({ avail: false })
      })
    }

    // check if any camera devices are available
    isCameraAvailable = async (): Promise<*> => {
      // get available cameras
      const cameras = await this.getCameras()
      // resolve if found camera, reject if not
      return cameras.length > 0 ? Promise.resolve() : Promise.reject()
    }

    // check if no camera devices are available
    noCameraAvailable = async (): Promise<*> => {
      // get available cameras
      const cameras = await this.getCameras()
      // reject if found camera, resolve if not
      return cameras.length === 0 ? Promise.resolve() : Promise.reject()
    }

    // get available cameras
    getCameras = async (): Promise<Array<MediaDeviceInfoType>> => {
      const devices = await navigator.mediaDevices.enumerateDevices()
      return filter(devices, { kind: 'videoinput' })
    }

    render() {
      return <Component cameraAvailable={this.state.avail} {...this.props} />
    }
  }

  return CameraAvailability
}
