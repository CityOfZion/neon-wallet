// @flow
import React from 'react'
import classNames from 'classnames'
import { wallet } from 'neon-js'
import { validatePassphraseLength } from '../../../core/wallet'

import { ROUTES } from '../../../core/constants'
import FullHeightPanel from '../../Panel/FullHeightPanel'
import EncryptForm from '../EncryptForm'
import ImportIcon from '../../../assets/icons/import.svg'
import CloseButton from '../../CloseButton'
import styles from './EncryptPanel.scss'

type State = {
  encryptedkey: string
}

type Props = {
  className: string,
  title: string
}

export default class EncryptPanel extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      encryptedkey: ''
    }
  }

  render() {
    const { className } = this.props
    const { encryptedkey } = this.state

    if (!this.state.encryptedkey) {
      return (
        <FullHeightPanel
          className={classNames(styles.encryptPanel, className)}
          contentClassName={styles.content}
          renderHeader={this.renderHeader}
          headerText="Encrypt a key"
          renderCloseButton={() => <CloseButton routeTo={ROUTES.SETTINGS} />}
          renderHeaderIcon={this.renderIcon}
          renderInstructions={() => (
            <div>Choose a passphrase to encrypt an existing key</div>
          )}
        >
          <EncryptForm
            submitLabel="Generate Encrypted Key"
            onSubmit={this.onSubmit}
          />
        </FullHeightPanel>
      )
    }
    return <div>{encryptedkey}</div>
  }

  renderHeader = () => <span>{this.props.title}</span>

  // TODO change to correct icon
  renderIcon = () => (
    <div>
      <ImportIcon />
    </div>
  )

  onSubmit = (
    privateKey: string,
    passphrase: string,
    confirmPassphrase: string
  ) => {
    const result = this.encryptPrivateKey(
      privateKey,
      passphrase,
      confirmPassphrase
    )
    this.setState({ encryptedkey: result })
  }

  encryptPrivateKey = (privateKey, passphrase, confirmPassphrase) => {
    if (passphrase !== confirmPassphrase) {
      throw new Error('Passphrases do not match')
    }
    if (!validatePassphraseLength(passphrase)) {
      throw new Error('Please choose a longer passphrase')
    }
    if (privateKey && !wallet.isWIF(privateKey)) {
      throw new Error('The private key is not valid')
    }
    return wallet.encrypt(privateKey, passphrase)
  }
}
