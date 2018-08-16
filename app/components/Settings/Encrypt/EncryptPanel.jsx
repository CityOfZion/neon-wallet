// @flow
import React from 'react'
import classNames from 'classnames'
import { ROUTES } from '../../../core/constants'

import FullHeightPanel from '../../Panel/FullHeightPanel'
import ImportIcon from '../../../assets/icons/import.svg'
import CloseButton from '../../CloseButton'
import styles from './EncryptPanel.scss'

export default class EncryptPanel extends React.Component<Props> {
  static defaultProps = {}

  render() {
    return (
      <FullHeightPanel
        className={classNames(styles.encryptPanel, this.props.className)}
        contentClassName={styles.content}
        renderHeader={this.renderHeader}
        headerText="Encrypt a key"
        renderCloseButton={() => <CloseButton routeTo={ROUTES.SETTINGS} />}
        renderHeaderIcon={this.renderIcon}
        instructions="Choose a passphrase to encrypt an existing key"
      />
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
