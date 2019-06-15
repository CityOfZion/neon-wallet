// @flow
import React, { Component } from 'react'

import Button from '../../Button'
import { ROUTES } from '../../../core/constants'
import styles from './EncryptQR.scss'
import FullHeightPanel from '../../Panel/FullHeightPanel'

import CheckIcon from '../../../assets/icons/check.svg'
import CloseButton from '../../CloseButton'
import BackButton from '../../BackButton'

import ConfirmIcon from '../../../assets/icons/confirm.svg'
import CopyIcon from '../../../assets/icons/copy.svg'
import withCopyCanvasToClipboard from '../../../hocs/withCopyCanvasToClipboard'
import AddIcon from '../../../assets/icons/add.svg'

type Props = {
  encryptedWIF: string,
  handleCopy: (?HTMLCanvasElement, string, ?boolean) => Promise<void>,
  handleCreateCanvas: (?HTMLCanvasElement, string) => any,
  copied: boolean,
}

class EncryptQR extends Component<Props, State> {
  encryptedCanvas: ?HTMLCanvasElement

  componentDidMount() {
    const { encryptedWIF } = this.props
    this.props.handleCreateCanvas(this.encryptedCanvas, encryptedWIF)
  }

  render() {
    return (
      <FullHeightPanel
        headerText="Encrypted QR Code"
        renderInstructions={false}
        headerContainerClassName={styles.headerIconMargin}
        renderHeaderIcon={() => <CheckIcon />}
        renderCloseButton={() => <CloseButton routeTo={ROUTES.SETTINGS} />}
        renderBackButton={() => <BackButton routeTo={ROUTES.ENCRYPT} />}
        iconColor="#F7BC33"
      >
        <div
          id="encrypted-wif-qr-codes"
          className={styles.encryptedKeyContainer}
        >
          <div className={styles.qrContainer}>
            <div className={styles.qr}>
              <label> encrypted key </label>
              <canvas
                ref={node => {
                  this.encryptedCanvas = node
                }}
              />
              <Button
                className={styles.submitButton}
                renderIcon={() =>
                  this.props.copied ? <ConfirmIcon /> : <CopyIcon />
                }
                type="submit"
                onClick={() => {
                  this.props.handleCopy(this.encryptedCanvas, 'encrypted-wif')
                }}
              >
                Copy Code Image
              </Button>
            </div>
          </div>
        </div>
        <div className={styles.qrPrintButtonContainer}>
          <Button renderIcon={AddIcon} primary onClick={this.handlePrint}>
            Print
          </Button>
        </div>
      </FullHeightPanel>
    )
  }

  handlePrint = () => {
    window.print()
  }
}

export default withCopyCanvasToClipboard(EncryptQR)
