// @flow
import React from 'react'
import classNames from 'classnames'

import { ROUTES } from '../../../core/constants'
import FullHeightPanel from '../../Panel/FullHeightPanel'
import EncryptForm from '../EncryptForm'
import EncryptSuccess from '../EncryptSuccess'
import LockIcon from '../../../assets/icons/lock.svg'
import CloseButton from '../../CloseButton'
import styles from './EncryptPanel.scss'

type Props = {
  handleSubmit: Function,
  validatePassphraseLength: Function,
  isWIF: Function,
  className: string,
  title: string,
  resetEncryptedWIF: Function,
  encryptedWIF: string,
}

export default class EncryptPanel extends React.Component<Props> {
  render() {
    const { className, resetEncryptedWIF, encryptedWIF } = this.props

    return (
      <FullHeightPanel
        className={classNames(styles.encryptPanel, className)}
        renderHeader={this.renderHeader}
        headerText="Encrypt a key"
        renderCloseButton={() => <CloseButton routeTo={ROUTES.SETTINGS} />}
        renderHeaderIcon={this.renderIcon}
        renderInstructions={this.renderInstructions}
      >
        {this.renderPanelContent(encryptedWIF, resetEncryptedWIF)}
      </FullHeightPanel>
    )
  }

  renderHeader = () => <span>{this.props.title}</span>

  renderInstructions = (encryptedWIF: string) => {
    if (!encryptedWIF) {
      return <div>Choose a passphrase to encrypt an existing key</div>
    }
    return null
  }

  renderPanelContent = (encryptedWIF: string, resetEncryptedWIF: Function) => {
    if (!encryptedWIF) {
      return (
        <EncryptForm
          submitLabel="Generate Encrypted Key"
          onSubmit={this.onSubmit}
          encryptPrivateKey={encryptedWIF}
          isWIF={this.props.isWIF}
          validatePassphraseLength={this.props.validatePassphraseLength}
        />
      )
    }
    return (
      <EncryptSuccess
        encryptedKey={encryptedWIF}
        handleReset={resetEncryptedWIF}
      />
    )
  }

  renderIcon = () => (
    <div>
      <LockIcon />
    </div>
  )

  onSubmit = (
    privateKey: string,
    passphrase: string,
    confirmPassphrase: string,
  ) => {
    const { handleSubmit } = this.props
    handleSubmit(privateKey, passphrase, confirmPassphrase)
  }
}
