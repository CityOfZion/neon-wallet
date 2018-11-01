// @flow
import React from 'react'
import { noop } from 'lodash-es'

import EncryptPanel from '../../components/Settings/EncryptPanel'
import LockIcon from '../../assets/icons/lock.svg'
import styles from './Encrypt.scss'

type Props = {
  encryptPrivateKey: Function,
  isWIF: Function,
  validatePassphraseLength: Function
}

export default class Encrypt extends React.Component<Props> {
  static defaultProps = {
    encryptPrivateKey: noop,
    validatePassphraseLength: noop,
    isWIF: noop
  }

  render = () => {
    const { encryptPrivateKey, isWIF, validatePassphraseLength } = this.props
    return (
      <div className={styles.encrypt}>
        <EncryptPanel
          title="Encrypt Private Key"
          handleSubmit={encryptPrivateKey}
          isWIF={isWIF}
          validatePassphraseLength={validatePassphraseLength}
        />
      </div>
    )
  }

  renderIcon = () => (
    <div>
      <LockIcon />
    </div>
  )
}
