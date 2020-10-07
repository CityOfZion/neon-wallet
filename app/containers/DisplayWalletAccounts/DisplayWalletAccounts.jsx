// @flow
import React, { Component } from 'react'
import classNames from 'classnames'
import { NavLink } from 'react-router-dom'
import { IntlShape, FormattedHTMLMessage, FormattedMessage } from 'react-intl'

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
import GridIcon from '../../assets/icons/grid.svg'

type Props = {
  walletName: string,
  address: string,
  wif: string,
  encryptedWIF: string,
  passphrase: string,
  isImport: boolean,
  authenticated: boolean,
  intl: IntlShape,
}

class DisplayWalletAccounts extends Component<Props> {
  render() {
    const {
      passphrase,
      address,
      wif,
      encryptedWIF,
      walletName,
      isImport,
      authenticated,
      intl,
    } = this.props

    const fields = [
      {
        label: intl.formatMessage({
          id: 'walletCreationWalletPasswordPlaceholder',
        }),
        value: passphrase,
        type: 'password',
      },
      {
        label: intl.formatMessage({
          id: 'privateKeyLabel',
        }),
        value: wif,
        type: 'text',
      },
      {
        label: intl.formatMessage({
          id: 'inputEncryptedPlaceholder',
        }),
        value: encryptedWIF,
        type: 'text',
      },
      {
        label: intl.formatMessage({
          id: 'publicAddress',
        }),
        value: address,
        type: 'text',
      },
    ]
    if (walletName) {
      fields.unshift({
        label: intl.formatMessage({
          id: 'walletCreationWalletNameLabel',
        }),
        value: walletName,
        type: 'text',
      })
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
        headerText={
          isImport
            ? intl.formatMessage({
                id: 'walletImportedHeader',
              })
            : intl.formatMessage({
                id: 'walletCreatedHeader',
              })
        }
        renderInstructions={false}
        headerContainerClassName={styles.headerIconMargin}
        renderHeaderIcon={() => <CheckIcon />}
        {...conditionalPanelProps}
      >
        <div id="newWallet" className={styles.newWalletContainer}>
          <DialogueBox
            icon={<WarningIcon />}
            renderText={() => (
              <div className={styles.saveDetails}>
                <FormattedHTMLMessage id="walletCreatedDisclaimer" />
              </div>
            )}
            className={styles.displayWalletAccountsDialogue}
          />
          <div className={styles.detailsContainer}>
            {fields.map(item => (
              <div key={item.label} className={styles.detailRow}>
                <div
                  className={classNames(styles.input, {
                    [styles.reducedInputFontSize]: [
                      'Private Key',
                      'Encrypted Key',
                    ].includes(item.label),
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
                <FormattedMessage id="print" />
              </Button>
              <NavLink
                id="display-wallet-qrs"
                exact
                to={
                  authenticated
                    ? ROUTES.DISPLAY_WALLET_QRS_AUTHENTICATED
                    : ROUTES.DISPLAY_WALLET_QRS
                }
              >
                <Button primary renderIcon={() => <GridIcon />} type="submit">
                  <FormattedMessage id="generateQrCodes" />
                </Button>
              </NavLink>
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
