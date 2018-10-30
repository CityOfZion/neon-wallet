// @flow
import React from 'react'
import { noop } from 'lodash-es'
import classNames from 'classnames'

import { ROUTES } from '../../../core/constants'
import FullHeightPanel from '../../Panel/FullHeightPanel'
import EncryptForm from '../EncryptForm'
import EncryptSuccess from '../EncryptSuccess'
import LockIcon from '../../../assets/icons/lock.svg'
import CloseButton from '../../CloseButton'
import styles from './EncryptPanel.scss'

type State = {
  encryptedkey: string
}

type Props = {
  handleSubmit: Function,
  validatePassphraseLength: Function,
  isWIF: Function,
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

  static defaultProps = {
    handleSubmit: noop
  }

  render() {
    const { className } = this.props

    return (
      <FullHeightPanel
        className={classNames(styles.encryptPanel, className)}
        renderHeader={this.renderHeader}
        headerText="Encrypt a key"
        renderCloseButton={() => <CloseButton routeTo={ROUTES.SETTINGS} />}
        renderHeaderIcon={this.renderIcon}
        renderInstructions={this.renderInstructions}
      >
        {this.renderPanelContent()}
      </FullHeightPanel>
    )
  }

  renderHeader = () => <span>{this.props.title}</span>

  renderInstructions = () => {
    const { encryptedkey } = this.state
    if (!encryptedkey) {
      return <div>Choose a passphrase to encrypt an existing key</div>
    }
  }

  renderPanelContent = () => {
    const { encryptedkey } = this.state
    if (!encryptedkey) {
      return (
        <EncryptForm
          submitLabel="Generate Encrypted Key"
          onSubmit={this.onSubmit}
          encryptPrivateKey={encryptedkey}
          isWIF={this.props.isWIF}
          validatePassphraseLength={this.props.validatePassphraseLength}
        />
      )
    }
    return (
      <EncryptSuccess encryptedKey={encryptedkey} handleReset={this.reset} />
    )
  }

  reset = () => {
    this.setState({ encryptedkey: '' })
  }

  renderIcon = () => (
    <div>
      <LockIcon />
    </div>
  )

  onSubmit = (
    privateKey: string,
    passphrase: string,
    confirmPassphrase: string
  ) => {
    const { handleSubmit } = this.props
    const result = handleSubmit(privateKey, passphrase, confirmPassphrase)
    this.setState({ encryptedkey: result })
  }
}
