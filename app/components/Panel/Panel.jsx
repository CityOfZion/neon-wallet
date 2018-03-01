// @flow
import React from 'react'
import classNames from 'classnames'

import Content from './Content'
import Header from './Header'
import styles from './Panel.scss'

type Props = {
  className: ?string,
  children: React$Node,
  renderHeader: ?Function
}

export default class Panel extends React.Component<Props> {
  static defaultProps = {
    renderHeader: null
  }

  render = () => {
    return (
      <div className={classNames(styles.panel, this.props.className)}>
        {this.renderHeader()}
        {this.renderContent()}
      </div>
    )
  }

  renderHeader = () => {
    const { renderHeader } = this.props

    if (renderHeader) {
      return <Header className={styles.header}>{renderHeader()}</Header>
    }
  }

  renderContent = () => {
    return <Content className={styles.content}>{this.props.children}</Content>
  }
}
