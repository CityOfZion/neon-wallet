// @flow
import React from 'react'
import classNames from 'classnames'

import FullHeightPanel from '../../Panel/FullHeightPanel'
import styles from './EncryptPanel.scss'

export default class EncryptPanel extends React.Component<Props> {
  static defaultProps = {}

  render() {
    return (
      <FullHeightPanel
        className={classNames(styles.encryptPanel, this.props.className)}
        contentClassName={styles.content}
        renderHeader={this.renderHeader}
      />
    )
  }

  renderHeader = () => <span>{this.props.title}</span>
}
