// @flow
import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'

import FullHeightPanel from '../../Panel/FullHeightPanel'
import BaseModal from '../BaseModal'
import styles from './ShowQrForExportModal.scss'
import CloseButton from '../../CloseButton'
import Qr from '../../../assets/icons/grid.svg'
import withCopyCanvasToClipboard from '../../../hocs/withCopyCanvasToClipboard'
import Button from '../../Button'

type Props = {
  hideModal: Function,
  address: string,
  encryptedWIF: string,
  handleCreateCanvas: (?HTMLCanvasElement, string) => any,
  IS_NEP2_EXPORT: string,
  IS_ADDRESS: string,
}

class ShowQrForExportModal extends Component<Props> {
  targetCanvas: ?HTMLCanvasElement

  componentDidMount() {
    const { address, encryptedWIF, IS_NEP2_EXPORT, IS_ADDRESS } = this.props
    let importString
    if (IS_NEP2_EXPORT) {
      importString = encryptedWIF
    }
    if (IS_ADDRESS) {
      importString = address
    }
    setTimeout(() => {
      this.props.handleCreateCanvas(this.targetCanvas, importString)
    }, 100)
  }

  render() {
    const { hideModal, IS_NEP2_EXPORT, IS_ADDRESS } = this.props
    return (
      <BaseModal
        hideModal={hideModal}
        shouldRenderHeader={false}
        style={{
          content: {
            width: '730px',
            height: '100%',
          },
        }}
      >
        <FullHeightPanel
          containerClassName={styles.releaseNotesContainer}
          renderInstructions={false}
          renderHeaderIcon={() => <Qr />}
          headerText="QR Export"
          renderCloseButton={() => (
            <div className={styles.closeButton} onClick={() => hideModal()}>
              <CloseButton renderWithoutLink />
            </div>
          )}
        >
          <div>
            <br />
            Open Neon on your mobile device and tap "Scan QR Code" to import
            your account
          </div>

          <div className={styles.qr}>
            <label>
              {' '}
              <FormattedMessage
                id={IS_NEP2_EXPORT ? 'encryptedKeyLabel' : 'addressLabel'}
              />{' '}
            </label>
            <canvas
              ref={node => {
                this.targetCanvas = node
              }}
            />
          </div>
          <div className={styles.buttonContainer}>
            <Button primary onClick={hideModal}>
              Close
            </Button>
          </div>
        </FullHeightPanel>
      </BaseModal>
    )
  }
}

export default withCopyCanvasToClipboard(ShowQrForExportModal)
