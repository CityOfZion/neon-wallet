// @flow
import React, { Component } from 'react'
import classNames from 'classnames'

import TextInput from '../../components/Inputs/TextInput'
import PasswordInput from '../../components/Inputs/PasswordInput'
import Button from '../../components/Button'
import CopyToClipboard from '../../components/CopyToClipboard'
import { ROUTES } from '../../core/constants'
import styles from './DisplayWalletAccounts.scss'
import FullHeightPanel from '../../components/Panel/FullHeightPanel'
import CloseButton from '../../components/CloseButton'
import BackButton from '../../components/BackButton'
import AddIcon from '../../assets/icons/add.svg'
import CheckIcon from '../../assets/icons/check.svg'
import DialogueBox from '../../components/DialogueBox'
import WarningIcon from '../../assets/icons/warning.svg'

type Props = {
  walletName: string,
  address: string,
  wif: string,
  passphrase: string,
  isImport: boolean,
  authenticated: boolean
}

class DisplayWalletAccounts extends Component<Props> {
  publicCanvas: ?HTMLCanvasElement

  encryptedCanvas: ?HTMLCanvasElement

  privateCanvas: ?HTMLCanvasElement

  render() {
    const {
      passphrase,
      address,
      wif,
      walletName,
      isImport,
      authenticated
    } = this.props
    const fields = [
      {
        label: 'Passphrase',
        value: passphrase,
        type: 'password'
      },
      { label: 'Private Key', value: wif, type: 'text' },
      { label: 'Public Address', value: address, type: 'text' }
    ]
    if (walletName) {
      fields.unshift({ label: 'Wallet Name', value: walletName, type: 'text' })
    }
    const conditionalPanelProps = {}
    if (authenticated) {
      conditionalPanelProps.renderBackButton = () => (
        <BackButton routeTo={ROUTES.WALLET_MANAGER} />
      )
      conditionalPanelProps.renderCloseButton = () => (
        <CloseButton routeTo={ROUTES.DASHBOARD} />
      )
    } else {
      conditionalPanelProps.renderCloseButton = () => (
        <CloseButton routeTo={ROUTES.HOME} />
      )
    }
    return (
      <FullHeightPanel
        headerText={isImport ? 'Wallet Imported!' : 'Wallet Created!'}
        renderInstructions={false}
        headerContainerClassName={styles.headerIconMargin}
        renderHeaderIcon={() => <CheckIcon />}
        {...conditionalPanelProps}
        iconColor="#F7BC33"
      >
        <div id="newWallet" className={styles.newWalletContainer}>
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
          <div className={styles.detailsContainer}>
            {fields.map(item => (
              <div key={item.label} className={styles.detailRow}>
                <div
                  className={classNames(styles.input, {
                    [styles.reducedInputFontSize]: item.label === 'Private Key'
                  })}
                >
                  {item.type === 'text' ? (
                    <TextInput
                      type={item.type}
                      label={item.label}
                      value={item.value}
                      disabled
                    />
                  ) : (
                    <PasswordInput
                      label={item.label}
                      value={item.value}
                      disabled
                    />
                  )}
                </div>
                {item.type === 'text' && (
                  <CopyToClipboard
                    className={styles.clipboardCopy}
                    text={item.value}
                    tooltip={`Copy ${item.label}`}
                  />
                )}
              </div>
            ))}
            <div className={styles.buttonContainer}>
              <Button renderIcon={AddIcon} primary onClick={this.handlePrint}>
                Print
              </Button>
            </div>
          </div>
        </div>
      </FullHeightPanel>
    )
  }

  handlePrint = () => {
    window.print()
  }
}

export default DisplayWalletAccounts
