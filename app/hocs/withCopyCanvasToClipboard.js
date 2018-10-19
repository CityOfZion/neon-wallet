// @flow
import React from 'react'

import QRCode from 'qrcode/lib/browser'
import { clipboard } from 'electron'
import fs from 'fs'
import storage from 'electron-json-storage'

type State = {
  copied: boolean
}

type Props = {}

// $FlowFixMe
export default function withCopyCanvasToClipboard(Component) {
  class hasCopyCanvasToClipboard extends React.Component<Props, State> {
    state = {
      copied: false
    }

    handleCreateCanvas = (ref: ?HTMLCanvasElement, data: string) => {
      QRCode.toCanvas(ref, data, { version: 5 }, err => {
        if (err) console.error(err)
      })
    }

    handleCopyIcon = () => {
      this.setState({ copied: true })
      setTimeout(() => {
        this.setState({ copied: false })
      }, 1000)
    }

    handleCopy = async (ref: ?HTMLCanvasElement, fileName: string) => {
      this.handleCopyIcon()
      function writeFile(fileName, data, type) {
        return new Promise((resolve, reject) => {
          fs.writeFile(fileName, data, type, err => {
            if (err) reject(err)
            else resolve(data)
          })
        })
      }
      // $FlowFixMe
      const url = ref.toDataURL('image/jpg', 0.8)
      const base64Data = url.replace(/^data:image\/png;base64,/, '')
      const storagePath = storage.getDefaultDataPath()
      await writeFile(`${storagePath}/${fileName}.jpg`, base64Data, 'base64')
      clipboard.writeImage(`${storagePath}/${fileName}.jpg`)
    }

    render() {
      const { copied } = this.state
      return (
        <Component
          {...this.props}
          copied={copied}
          handleCreateCanvas={this.handleCreateCanvas}
          handleCopyIcon={this.handleCopyIcon}
          handleCopy={this.handleCopy}
        />
      )
    }
  }

  return hasCopyCanvasToClipboard
}
