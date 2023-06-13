// @flow
import React, { Component } from 'react'
import { IntlShape, FormattedHTMLMessage, FormattedMessage } from 'react-intl'

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
  encryptedWIF: string,
  passphrase: string,
  isImport: boolean,
  authenticated: boolean,
  handleCopy: (?HTMLCanvasElement, string, ?boolean) => Promise<void>,
  handleCreateCanvas: (?HTMLCanvasElement, string) => any,
  copied: boolean,
  intl: IntlShape,
}

type copyType = 'ENCRYPTED' | 'PUBLIC' | ''

type State = {
  qrCopied: copyType,
}

class DisplayWalletAccountsQrCodes extends Component<Props, State> {
  state: State = {
    qrCopied: '',
  }

  publicCanvas: ?HTMLCanvasElement

  privateCanvas: ?HTMLCanvasElement

  encryptedCanvas: ?HTMLCanvasElement

  componentDidMount() {
    const { address, wif, encryptedWIF } = this.props
    this.props.handleCreateCanvas(this.publicCanvas, address)
    this.props.handleCreateCanvas(this.privateCanvas, wif)
    this.props.handleCreateCanvas(this.encryptedCanvas, encryptedWIF)
  }

  qrCopied(qr: copyType): boolean {
    // When the user clicks on the focus QR icon,
    // qrCopied is temporarily true only for the focus QR.
    return qr === this.state.qrCopied && this.props.copied
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
        headerText={<FormattedMessage id="walletQrCodes" />}
        renderInstructions={false}
        headerContainerClassName={styles.headerIconMargin}
        renderHeaderIcon={() => <CheckIcon />}
        {...conditionalPanelProps}
        iconColor="#4CFFB3"
      >
        <div
          id="wallet-accounts-qr-codes"
          className={styles.newWalletContainer}
        >
          <DialogueBox
            icon={<WarningIcon />}
            renderText={() => (
              <div className={styles.saveDetails}>
                <FormattedHTMLMessage id="walletCreatedDisclaimer" />
              </div>
            )}
            className={styles.displayWalletAccountsDialogue}
          />
          {/* TODO: use a loop to reduce duplicate code. (Look at the DisplayWalletAccounts
            for reference) */}
          <div className={styles.qrContainer}>
            <div className={styles.qr}>
              <label>
                {' '}
                <FormattedMessage id="privateKeyLabel" />{' '}
              </label>
              <canvas
                ref={node => {
                  this.privateCanvas = node
                }}
              />
            </div>
            <div className={styles.qr}>
              <label>
                {' '}
                <FormattedMessage id="encryptedKeyLabel" />{' '}
              </label>
              <canvas
                ref={node => {
                  this.encryptedCanvas = node
                }}
              />
              <Button
                className={styles.submitButton}
                renderIcon={() =>
                  this.qrCopied('ENCRYPTED') ? <ConfirmIcon /> : <CopyIcon />
                }
                type="submit"
                onClick={() => {
                  this.setState({ qrCopied: 'ENCRYPTED' })
                  this.props.handleCopy(this.encryptedCanvas, 'encrypted-key')
                }}
              >
                <FormattedMessage id="copyCodeImage" />
              </Button>
            </div>
            <div className={styles.qr}>
              <label>
                {' '}
                <FormattedMessage id="addressLabel" />
              </label>
              <canvas
                ref={node => {
                  this.publicCanvas = node
                }}
              />
              <Button
                className={styles.submitButton}
                renderIcon={() =>
                  this.qrCopied('PUBLIC') ? <ConfirmIcon /> : <CopyIcon />
                }
                type="submit"
                onClick={() => {
                  this.setState({ qrCopied: 'PUBLIC' })
                  this.props.handleCopy(this.publicCanvas, 'public-address')
                }}
              >
                <FormattedMessage id="copyCodeImage" />
              </Button>
            </div>
          </div>
          <div className={styles.qrPrintButtonContainer}>
            <Button renderIcon={AddIcon} primary onClick={this.handlePrint}>
              <FormattedMessage id="print" />
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
