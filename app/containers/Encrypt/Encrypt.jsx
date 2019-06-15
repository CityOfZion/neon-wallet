// @flow
import React from 'react'
import { noop } from 'lodash-es'

import EncryptPanel from '../../components/Settings/EncryptPanel'
import LockIcon from '../../assets/icons/lock.svg'
import styles from './Encrypt.scss'

type Props = {
  generateNewEncryptedWIF: Function,
  isWIF: Function,
  validatePassphraseLength: Function,
}

export default class Encrypt extends React.Component<Props> {
  static defaultProps = {
    validatePassphraseLength: noop,
    isWIF: noop,
  }

  render = () => {
    const {
      generateNewEncryptedWIF,
      isWIF,
      validatePassphraseLength,
    } = this.props
    return (
      <div className={styles.encrypt}>
        <EncryptPanel
          title="Encrypt Private Key"
          handleSubmit={generateNewEncryptedWIF}
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
