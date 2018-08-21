// @flow
import React from 'react'
import classNames from 'classnames'
import { noop } from 'lodash'

import { ROUTES } from '../../../core/constants'
import FullHeightPanel from '../../Panel/FullHeightPanel'
import EncryptForm from '../EncryptForm'
import ImportIcon from '../../../assets/icons/import.svg'
import CloseButton from '../../CloseButton'
import styles from './EncryptPanel.scss'

export default class EncryptPanel extends React.Component<Props> {
  static defaultProps = {
    onSave: noop
  }

  render() {
    const { className } = this.props

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
          onSubmit={this.handleSubmit}
        />
      </FullHeightPanel>
    )
  }

  renderHeader = () => <span>{this.props.title}</span>

  // TODO change to correct icon
  renderIcon = () => (
    <div>
      <ImportIcon />
    </div>
  )
}
