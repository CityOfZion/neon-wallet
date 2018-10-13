// @flow
import React from 'react'
import QRCode from 'qrcode/lib/browser'
import { clipboard } from 'electron'
import fs from 'fs'
import storage from 'electron-json-storage'

import DialogueBox from '../../DialogueBox'
import WarningIcon from '../../../assets/icons/warning.svg'
import CopyIcon from '../../../assets/icons/copy.svg'
import ConfirmIcon from '../../../assets/icons/confirm.svg'

import Button from '../../Button'
import styles from '../ReceivePanel/styles.scss'

type Props = {
  address: string
}

type State = {
  copied: boolean
}

export default class ReceivePanel extends React.Component<Props, State> {
  publicCanvas: ?HTMLCanvasElement

  state = {
    copied: false
  }

  componentDidMount() {
    const { address } = this.props
    QRCode.toCanvas(this.publicCanvas, address, { version: 5 }, err => {
      if (err) console.error(err)
    })
  }

  render() {
    return (
      <div className={styles.defaultReceiveContainer}>
        <canvas
          ref={node => {
            this.publicCanvas = node
          }}
        />
        <DialogueBox
          icon={
            <WarningIcon
              className={styles.warningIcon}
              height={60}
              width={60}
            />
          }
          renderText={() => (
            <div>
              Only send assets that are{' '}
              <b>compatible with the NEO blockchain (NEO, GAS, etc.)</b>.
              Sending other assets will result in permanent loss.{' '}
            </div>
          )}
          className={styles.warningDialogue}
        />
        <Button
          primary
          className={styles.submitButton}
          renderIcon={() =>
            this.state.copied ? <ConfirmIcon /> : <CopyIcon />
          }
          type="submit"
          onClick={() =>
            this.handleSaveCanvasToLocalStorageAndCopyToClipboard()
          }
        >
          Copy Code Image
        </Button>
      </div>
    )
  }

  handleCopyIcon = () => {
    this.setState({ copied: true })
    setTimeout(() => {
      this.setState({ copied: false })
    }, 1000)
  }

  handleSaveCanvasToLocalStorageAndCopyToClipboard = async () => {
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
    const url = this.publicCanvas.toDataURL('image/jpg', 0.8)
    const base64Data = url.replace(/^data:image\/png;base64,/, '')
    const storagePath = storage.getDefaultDataPath()
    await writeFile(`${storagePath}/public-address.jpg`, base64Data, 'base64')
    clipboard.writeImage(`${storagePath}/public-address.jpg`)
  }
}
