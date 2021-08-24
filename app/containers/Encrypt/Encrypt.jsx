// @flow
import React from 'react'
import { noop } from 'lodash-es'
import { wallet } from '@cityofzion/neon-js'
import { wallet as n3Wallet } from '@cityofzion/neon-js-next'

import EncryptPanel from '../../components/Settings/EncryptPanel'
import LockIcon from '../../assets/icons/lock.svg'
import styles from './Encrypt.scss'

type Props = {
  generateNewEncryptedWIF: Function,
  validatePassphraseLength: Function,
  chain: string,
}

type State = {
  n3Key: string,
}

export default class Encrypt extends React.Component<Props, State> {
  static defaultProps = {
    validatePassphraseLength: noop,
    isWIF: noop,
  }

  state = {
    n3Key: '',
  }

  generateNewN3EncryptedWif = async (wif: string, passphrase: string) => {
    const n3Key = await n3Wallet.encrypt(wif, passphrase)
    this.setState({ n3Key })
  }

  render = () => {
    const {
      generateNewEncryptedWIF,
      validatePassphraseLength,
      chain,
    } = this.props
    return (
      <div className={styles.encrypt}>
        <EncryptPanel
          title="Encrypt Private Key"
          handleSubmit={generateNewEncryptedWIF}
          handleN3Submit={this.generateNewN3EncryptedWif}
          isWIF={chain === 'neo3' ? n3Wallet.isWIF : wallet.isWIF}
          validatePassphraseLength={validatePassphraseLength}
          n3Key={this.state.n3Key}
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
