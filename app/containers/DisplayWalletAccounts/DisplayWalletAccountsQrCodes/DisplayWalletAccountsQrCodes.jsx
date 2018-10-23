// @flow
import React, { Component } from 'react'
import classNames from 'classnames'

import Button from '../../../components/Button'
import { ROUTES } from '../../../core/constants'
import styles from '../DisplayWalletAccounts.scss'
import FullHeightPanel from '../../../components/Panel/FullHeightPanel'
import CloseButton from '../../../components/CloseButton'
import BackButton from '../../../components/BackButton'
import CheckIcon from '../../../assets/icons/check.svg'
import DialogueBox from '../../../components/DialogueBox'
import WarningIcon from '../../../assets/icons/warning.svg'
import ConfirmIcon from '../../../assets/icons/confirm.svg'
import CopyIcon from '../../../assets/icons/copy.svg'
import withCopyCanvasToClipboard from '../../../hocs/withCopyCanvasToClipboard'
import AddIcon from '../../../assets/icons/add.svg'

type Props = {
  walletName: string,
  address: string,
  wif: string,
  passphrase: string,
  isImport: boolean,
  authenticated: boolean,
  handleCopy: (?HTMLCanvasElement, string, ?boolean) => Promise<void>,
  handleCreateCanvas: (?HTMLCanvasElement, string) => any,
  copied: boolean
}

type State = {
  publicCopied: boolean,
  privateCopied: boolean
}

class DisplayWalletAccountsQrCodes extends Component<Props, State> {
  publicCanvas: ?HTMLCanvasElement

  privateCanvas: ?HTMLCanvasElement

  componentDidMount() {
    const { address, wif } = this.props
    this.props.handleCreateCanvas(this.publicCanvas, address)
    this.props.handleCreateCanvas(this.privateCanvas, wif)
  }

  render() {
    const { authenticated } = this.props

    const conditionalPanelProps = {}
    if (authenticated) {
      conditionalPanelProps.renderCloseButton = () => (
        <CloseButton routeTo={ROUTES.DASHBOARD} />
      )
      conditionalPanelProps.renderBackButton = () => (
        <BackButton routeTo={ROUTES.DISPLAY_WALLET_KEYS_AUTHENTICATED} />
      )
    } else {
      conditionalPanelProps.renderCloseButton = () => (
        <CloseButton routeTo={ROUTES.HOME} />
      )
      conditionalPanelProps.renderBackButton = () => (
        <BackButton routeTo={ROUTES.DISPLAY_WALLET_KEYS} />
      )
    }

    return (
      <FullHeightPanel
        headerText="Wallet QR Codes"
        renderInstructions={false}
        headerContainerClassName={styles.headerIconMargin}
        renderHeaderIcon={() => <CheckIcon />}
        {...conditionalPanelProps}
        iconColor="#F7BC33"
      >
        <div
          id="wallet-accounts-qr-codes"
          className={styles.newWalletContainer}
        >
          <DialogueBox
            icon={<WarningIcon />}
            renderText={() => (
              <div className={styles.saveDetails}>
                <b>Save these details!</b> If you lose these credentials, you
                lose access to your assets.
              </div>
            )}
            className={styles.displayWalletAccountsDialogue}
          />
          <div className={styles.qrContainer}>
            <div className={styles.qr}>
              <label> private key </label>
              <canvas
                ref={node => {
                  this.privateCanvas = node
                }}
              />
            </div>
            <div className={styles.qr}>
              <label> public key </label>
              <canvas
                ref={node => {
                  this.publicCanvas = node
                }}
              />
              <Button
                className={styles.submitButton}
                renderIcon={() =>
                  this.props.copied ? <ConfirmIcon /> : <CopyIcon />
                }
                type="submit"
                onClick={() => {
                  this.props.handleCopy(this.publicCanvas, 'public-address')
                }}
              >
                Copy Code Image
              </Button>
            </div>
          </div>
          <div className={styles.qrPrintButtonContainer}>
            <Button renderIcon={AddIcon} primary onClick={this.handlePrint}>
              Print
            </Button>
          </div>
        </div>
      </FullHeightPanel>
    )
  }

  handlePrint = () => {
    window.print()
  }
}

export default withCopyCanvasToClipboard(DisplayWalletAccountsQrCodes)
