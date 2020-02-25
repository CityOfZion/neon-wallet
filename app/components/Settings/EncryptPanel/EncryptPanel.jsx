// @flow
import React from 'react'
import classNames from 'classnames'
import { FormattedMessage } from 'react-intl'

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
      <FormattedMessage id="encryptPanelHeader">
        {t => (
          <FullHeightPanel
            className={classNames(styles.encryptPanel, className)}
            renderHeader={this.renderHeader}
            headerText={t}
            renderCloseButton={() => <CloseButton routeTo={ROUTES.SETTINGS} />}
            renderHeaderIcon={this.renderIcon}
            renderInstructions={this.renderInstructions}
          >
            {this.renderPanelContent(encryptedWIF, resetEncryptedWIF)}
          </FullHeightPanel>
        )}
      </FormattedMessage>
    )
  }

  renderHeader = () => <span>{this.props.title}</span>

  renderInstructions = (encryptedWIF: string) => {
    if (!encryptedWIF) {
      return (
        <div>
          <FormattedMessage id="encryptInstructions" />
        </div>
      )
    }
    return null
  }

  renderPanelContent = (encryptedWIF: string, resetEncryptedWIF: Function) => {
    if (!encryptedWIF) {
      return (
        <FormattedMessage id="encryptButton">
          {t => (
            <EncryptForm
              submitLabel={t}
              onSubmit={this.onSubmit}
              encryptPrivateKey={encryptedWIF}
              isWIF={this.props.isWIF}
              validatePassphraseLength={this.props.validatePassphraseLength}
            />
          )}
        </FormattedMessage>
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
