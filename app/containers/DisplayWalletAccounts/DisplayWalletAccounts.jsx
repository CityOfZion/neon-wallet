// @flow
import React, { Component } from 'react'
import classNames from 'classnames'

import TextInput from '../../components/Inputs/TextInput'
import Button from '../../components/Button'
import CopyToClipboard from '../../components/CopyToClipboard'
import { ROUTES } from '../../core/constants'
import styles from './DisplayWalletAccounts.scss'
import FullHeightPanel from '../../components/Panel/FullHeightPanel'
import CloseButton from '../../components/CloseButton'
import AddIcon from '../../assets/icons/add.svg'
import CheckIcon from '../../assets/icons/check.svg'
import DialogueBox from '../../components/DialogueBox'
import WarningIcon from '../../assets/icons/warning.svg'

type Props = {
  walletName: string,
  address: string,
  wif: string,
  passphrase: string,
  isImport: Boolean
}

class DisplayWalletAccounts extends Component<Props> {
  publicCanvas: ?HTMLCanvasElement

  encryptedCanvas: ?HTMLCanvasElement

  privateCanvas: ?HTMLCanvasElement

  render() {
    const { passphrase, address, wif, walletName, isImport } = this.props
    const fields = [
      { label: 'Passphrase', value: passphrase },
      { label: 'Private Key', value: wif },
      { label: 'Public Address', value: address }
    ]
    if (walletName) {
      fields.unshift({ label: 'Wallet Name', value: walletName })
    }
    return (
      <FullHeightPanel
        headerText={isImport ? 'Wallet Imported!' : 'Wallet Created!'}
        instructions={false}
        headerContainerClassName={styles.headerIconMargin}
        renderHeaderIcon={() => <CheckIcon />}
        renderCloseButton={() => <CloseButton routeTo={ROUTES.HOME} />}
        iconColor="#F7BC33"
      >
        <div id="newWallet" className={styles.newWalletContainer}>
          <DialogueBox
            icon={<WarningIcon />}
            renderText={() => (
              <div className={styles.saveDetails}>
                <div>
                  <b>Save these details!</b> If you lose these credentials,{' '}
                </div>
                <div>you lose access to your assets.</div>
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
                  <TextInput label={item.label} value={item.value} disabled />
                </div>
                <CopyToClipboard
                  className={styles.clipboardCopy}
                  text={item.value}
                  tooltip={`Copy ${item.label}`}
                />
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
