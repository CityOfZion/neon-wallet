// @flow
import React from 'react'
import { noop } from 'lodash-es'

import LockIcon from '../../../assets/icons/lock.svg'
import CopyToClipboard from '../../CopyToClipboard'
import Button from '../../Button'
import SuccessMessage from '../../SuccessMessage'
import styles from './EncryptSuccess.scss'

type Props = {
  encryptedKey: string,
  handleReset: Function
}

export default class EncryptSuccess extends React.Component<Props> {
  static defaultProps = {
    handleReset: noop
  }

  render() {
    const { encryptedKey, handleReset } = this.props

    return (
      <section>
        <div className={styles.encryptSuccess}>
          <SuccessMessage
            text="Private key encrypted successfully!"
            className={styles.successMessage}
          />
          <label className={styles.label}>Your private key</label>
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
          <Button
            className={styles.encryptResetButton}
            onClick={handleReset}
            primary
            renderIcon={LockIcon}
          >
            Encrypt another private key
          </Button>
        </div>
      </section>
    )
  }
}
