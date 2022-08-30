// @flow
import React from 'react'
import { NavLink } from 'react-router-dom'
import { noop } from 'lodash-es'
import { ROUTES } from '../../../core/constants'
import GridIcon from '../../../assets/icons/grid.svg'
import AddIcon from '../../../assets/icons/add.svg'
import LockIcon from '../../../assets/icons/lock.svg'
import CopyToClipboard from '../../CopyToClipboard'
import Button from '../../Button'
import SuccessMessage from '../../SuccessMessage'
import styles from './EncryptSuccess.scss'

type Props = {
  encryptedKey: string,
  resetEncryptedWIF: Function,
}

export default class EncryptSuccess extends React.Component<Props> {
  render() {
    const { encryptedKey, resetEncryptedWIF } = this.props

    return (
      <section>
        <div className={styles.encryptSuccess}>
          <SuccessMessage
            text="Private key encrypted successfully!"
            className={styles.successMessage}
          />
          <label className={styles.label}>Your encrypted key</label>
          <div className={styles.encryptedKeyContainer}>
            <div className={styles.encryptedKey}>
              <input value={encryptedKey} disabled />
              <CopyToClipboard
                className={styles.copy}
                text={encryptedKey}
                tooltip="Copy Encrypted key"
              />
            </div>
          </div>
          <div className={styles.buttonContainer}>
            <Button renderIcon={AddIcon} primary onClick={this.handlePrint}>
              Print
            </Button>
            <NavLink
              id="display-encrypted-wif-qr"
              exact
              to={ROUTES.DISPLAY_ENCRYPTED_WIF_QR}
            >
              <Button primary renderIcon={() => <GridIcon />}>
                Generate QR Code
              </Button>
            </NavLink>
          </div>

          <Button
            className={styles.encryptResetButton}
            onClick={resetEncryptedWIF}
            primary
            renderIcon={LockIcon}
          >
            Encrypt another private key
          </Button>
        </div>
      </section>
    )
  }

  handlePrint = () => {
    window.print()
  }
}
